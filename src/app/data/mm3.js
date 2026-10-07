const W = "https://en.wikipedia.org/wiki/";
const mk = (page) => (n, v, src) => ({n, v, src: src || (W + page)});

const cl = mk("List_of_UEFA_Champions_League_top_scorers");
const wcg = mk("List_of_FIFA_World_Cup_top_goalscorers");
const sa = mk("List_of_Serie_A_players_with_100_or_more_goals");
const l1 = mk("List_of_Ligue_1_top_scorers");
const cla = mk("List_of_footballers_with_100_or_more_UEFA_Champions_League_appearances");
const pla = mk("List_of_footballers_with_500_or_more_Premier_League_appearances");
const bla = mk("List_of_Bundesliga_players");
const wca = mk("List_of_players_who_have_appeared_in_the_most_FIFA_World_Cups");
const mg = mk("List_of_football_managers_with_the_most_games");
const plm = mk("List_of_Premier_League_managers");
const blm = mk("List_of_Bundesliga_managers");
const stE = mk("List_of_football_stadiums_in_England");
const stD = mk("List_of_football_stadiums_in_Germany");
const stI = mk("List_of_football_stadiums_in_Italy");
const stF = mk("List_of_football_stadiums_in_France");
const stB = mk("List_of_football_stadiums_in_Brazil");
const clr = mk("European_Cup_and_UEFA_Champions_League_records_and_statistics");
const blt = mk("All-time_Bundesliga_table");
const e24 = mk("UEFA_Euro_2024_statistics");
const copaSrc = "https://copaamerica.com/en/news/copa-america-all-time-standings-teams-matches-wins-goals-scored";

