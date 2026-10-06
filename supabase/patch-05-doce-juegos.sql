-- Parche 5: los 12 juegos pueden guardar nota en las ligas (4 obligatorios al dia, rotando).
-- Ejecutar una vez en el editor SQL.
alter table public.scores drop constraint if exists scores_game_check;
alter table public.scores add constraint scores_game_check
  check (game in ('mm','once','tray','mist','line','vf','odd','con','score','key','road','table'));
