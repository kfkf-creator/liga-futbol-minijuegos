-- Parche 6: ligas por temporadas. Devuelve el total de cada miembro por dia; la app calcula semanas, puntos y MVP.
-- Ejecutar una vez en el editor SQL (despues de los parches 3 a 5).
create or replace function public.league_days(p_league uuid, p_from date, p_to date) returns json
language plpgsql security definer set search_path=public as $$
declare v_from date;
begin
  if not exists(select 1 from league_members where league_id=p_league and user_id=auth.uid()) then
    raise exception 'No perteneces a esa liga'; end if;
  if p_to - p_from > 62 then raise exception 'Rango demasiado largo'; end if;
  select greatest(p_from, (l.created_at at time zone 'UTC')::date) into v_from from leagues l where l.id=p_league;
  return (select coalesce(json_agg(json_build_object('k',x.k,'alias',x.alias,'avatar',x.avatar,'me',x.me,'day',x.day,'tot',x.tot,'ng',x.ng)),'[]'::json) from (
    select dense_rank() over (order by m.user_id)::int as k, p.alias, p.avatar, (m.user_id=auth.uid()) as me,
           s.day, coalesce(sum(s.score),0)::int as tot, count(s.game)::int as ng
    from league_members m join profiles p on p.id=m.user_id
    left join scores s on s.user_id=m.user_id and s.day between v_from and p_to
    where m.league_id=p_league
    group by m.user_id, p.alias, p.avatar, s.day) x);
end $$;
revoke all on function public.league_days(uuid,date,date) from public, anon;
grant execute on function public.league_days(uuid,date,date) to authenticated;
