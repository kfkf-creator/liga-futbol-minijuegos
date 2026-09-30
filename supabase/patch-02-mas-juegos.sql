-- Parche 2: permite los juegos nuevos y devuelve las notas por juego en la clasificacion.
-- Ejecutar una vez en el editor SQL (despues del esquema inicial).
alter table public.scores drop constraint if exists scores_game_check;
alter table public.scores add constraint scores_game_check
  check (game in ('mm','once','tray','mist','line','vf','odd','con'));

create or replace function public.league_board(p_league uuid, p_from date, p_to date) returns json
language plpgsql security definer set search_path=public as $$
begin
  if not exists(select 1 from league_members where league_id=p_league and user_id=auth.uid()) then
    raise exception 'No perteneces a esa liga'; end if;
  return (select coalesce(json_agg(r order by r.total desc),'[]'::json) from (
    select u.alias,
      coalesce(sum(u.s),0)::int as total,
      coalesce(json_object_agg(u.game,u.s) filter (where u.game is not null),'{}'::json) as g
    from (
      select p.alias, m.user_id, s.game, sum(s.score)::int as s
      from league_members m join profiles p on p.id=m.user_id
      left join scores s on s.user_id=m.user_id and s.day between p_from and p_to
      where m.league_id=p_league
      group by p.alias, m.user_id, s.game) u
    group by u.alias, u.user_id) r);
end $$;

revoke all on function public.league_board(uuid,date,date) from public, anon;
grant execute on function public.league_board(uuid,date,date) to authenticated;
