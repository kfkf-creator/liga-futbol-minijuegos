// Reconstruye la tabla: los 8 primeros de la clasificacion final oficial de una liga.
// src = pagina de Wikipedia de la temporada. Sin empates a puntos en los 8 primeros.
const W = "https://en.wikipedia.org/wiki/";
const T = (title, src, rows) => ({
  title,
  items: rows.map(([t, pts], i) => ({ t, pos: i + 1, pts })),
  src: W + src
});
const reto = (id, o) => Object.assign({ id }, o);

module.exports = [
  reto("ta-01", T("LaLiga 1995/96: los 8 primeros", "1995%E2%80%9396_La_Liga", [
    ["Atlético de Madrid", 87], ["Valencia", 83], ["FC Barcelona", 80], ["Espanyol", 74],
    ["Tenerife", 72], ["Real Madrid", 70], ["Real Sociedad", 63], ["Real Betis", 62]])),
  reto("ta-02", T("LaLiga 2008/09: los 8 primeros", "2008%E2%80%9309_La_Liga", [
    ["FC Barcelona", 87], ["Real Madrid", 78], ["Sevilla", 70], ["Atlético de Madrid", 67],
    ["Villarreal", 65], ["Valencia", 62], ["Deportivo", 58], ["Málaga", 55]])),
  reto("ta-03", T("LaLiga 2012/13: los 8 primeros", "2012%E2%80%9313_La_Liga", [
    ["FC Barcelona", 100], ["Real Madrid", 85], ["Atlético de Madrid", 76], ["Real Sociedad", 66],
    ["Valencia", 65], ["Málaga", 57], ["Real Betis", 56], ["Rayo Vallecano", 53]])),
  reto("ta-04", T("LaLiga 2022/23: los 8 primeros", "2022%E2%80%9323_La_Liga", [
    ["FC Barcelona", 88], ["Real Madrid", 78], ["Atlético de Madrid", 77], ["Real Sociedad", 71],
    ["Villarreal", 64], ["Real Betis", 60], ["Osasuna", 53], ["Athletic Club", 51]])),
  reto("ta-05", T("Premier League 2007/08: los 8 primeros", "2007%E2%80%9308_Premier_League", [
    ["Manchester United", 87], ["Chelsea", 85], ["Arsenal", 83], ["Liverpool", 76],
    ["Everton", 65], ["Aston Villa", 60], ["Blackburn Rovers", 58], ["Portsmouth", 57]])),
  reto("ta-06", T("Premier League 2016/17: los 8 primeros", "2016%E2%80%9317_Premier_League", [
    ["Chelsea", 93], ["Tottenham", 86], ["Manchester City", 78], ["Liverpool", 76],
    ["Arsenal", 75], ["Manchester United", 69], ["Everton", 61], ["Southampton", 46]])),
  reto("ta-07", T("Premier League 2022/23: los 8 primeros", "2022%E2%80%9323_Premier_League", [
    ["Manchester City", 89], ["Arsenal", 84], ["Manchester United", 75], ["Newcastle", 71],
    ["Liverpool", 67], ["Brighton", 62], ["Aston Villa", 61], ["Tottenham", 60]])),
  reto("ta-08", T("Serie A 2015/16: los 8 primeros", "2015%E2%80%9316_Serie_A", [
    ["Juventus", 91], ["Nápoles", 82], ["Roma", 80], ["Inter de Milán", 67],
    ["Fiorentina", 64], ["Sassuolo", 61], ["Milan", 57], ["Lazio", 54]])),
  reto("ta-09", T("Serie A 2021/22: los 8 primeros", "2021%E2%80%9322_Serie_A", [
    ["Milan", 86], ["Inter de Milán", 84], ["Nápoles", 79], ["Juventus", 70],
    ["Lazio", 64], ["Roma", 63], ["Fiorentina", 62], ["Atalanta", 59]])),
  reto("ta-10", T("Serie A 2023/24: los 8 primeros", "2023%E2%80%9324_Serie_A", [
    ["Inter de Milán", 94], ["Milan", 75], ["Juventus", 71], ["Atalanta", 69],
    ["Bologna", 68], ["Roma", 63], ["Lazio", 61], ["Fiorentina", 60]])),
  reto("ta-11", T("Bundesliga 2008/09: los 8 primeros", "2008%E2%80%9309_Bundesliga", [
    ["Wolfsburgo", 69], ["Bayern de Múnich", 67], ["Stuttgart", 64], ["Hertha de Berlín", 63],
    ["Hamburgo", 61], ["Borussia Dortmund", 59], ["Hoffenheim", 55], ["Schalke 04", 50]])),
  reto("ta-12", T("Bundesliga 2023/24: los 8 primeros", "2023%E2%80%9324_Bundesliga", [
    ["Bayer Leverkusen", 90], ["Stuttgart", 73], ["Bayern de Múnich", 72], ["RB Leipzig", 65],
    ["Borussia Dortmund", 63], ["Eintracht de Fráncfort", 47], ["Hoffenheim", 46], ["Heidenheim", 42]])),
  reto("ta-13", T("Ligue 1 2011/12: los 8 primeros", "2011%E2%80%9312_Ligue_1", [
    ["Montpellier", 82], ["Paris Saint-Germain", 79], ["Lille", 74], ["Olympique de Lyon", 64],
    ["Burdeos", 61], ["Rennes", 60], ["Saint-Étienne", 57], ["Toulouse", 56]])),
  reto("ta-14", T("Ligue 1 2016/17: los 8 primeros", "2016%E2%80%9317_Ligue_1", [
    ["Mónaco", 95], ["Paris Saint-Germain", 87], ["Niza", 78], ["Olympique de Lyon", 67],
    ["Olympique de Marsella", 62], ["Burdeos", 59], ["Nantes", 51], ["Saint-Étienne", 50]]))
];
