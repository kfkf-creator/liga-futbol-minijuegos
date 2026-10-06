-- Parche 7: progreso en la nube ligado a la cuenta (correo). Ejecutar una vez en el editor SQL.
create table if not exists public.progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;   -- sin politicas: solo se accede con las funciones de abajo

create or replace function public.save_progress(p_data jsonb) returns void
language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'Sin sesion'; end if;
  if pg_column_size(p_data) > 400000 then raise exception 'Progreso demasiado grande'; end if;
  insert into progress(user_id,data,updated_at) values (auth.uid(),p_data,now())
  on conflict (user_id) do update set data=excluded.data, updated_at=now();
end $$;

create or replace function public.load_progress() returns jsonb
language sql security definer set search_path=public as $$
  select data from progress where user_id=auth.uid();
$$;

revoke all on function public.save_progress(jsonb), public.load_progress() from public, anon;
grant execute on function public.save_progress(jsonb), public.load_progress() to authenticated;
