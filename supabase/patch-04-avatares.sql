-- Parche 4: iconos o fotos para el perfil y para las ligas.
-- Ejecutar una vez en el editor SQL (despues del parche 3).
-- El avatar es texto: 'p:<icono>:<color>' (icono prediseñado) o una imagen pequeña en base64 (maximo ~14 KB).
alter table public.profiles add column if not exists avatar text;
alter table public.leagues add column if not exists avatar text;
alter table public.profiles drop constraint if exists profiles_avatar_check;
alter table public.leagues drop constraint if exists leagues_avatar_check;
alter table public.profiles add constraint profiles_avatar_check check (avatar is null or char_length(avatar) <= 14000);
alter table public.leagues add constraint leagues_avatar_check check (avatar is null or char_length(avatar) <= 14000);

create or replace function public.valid_avatar(a text) returns boolean
language sql immutable as $$
  select a is null or a ~ '^p:[a-z]{2,12}:[0-9]{1,2}$' or a ~ '^data:image/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$';
$$;

create or replace function public.set_avatar(p_avatar text) returns void
language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'Sin sesion'; end if;
  if not valid_avatar(p_avatar) then raise exception 'Imagen no valida'; end if;
  update profiles set avatar=p_avatar where id=auth.uid();
  if not found then raise exception 'Elige primero un alias'; end if;
end $$;

create or replace function public.set_league_avatar(p_league uuid, p_avatar text) returns void
language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'Sin sesion'; end if;
  if not valid_avatar(p_avatar) then raise exception 'Imagen no valida'; end if;
  update leagues set avatar=p_avatar where id=p_league and owner=auth.uid();
  if not found then raise exception 'Solo quien creo la liga puede cambiar su icono'; end if;
end $$;

create or replace function public.my_leagues() returns json
language sql security definer set search_path=public as $$
  select coalesce(json_agg(json_build_object('id',l.id,'code',l.code,'name',l.name,'avatar',l.avatar,'owner',(l.owner=auth.uid())) order by m.joined_at),'[]'::json)
  from league_members m join leagues l on l.id=m.league_id where m.user_id=auth.uid();
$$;

create or replace function public.league_board(p_league uuid, p_from date, p_to date) returns json
language plpgsql security definer set search_path=public as $$
declare v_from date;
begin
  if not exists(select 1 from league_members where league_id=p_league and user_id=auth.uid()) then
    raise exception 'No perteneces a esa liga'; end if;
  select greatest(p_from, (l.created_at at time zone 'UTC')::date) into v_from from leagues l where l.id=p_league;
  return (select coalesce(json_agg(r order by r.total desc),'[]'::json) from (
    select u.alias, u.avatar,
      coalesce(sum(u.s),0)::int as total,
      coalesce(json_object_agg(u.game,u.s) filter (where u.game is not null),'{}'::json) as g
    from (
      select p.alias, p.avatar, m.user_id, s.game, sum(s.score)::int as s
      from league_members m join profiles p on p.id=m.user_id
      left join scores s on s.user_id=m.user_id and s.day between v_from and p_to
      where m.league_id=p_league
      group by p.alias, p.avatar, m.user_id, s.game) u
    group by u.alias, u.avatar, u.user_id) r);
end $$;

revoke all on function public.set_avatar(text), public.set_league_avatar(uuid,text), public.my_leagues(), public.league_board(uuid,date,date) from public, anon;
grant execute on function public.set_avatar(text), public.set_league_avatar(uuid,text), public.my_leagues(), public.league_board(uuid,date,date) to authenticated;
