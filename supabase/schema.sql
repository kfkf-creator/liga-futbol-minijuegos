-- Esquema para las ligas privadas (Supabase). Se ejecuta una vez en el editor SQL del proyecto.
-- Requisito: Authentication > Providers > "Allow anonymous sign-ins" activado.
-- Las tablas tienen RLS activado y SIN politicas: nadie las lee ni escribe directamente con la clave publica.
-- Todo el acceso pasa por las funciones de abajo (security definer), que comprueban quien llama.

create table if not exists public.profiles(
  id uuid primary key references auth.users on delete cascade,
  alias text not null check (char_length(alias) between 2 and 20)
);
create table if not exists public.leagues(
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null check (char_length(name) between 2 and 30),
  owner uuid not null references auth.users on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.league_members(
  league_id uuid not null references public.leagues on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (league_id, user_id)
);
create table if not exists public.scores(
  user_id uuid not null references auth.users on delete cascade,
  day date not null,
  game text not null check (game in ('mm','once')),
  score int not null check (score between 0 and 100),
  created_at timestamptz not null default now(),
  primary key (user_id, day, game)      -- un solo resultado por dia y juego: el primero cuenta
);
alter table public.profiles enable row level security;
alter table public.leagues enable row level security;
alter table public.league_members enable row level security;
alter table public.scores enable row level security;

create or replace function public.set_alias(p_alias text) returns void
language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'Sin sesion'; end if;
  insert into profiles(id,alias) values (auth.uid(), trim(p_alias))
  on conflict (id) do update set alias=excluded.alias;
end $$;

create or replace function public.create_league(p_name text) returns json
language plpgsql security definer set search_path=public as $$
declare v_code text; v_id uuid; v_n int;
begin
  if auth.uid() is null then raise exception 'Sin sesion'; end if;
  if not exists(select 1 from profiles where id=auth.uid()) then raise exception 'Elige primero un alias'; end if;
  select count(*) into v_n from league_members where user_id=auth.uid();
  if v_n >= 10 then raise exception 'Máximo 10 ligas por jugador'; end if;
  loop
    v_code := upper(substr(translate(replace(gen_random_uuid()::text,'-',''),'01','GH'),1,6));
    exit when not exists(select 1 from leagues where code=v_code);
  end loop;
  insert into leagues(code,name,owner) values (v_code, trim(p_name), auth.uid()) returning id into v_id;
  insert into league_members(league_id,user_id) values (v_id, auth.uid());
  return json_build_object('id',v_id,'code',v_code,'name',trim(p_name));
end $$;

create or replace function public.join_league(p_code text) returns json
language plpgsql security definer set search_path=public as $$
declare l leagues; v_n int;
begin
  if auth.uid() is null then raise exception 'Sin sesion'; end if;
  if not exists(select 1 from profiles where id=auth.uid()) then raise exception 'Elige primero un alias'; end if;
  select * into l from leagues where code=upper(trim(p_code));
  if not found then raise exception 'No existe esa liga'; end if;
  select count(*) into v_n from league_members where league_id=l.id;
  if v_n >= 50 and not exists(select 1 from league_members where league_id=l.id and user_id=auth.uid()) then
    raise exception 'La liga está llena (máximo 50)'; end if;
  select count(*) into v_n from league_members where user_id=auth.uid();
  if v_n >= 10 and not exists(select 1 from league_members where league_id=l.id and user_id=auth.uid()) then
    raise exception 'Máximo 10 ligas por jugador'; end if;
  insert into league_members(league_id,user_id) values (l.id, auth.uid()) on conflict do nothing;
  return json_build_object('id',l.id,'code',l.code,'name',l.name);
end $$;

create or replace function public.my_leagues() returns json
language sql security definer set search_path=public as $$
  select coalesce(json_agg(json_build_object('id',l.id,'code',l.code,'name',l.name) order by m.joined_at),'[]'::json)
  from league_members m join leagues l on l.id=m.league_id where m.user_id=auth.uid();
$$;

create or replace function public.submit_score(p_day date, p_game text, p_score int) returns void
language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'Sin sesion'; end if;
  if p_day < current_date - 1 or p_day > current_date + 1 then raise exception 'Fecha fuera de rango'; end if;
  insert into scores(user_id,day,game,score) values (auth.uid(),p_day,p_game,p_score)
  on conflict (user_id,day,game) do nothing;
end $$;

create or replace function public.league_board(p_league uuid, p_from date, p_to date) returns json
language plpgsql security definer set search_path=public as $$
begin
  if not exists(select 1 from league_members where league_id=p_league and user_id=auth.uid()) then
    raise exception 'No perteneces a esa liga'; end if;
  return (select coalesce(json_agg(r order by r.total desc),'[]'::json) from (
    select p.alias,
      coalesce(sum(s.score) filter (where s.game='mm'),0)::int as mm,
      coalesce(sum(s.score) filter (where s.game='once'),0)::int as once,
      coalesce(sum(s.score),0)::int as total
    from league_members m join profiles p on p.id=m.user_id
    left join scores s on s.user_id=m.user_id and s.day between p_from and p_to
    where m.league_id=p_league group by p.alias, m.user_id) r);
end $$;

revoke all on function public.set_alias(text), public.create_league(text), public.join_league(text),
  public.my_leagues(), public.submit_score(date,text,int), public.league_board(uuid,date,date) from public, anon;
grant execute on function public.set_alias(text), public.create_league(text), public.join_league(text),
  public.my_leagues(), public.submit_score(date,text,int), public.league_board(uuid,date,date) to authenticated;
