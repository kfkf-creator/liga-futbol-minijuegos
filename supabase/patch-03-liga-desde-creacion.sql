-- Parche 3: la clasificacion de una liga cuenta solo desde el dia en que se creo la liga (igual para todos los miembros).
-- Ejecutar una vez en el editor SQL (despues del parche 2).
create or replace function public.league_board(p_league uuid, p_from date, p_to date) returns json
language plpgsql security definer set search_path=public as $$
declare v_from date;
begin
  if not exists(select 1 from league_members where league_id=p_league and user_id=auth.uid()) then
    raise exception 'No perteneces a esa liga'; end if;
  select greatest(p_from, (l.created_at at time zone 'UTC')::date) into v_from from leagues l where l.id=p_league;
  return (select coalesce(json_agg(r order by r.total desc),'[]'::json) from (
    select u.alias,
      coalesce(sum(u.s),0)::int as total,
      coalesce(json_object_agg(u.game,u.s) filter (where u.game is not null),'{}'::json) as g
    from (
      select p.alias, m.user_id, s.game, sum(s.score)::int as s
      from league_members m join profiles p on p.id=m.user_id
      left join scores s on s.user_id=m.user_id and s.day between v_from and p_to
      where m.league_id=p_league
      group by p.alias, m.user_id, s.game) u
    group by u.alias, u.user_id) r);
end $$;

revoke all on function public.league_board(uuid,date,date) from public, anon;
grant execute on function public.league_board(uuid,date,date) to authenticated;