module.exports = [
  {
    id: "mm-champions-goleadores-retirados", cat: "Jugadores",
    q: "¿Quién ha marcado más goles en la historia de la Champions League?",
    unit: "goles", asof: "Champions League hasta 2025/26 (solo jugadores que ya no la disputan)",
    items: [
      cl("Cristiano Ronaldo", 140), cl("Lionel Messi", 129), cl("Karim Benzema", 90), cl("Raúl", 71),
      cl("Ruud van Nistelrooy", 56), cl("Thierry Henry", 50), cl("Alfredo Di Stéfano", 49),
      cl("Andriy Shevchenko", 48), cl("Eusébio", 46), cl("Didier Drogba", 44), cl("Neymar", 43),
      cl("Alessandro Del Piero", 42), cl("Sergio Agüero", 41), cl("Ferenc Puskás", 36), cl("Edinson Cavani", 35)
    ]
  },
  {
    id: "mm-mundial-goles-historicos", cat: "Jugadores",
    q: "¿Quién ha marcado más goles en la historia de los Mundiales?",
    unit: "goles en Mundiales", asof: "Mundiales hasta la edición de 2026",
    items: [
      wcg("Kylian Mbappé", 22), wcg("Lionel Messi", 21), wcg("Miroslav Klose", 16), wcg("Ronaldo (Brasil)", 15),
      wcg("Gerd Müller", 14), wcg("Just Fontaine", 13), wcg("Pelé", 12), wcg("Sándor Kocsis", 11),
      {n: "Grzegorz Lato", v: 10, src: "https://www.topendsports.com/events/worldcupsoccer/goal-scorers-total.htm"},
      wcg("Ademir", 9)
    ]
  },
  {
    id: "mm-mundial-partidos-jugador", cat: "Jugadores",
    q: "¿Quién ha jugado más partidos en la historia de los Mundiales?",
    unit: "partidos en Mundiales", asof: "Mundiales hasta 2026 (sin Messi ni Cristiano, activos en 2026)",
    items: [
      wca("Lothar Matthäus", 25), wca("Miroslav Klose", 24),
      wca("Paolo Maldini", 23), wca("Kylian Mbappé", 22), wca("Diego Maradona", 21), wca("Cafu", 20),
      wca("Ronaldo (Brasil)", 19), wca("Franz Beckenbauer", 18), wca("Iker Casillas", 17), wca("Roberto Baggio", 16)
    ]
  },
  {
    id: "mm-seriea-goleadores-historicos", cat: "Jugadores",
    q: "¿Quién ha marcado más goles en la historia de la Serie A italiana?",
    unit: "goles en Serie A", asof: "Serie A hasta 2025/26 (solo jugadores retirados)",
    items: [
      sa("Silvio Piola", 274), sa("Francesco Totti", 250), sa("Gunnar Nordahl", 225), sa("Giuseppe Meazza", 216),
      sa("Antonio Di Natale", 209), sa("Roberto Baggio", 205), sa("Kurt Hamrin", 190), sa("Gabriel Batistuta", 183),
      sa("Fabio Quagliarella", 182), sa("Giampiero Boniperti", 178), sa("Amedeo Amadei", 174),
      sa("Giuseppe Savoldi", 168), sa("Guglielmo Gabetto", 164), sa("Roberto Boninsegna", 162), sa("Luca Toni", 157)
    ]
  },
  {
    id: "mm-ligue1-goleadores-historicos", cat: "Jugadores",
    q: "¿Quién ha marcado más goles en la historia de la Ligue 1 francesa?",
    unit: "goles en Ligue 1", asof: "Ligue 1 hasta 2025/26 (solo jugadores retirados)",
    items: [
      l1("Delio Onnis", 299), l1("Bernard Lacombe", 255), l1("Hervé Revelli", 216), l1("Roger Courtois", 210),
      l1("Thadée Cisowski", 206), l1("Roger Piantoni", 203), l1("Joseph Ujlaki", 190), l1("Fleury Di Nallo", 187),
      l1("Carlos Bianchi", 179), l1("Hassan Akesbi", 173), l1("Jean Baratte", 169), l1("Just Fontaine", 164),
      l1("Alain Giresse", 163), l1("André Guy", 159), l1("Désiré Koranyi", 157), l1("Jean-Pierre Papin", 156)
    ]
  },
  {
    id: "mm-champions-partidos-retirados", cat: "Jugadores",
    q: "¿Quién ha jugado más partidos en la Champions League?",
    unit: "partidos en Champions", asof: "Champions League hasta 2025/26 (solo jugadores que ya no la disputan)",
    items: [
      cla("Cristiano Ronaldo", 183), cla("Iker Casillas", 177), cla("Lionel Messi", 163), cla("Karim Benzema", 152),
      cla("Xavi", 151), cla("Raúl", 142), cla("Ryan Giggs", 141), cla("Andrés Iniesta", 130),
      cla("Sergio Busquets", 129), cla("Gerard Piqué", 128), cla("Clarence Seedorf", 125),
      cla("Paul Scholes", 124), cla("Roberto Carlos", 120)
    ]
  },
  {
    id: "mm-premier-partidos-retirados", cat: "Jugadores",
    q: "¿Quién ha jugado más partidos en la Premier League?",
    unit: "partidos en Premier", asof: "Premier League hasta 2025/26 (solo jugadores retirados)",
    items: [
      pla("Gareth Barry", 653), pla("Ryan Giggs", 632), pla("Frank Lampard", 609), pla("David James", 572),
      pla("Gary Speed", 535), pla("Emile Heskey", 516), pla("Mark Schwarzer", 514), pla("Jamie Carragher", 508),
      pla("Phil Neville", 505), pla("Sol Campbell", 503)
    ]
  },
  {
    id: "mm-bundesliga-partidos-retirados", cat: "Jugadores",
    q: "¿Quién ha jugado más partidos en la Bundesliga?",
    unit: "partidos en Bundesliga", asof: "Bundesliga hasta 2025/26 (solo jugadores retirados)",
    items: [
      bla("Charly Körbel", 602), bla("Manfred Kaltz", 581), bla("Oliver Kahn", 557), bla("Klaus Fichtel", 552),
      bla("Miroslav Votava", 546), bla("Klaus Fischer", 535), bla("Eike Immel", 534), bla("Willi Neuberger", 520),
      bla("Michael Lameck", 518), bla("Uli Stein", 512), bla("Stefan Reuter", 502), bla("Bernard Dietz", 495),
      bla("Ditmar Jakobs", 493), bla("Claudio Pizarro", 490), bla("Reiner Geye", 485), bla("Dieter Burdenski", 478)
    ]
  },
  {
    id: "mm-entrenadores-partidos-historicos", cat: "Entrenadores",
    q: "¿Qué entrenador ha dirigido más partidos en toda su carrera?",
    unit: "partidos dirigidos", asof: "Wikipedia 2026 (solo entrenadores retirados o fallecidos)",
    items: [
      mg("Alex Ferguson", 2155), mg("Walter Fritzsch", 1900), mg("Arsène Wenger", 1785), mg("Guy Roux", 1754),
      mg("Jim Smith", 1749), mg("Graham Turner", 1718), mg("Barry Fry", 1712), mg("Ronnie McFall", 1694),
      mg("Bill Struth", 1655), mg("Willie Maley", 1612)
    ]
  },
  {
    id: "mm-bundesliga-entrenadores-partidos", cat: "Entrenadores",
    q: "¿Qué entrenador ha dirigido más partidos de Bundesliga?",
    unit: "partidos de Bundesliga", asof: "Bundesliga hasta 2025/26 (solo entrenadores que ya no la dirigen)",
    items: [
      blm("Otto Rehhagel", 836), blm("Jupp Heynckes", 669), blm("Erich Ribbeck", 569), blm("Thomas Schaaf", 525),
      blm("Udo Lattek", 522), blm("Friedhelm Funkel", 518), blm("Felix Magath", 503), blm("Hennes Weisweiler", 470),
      blm("Ottmar Hitzfeld", 461), blm("Christoph Daum", 426), blm("Karl-Heinz Feldkamp", 414),
      blm("Branko Zebec", 413), blm("Heinz Höher", 396), blm("Christian Streich", 391)
    ]
  },
  {
    id: "mm-estadios-inglaterra", cat: "Estadios",
    q: "¿Qué estadio de fútbol de Inglaterra tiene más capacidad?",
    unit: "espectadores", asof: "Capacidades según Wikipedia, 2026",
    items: [
      stE("Wembley", 90000), stE("Old Trafford", 74244), stE("Tottenham Hotspur Stadium", 62850),
      stE("London Stadium", 62500), stE("Anfield", 61276), stE("Etihad Stadium", 61038),
      stE("Emirates Stadium", 60704), stE("Hill Dickinson Stadium", 52769), stE("St James' Park", 52719),
      stE("Stadium of Light", 48095), stE("Villa Park", 43205), stE("Stamford Bridge", 40044),
      stE("Elland Road", 37645), stE("Hillsborough", 34835)
    ]
  },
  {
    id: "mm-estadios-alemania", cat: "Estadios",
    q: "¿Qué estadio de fútbol de Alemania tiene más capacidad?",
    unit: "espectadores", asof: "Capacidades según Wikipedia, 2026",
    items: [
      stD("Signal Iduna Park", 81365), stD("Allianz Arena", 75024), stD("Olympiastadion Berlín", 74475),
      stD("Veltins-Arena", 62271), stD("MHPArena (Stuttgart)", 60058), stD("Deutsche Bank Park", 59500),
      stD("Volksparkstadion", 57000), stD("Merkur Spiel-Arena", 54600), stD("Borussia-Park", 54022),
      stD("Max-Morlock-Stadion", 50000), stD("RheinEnergieStadion", 49698), stD("Fritz-Walter-Stadion", 49327),
      stD("Heinz-von-Heiden-Arena", 49000), stD("Red Bull Arena (Leipzig)", 47800)
    ]
  },
  {
    id: "mm-estadios-italia", cat: "Estadios",
    q: "¿Qué estadio de fútbol de Italia tiene más capacidad?",
    unit: "espectadores", asof: "Capacidades según Wikipedia, 2026",
    items: [
      stI("San Siro", 75817), stI("Stadio Olimpico (Roma)", 70634), stI("San Nicola (Bari)", 58270),
      stI("Diego Armando Maradona (Nápoles)", 54732), stI("Artemio Franchi (Florencia)", 43147),
      stI("Allianz Stadium (Turín)", 41507), stI("Bentegodi (Verona)", 39371), stI("San Filippo (Mesina)", 38722),
      stI("Renato Dall'Ara (Bolonia)", 38279), stI("Renzo Barbera (Palermo)", 36349),
      stI("Luigi Ferraris (Génova)", 33205), stI("Euganeo (Padua)", 32336), stI("Via del Mare (Lecce)", 31533),
      stI("Arechi (Salerno)", 31300)
    ]
  },
  {
    id: "mm-estadios-francia", cat: "Estadios",
    q: "¿Qué estadio de fútbol de Francia tiene más capacidad?",
    unit: "espectadores", asof: "Capacidades según Wikipedia, 2026",
    items: [
      stF("Stade de France", 81338), stF("Stade Vélodrome", 67394), stF("Parc Olympique Lyonnais", 59186),
      stF("Stade Pierre-Mauroy (Lille)", 50157), stF("Parc des Princes", 47929), stF("Matmut Atlantique (Burdeos)", 42115),
      stF("Stade Geoffroy-Guichard", 41965), stF("Stade Bollaert-Delelis (Lens)", 38223),
      stF("Stade de la Beaujoire (Nantes)", 37473), stF("Allianz Riviera (Niza)", 35624),
      stF("Stadium Municipal (Toulouse)", 33150), stF("Stade de la Mosson (Montpellier)", 32939),
      stF("Stade de la Meinau (Estrasburgo)", 32300)
    ]
  },
  {
    id: "mm-estadios-brasil", cat: "Estadios",
    q: "¿Qué estadio de fútbol de Brasil tiene más capacidad?",
    unit: "espectadores", asof: "Capacidades según Wikipedia, 2026",
    items: [
      stB("Maracanã", 73193), stB("Mané Garrincha (Brasilia)", 69910), stB("Mineirão", 66658), stB("Morumbi", 66435),
      stB("Arruda (Recife)", 60044), stB("Arena Castelão (Fortaleza)", 57876), stB("Arena do Grêmio", 55662),
      stB("Mangueirão (Belém)", 53635), stB("Beira-Rio", 49055), stB("Arena Fonte Nova (Salvador)", 47915),
      stB("Arena Corinthians", 47252), stB("Arena Pernambuco", 45440), stB("Nilton Santos", 45000),
      stB("Arena MRV (Belo Horizonte)", 44892)
    ]
  },
  {
    id: "mm-champions-clubes-puntos", cat: "Clubes",
    q: "¿Qué club suma más puntos en la historia de la Copa de Europa y la Champions League?",
    unit: "puntos", asof: "Clasificación histórica de la Champions según Wikipedia, septiembre de 2026 (puede cambiar cada jornada)",
    items: [
      clr("Real Madrid", 709), clr("Bayern de Múnich", 594), clr("FC Barcelona", 521), clr("Juventus", 399),
      clr("Manchester United", 394), clr("Liverpool", 366), clr("Benfica", 355), clr("Milan", 347),
      clr("Oporto", 313), clr("Arsenal", 305), clr("Inter", 294), clr("Ajax", 292), clr("Dinamo de Kiev", 275),
      clr("Chelsea", 272), clr("Celtic", 258), clr("Paris Saint-Germain", 243)
    ]
  },
  {
    id: "mm-champions-clubes-goles", cat: "Clubes",
    q: "¿Qué club ha marcado más goles en la historia de la Copa de Europa y la Champions League?",
    unit: "goles", asof: "Clasificación histórica de la Champions según Wikipedia, septiembre de 2026 (puede cambiar cada jornada)",
    items: [
      clr("Real Madrid", 1139), clr("Bayern de Múnich", 904), clr("FC Barcelona", 767), clr("Manchester United", 549),
      clr("Benfica", 519), clr("Liverpool", 516), clr("Juventus", 510), clr("Milan", 457), clr("Arsenal", 413),
      clr("Oporto", 411), clr("Ajax", 404), clr("Paris Saint-Germain", 391), clr("Dinamo de Kiev", 369),
      clr("Chelsea", 361), clr("Inter", 344)
    ]
  },
  {
    id: "mm-bundesliga-clubes-puntos-historicos", cat: "Clubes",
    q: "¿Qué club suma más puntos en la clasificación histórica de la Bundesliga?",
    unit: "puntos", asof: "Clasificación histórica de la Bundesliga hasta el final de 2025/26 (16 de mayo de 2026)",
    items: [
      blt("Bayern de Múnich", 4238), blt("Borussia Dortmund", 3272), blt("Werder Bremen", 3047),
      blt("VfB Stuttgart", 2950), blt("Borussia Mönchengladbach", 2879), blt("Hamburgo", 2771),
      blt("Eintracht Frankfurt", 2639), blt("Bayer Leverkusen", 2569), blt("Schalke 04", 2563),
      blt("1. FC Köln", 2516), blt("Kaiserslautern", 2094), blt("Hertha Berlín", 1771), blt("Bochum", 1509),
      blt("Wolfsburgo", 1350), blt("Núremberg", 1318)
    ]
  },
  {
    id: "mm-eurocopa-2024-goles-seleccion", cat: "Selecciones",
    q: "¿Qué selección marcó más goles en la Eurocopa 2024?",
    unit: "goles", asof: "Eurocopa 2024 (torneo terminado)",
    items: [
      e24("España", 15), e24("Alemania", 11), e24("Países Bajos", 10), e24("Inglaterra", 8), e24("Austria", 7),
      e24("Portugal", 5), e24("Francia", 4), e24("Italia", 3), e24("Bélgica", 2), e24("Serbia", 1)
    ]
  },
  {
    id: "mm-copa-america-goles-historicos-seleccion", cat: "Selecciones",
    q: "¿Qué selección ha marcado más goles en la historia de la Copa América?",
    unit: "goles", asof: "Copa América hasta la edición de 2024 (48 ediciones)",
    items: [
      {n: "Argentina", v: 483, src: copaSrc}, {n: "Brasil", v: 435, src: copaSrc}, {n: "Uruguay", v: 421, src: copaSrc},
      {n: "Chile", v: 291, src: copaSrc}, {n: "Paraguay", v: 267, src: copaSrc}, {n: "Perú", v: 230, src: copaSrc},
      {n: "Colombia", v: 154, src: copaSrc}, {n: "Ecuador", v: 139, src: copaSrc}, {n: "Bolivia", v: 109, src: copaSrc},
      {n: "México", v: 67, src: copaSrc}, {n: "Venezuela", v: 59, src: copaSrc}, {n: "Estados Unidos", v: 21, src: copaSrc},
      {n: "Costa Rica", v: 19, src: copaSrc}, {n: "Panamá", v: 10, src: copaSrc}
    ]
  }
];
