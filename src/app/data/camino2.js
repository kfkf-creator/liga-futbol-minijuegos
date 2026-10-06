// Camino a la final (2): 26 puzles nuevos. Mismo esquema que camino.js, mas el campo fun (dato curioso).
const W = "https://en.wikipedia.org/wiki/";

module.exports = [
  { id: "ca-15", team: "Hungría", alias: ["Hungria","Hungary"], year: 1954, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Corea del Sur", s: "9-0" },
    { r: "Fase de grupos", opp: "Alemania Occidental", s: "8-3" },
    { r: "Cuartos de final", opp: "Brasil", s: "4-2" },
    { r: "Semifinal", opp: "Uruguay", s: "4-2", note: "Tras prórroga" },
    { r: "Final", opp: "Alemania Occidental", s: "2-3" }
  ], fun: "Hungría ya había goleado 8-3 a Alemania Occidental en la fase de grupos, el mismo rival que la venció en la final, el llamado Milagro de Berna.", src: [W + "1954_FIFA_World_Cup", W + "1954_FIFA_World_Cup_Group_2", W + "1954_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-16", team: "Brasil", alias: ["Brazil"], year: 1958, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Austria", s: "3-0" },
    { r: "Fase de grupos", opp: "Inglaterra", s: "0-0" },
    { r: "Fase de grupos", opp: "URSS", s: "2-0" },
    { r: "Cuartos de final", opp: "Gales", s: "1-0" },
    { r: "Semifinal", opp: "Francia", s: "5-2" },
    { r: "Final", opp: "Suecia", s: "5-2" }
  ], fun: "Pelé tenía 17 años: marcó un hat-trick en la semifinal y dos goles en la final, en el primer Mundial ganado por Brasil.", src: [W + "1958_FIFA_World_Cup"] },

  { id: "ca-17", team: "Inglaterra", alias: ["England"], year: 1966, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Uruguay", s: "0-0" },
    { r: "Fase de grupos", opp: "México", s: "2-0" },
    { r: "Fase de grupos", opp: "Francia", s: "2-0" },
    { r: "Cuartos de final", opp: "Argentina", s: "1-0" },
    { r: "Semifinal", opp: "Portugal", s: "2-1" },
    { r: "Final", opp: "Alemania Occidental", s: "4-2", note: "Tras prórroga" }
  ], fun: "Inglaterra jugó todos sus partidos en Wembley y Geoff Hurst marcó un hat-trick en la final, algo que nadie repitió hasta Mbappé en 2022.", src: [W + "1966_FIFA_World_Cup"] },

  { id: "ca-18", team: "Argentina", alias: [], year: 1978, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Hungría", s: "2-1" },
    { r: "Fase de grupos", opp: "Francia", s: "2-1" },
    { r: "Fase de grupos", opp: "Italia", s: "0-1" },
    { r: "Segunda fase de grupos", opp: "Polonia", s: "2-0" },
    { r: "Segunda fase de grupos", opp: "Brasil", s: "0-0" },
    { r: "Segunda fase de grupos", opp: "Perú", s: "6-0" },
    { r: "Final", opp: "Países Bajos", s: "3-1", note: "Tras prórroga" }
  ], fun: "Argentina necesitaba ganar por cuatro goles a Perú en el último partido de la segunda fase para jugar la final, y ganó 6-0.", src: [W + "1978_FIFA_World_Cup"] },

  { id: "ca-19", team: "Italia", alias: ["Italy"], year: 1982, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Polonia", s: "0-0" },
    { r: "Fase de grupos", opp: "Perú", s: "1-1" },
    { r: "Fase de grupos", opp: "Camerún", s: "1-1" },
    { r: "Segunda fase de grupos", opp: "Argentina", s: "2-1" },
    { r: "Segunda fase de grupos", opp: "Brasil", s: "3-2" },
    { r: "Semifinal", opp: "Polonia", s: "2-0" },
    { r: "Final", opp: "Alemania Occidental", s: "3-1" }
  ], fun: "Paolo Rossi volvió tras una sanción por apuestas, marcó un hat-trick a Brasil y fue Bota de Oro con seis goles.", src: [W + "1982_FIFA_World_Cup"] },

  { id: "ca-20", team: "Alemania Occidental", alias: ["Alemania","Germany","West Germany","RFA","Alemania Federal"], year: 1990, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Yugoslavia", s: "4-1" },
    { r: "Fase de grupos", opp: "Emiratos Árabes Unidos", s: "5-1" },
    { r: "Fase de grupos", opp: "Colombia", s: "1-1" },
    { r: "Octavos de final", opp: "Países Bajos", s: "2-1" },
    { r: "Cuartos de final", opp: "Checoslovaquia", s: "1-0" },
    { r: "Semifinal", opp: "Inglaterra", s: "1-1", pen: "4-3", note: "Tras prórroga" },
    { r: "Final", opp: "Argentina", s: "1-0" }
  ], fun: "La final de Roma fue la primera con expulsados: Argentina acabó con nueve jugadores y Brehme marcó de penalti en el minuto 85.", src: [W + "1990_FIFA_World_Cup", W + "1990_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-21", team: "Francia", alias: ["France"], year: 1998, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Sudáfrica", s: "3-0" },
    { r: "Fase de grupos", opp: "Arabia Saudí", s: "4-0" },
    { r: "Fase de grupos", opp: "Dinamarca", s: "2-1" },
    { r: "Octavos de final", opp: "Paraguay", s: "1-0", note: "Tras prórroga (gol de oro)" },
    { r: "Cuartos de final", opp: "Italia", s: "0-0", pen: "4-3", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Croacia", s: "2-1" },
    { r: "Final", opp: "Brasil", s: "3-0" }
  ], fun: "Zidane marcó dos goles de cabeza a Brasil en la final, los dos tras saques de córner, y Francia ganó su primer Mundial.", src: [W + "1998_FIFA_World_Cup", W + "1998_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-22", team: "Italia", alias: ["Italy"], year: 2006, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Ghana", s: "2-0" },
    { r: "Fase de grupos", opp: "Estados Unidos", s: "1-1" },
    { r: "Fase de grupos", opp: "República Checa", s: "2-0" },
    { r: "Octavos de final", opp: "Australia", s: "1-0" },
    { r: "Cuartos de final", opp: "Ucrania", s: "3-0" },
    { r: "Semifinal", opp: "Alemania", s: "2-0", note: "Tras prórroga" },
    { r: "Final", opp: "Francia", s: "1-1", pen: "5-3", note: "Tras prórroga" }
  ], fun: "La final se recuerda por el cabezazo de Zidane a Materazzi en la prórroga; Italia ganó su cuarto Mundial en los penaltis.", src: [W + "2006_FIFA_World_Cup", W + "2006_FIFA_World_Cup_Group_E", W + "2006_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-23", team: "Países Bajos", alias: ["Paises Bajos","Holanda","Netherlands"], year: 2010, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Dinamarca", s: "2-0" },
    { r: "Fase de grupos", opp: "Japón", s: "1-0" },
    { r: "Fase de grupos", opp: "Camerún", s: "2-1" },
    { r: "Octavos de final", opp: "Eslovaquia", s: "2-1" },
    { r: "Cuartos de final", opp: "Brasil", s: "2-1" },
    { r: "Semifinal", opp: "Uruguay", s: "3-2" },
    { r: "Final", opp: "España", s: "0-1", note: "Tras prórroga" }
  ], fun: "Países Bajos ganó sus seis primeros partidos del torneo y perdió la final con el gol de Iniesta en el minuto 116.", src: [W + "2010_FIFA_World_Cup"] },

  { id: "ca-24", team: "Brasil", alias: ["Brazil"], year: 2002, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Turquía", s: "2-1" },
    { r: "Fase de grupos", opp: "China", s: "4-0" },
    { r: "Fase de grupos", opp: "Costa Rica", s: "5-2" },
    { r: "Octavos de final", opp: "Bélgica", s: "2-0" },
    { r: "Cuartos de final", opp: "Inglaterra", s: "2-1" },
    { r: "Semifinal", opp: "Turquía", s: "1-0" },
    { r: "Final", opp: "Alemania", s: "2-0" }
  ], fun: "Ronaldo marcó los dos goles de la final y fue máximo goleador con ocho tantos; Brasil ganó los siete partidos.", src: [W + "2002_FIFA_World_Cup"] },

  { id: "ca-25", team: "Alemania", alias: ["Germany","Alemania Federal"], year: 2014, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Portugal", s: "4-0" },
    { r: "Fase de grupos", opp: "Ghana", s: "2-2" },
    { r: "Fase de grupos", opp: "Estados Unidos", s: "1-0" },
    { r: "Octavos de final", opp: "Argelia", s: "2-1", note: "Tras prórroga" },
    { r: "Cuartos de final", opp: "Francia", s: "1-0" },
    { r: "Semifinal", opp: "Brasil", s: "7-1" },
    { r: "Final", opp: "Argentina", s: "1-0", note: "Tras prórroga" }
  ], fun: "El 7-1 a Brasil en Belo Horizonte fue la mayor derrota de la historia de Brasil en un Mundial; Götze marcó el gol de la final en el minuto 113.", src: [W + "2014_FIFA_World_Cup", W + "2014_FIFA_World_Cup_Group_G", W + "2014_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-26", team: "Argentina", alias: [], year: 2022, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Arabia Saudí", s: "1-2" },
    { r: "Fase de grupos", opp: "México", s: "2-0" },
    { r: "Fase de grupos", opp: "Polonia", s: "2-0" },
    { r: "Octavos de final", opp: "Australia", s: "2-1" },
    { r: "Cuartos de final", opp: "Países Bajos", s: "2-2", pen: "4-3", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Croacia", s: "3-0" },
    { r: "Final", opp: "Francia", s: "3-3", pen: "4-2", note: "Tras prórroga" }
  ], fun: "Argentina empezó perdiendo con Arabia Saudí y acabó campeona en una final que Mbappé llevó a los penaltis con un hat-trick.", src: [W + "2022_FIFA_World_Cup", W + "2022_FIFA_World_Cup_Group_C", W + "2022_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-27", team: "Marruecos", alias: ["Morocco"], year: 2022, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Croacia", s: "0-0" },
    { r: "Fase de grupos", opp: "Bélgica", s: "2-0" },
    { r: "Fase de grupos", opp: "Canadá", s: "2-1" },
    { r: "Octavos de final", opp: "España", s: "0-0", pen: "3-0", note: "Tras prórroga" },
    { r: "Cuartos de final", opp: "Portugal", s: "1-0" },
    { r: "Semifinal", opp: "Francia", s: "0-2" }
  ], fun: "Marruecos fue la primera selección africana en llegar a una semifinal de un Mundial.", src: [W + "2022_FIFA_World_Cup", W + "2022_FIFA_World_Cup_Group_F", W + "2022_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-28", team: "Alemania", alias: ["Germany"], year: 1996, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "República Checa", s: "2-0" },
    { r: "Fase de grupos", opp: "Rusia", s: "3-0" },
    { r: "Fase de grupos", opp: "Italia", s: "0-0" },
    { r: "Cuartos de final", opp: "Croacia", s: "2-1" },
    { r: "Semifinal", opp: "Inglaterra", s: "1-1", pen: "6-5", note: "Tras prórroga" },
    { r: "Final", opp: "República Checa", s: "2-1", note: "Tras prórroga (gol de oro)" }
  ], fun: "La final se decidió con el primer gol de oro de la historia de la Eurocopa, obra de Oliver Bierhoff.", src: [W + "UEFA_Euro_1996"] },

  { id: "ca-29", team: "Francia", alias: ["France"], year: 2000, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Dinamarca", s: "3-0" },
    { r: "Fase de grupos", opp: "República Checa", s: "2-1" },
    { r: "Fase de grupos", opp: "Países Bajos", s: "2-3" },
    { r: "Cuartos de final", opp: "España", s: "2-1" },
    { r: "Semifinal", opp: "Portugal", s: "2-1", note: "Tras prórroga (gol de oro)" },
    { r: "Final", opp: "Italia", s: "2-1", note: "Tras prórroga (gol de oro)" }
  ], fun: "Wiltord empató en el minuto 94 de la final y Trezeguet dio el título con un gol de oro en la prórroga.", src: [W + "UEFA_Euro_2000"] },

  { id: "ca-30", team: "España", alias: ["Espana","Spain"], year: 2008, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Rusia", s: "4-1" },
    { r: "Fase de grupos", opp: "Suecia", s: "2-1" },
    { r: "Fase de grupos", opp: "Grecia", s: "2-1" },
    { r: "Cuartos de final", opp: "Italia", s: "0-0", pen: "4-2", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Rusia", s: "3-0" },
    { r: "Final", opp: "Alemania", s: "1-0" }
  ], fun: "Fernando Torres marcó el único gol de la final y España ganó su primer título importante desde 1964.", src: [W + "UEFA_Euro_2008"] },

  { id: "ca-31", team: "España", alias: ["Espana","Spain"], year: 2012, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Italia", s: "1-1" },
    { r: "Fase de grupos", opp: "Irlanda", s: "4-0" },
    { r: "Fase de grupos", opp: "Croacia", s: "1-0" },
    { r: "Cuartos de final", opp: "Francia", s: "2-0" },
    { r: "Semifinal", opp: "Portugal", s: "0-0", pen: "4-2", note: "Tras prórroga" },
    { r: "Final", opp: "Italia", s: "4-0" }
  ], fun: "El 4-0 a Italia es la mayor goleada en una final de la Eurocopa, y España enlazó Eurocopa, Mundial y Eurocopa.", src: [W + "UEFA_Euro_2012"] },

  { id: "ca-32", team: "Italia", alias: ["Italy"], year: 2020, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Turquía", s: "3-0" },
    { r: "Fase de grupos", opp: "Suiza", s: "3-0" },
    { r: "Fase de grupos", opp: "Gales", s: "1-0" },
    { r: "Octavos de final", opp: "Austria", s: "2-1", note: "Tras prórroga" },
    { r: "Cuartos de final", opp: "Bélgica", s: "2-1" },
    { r: "Semifinal", opp: "España", s: "1-1", pen: "4-2", note: "Tras prórroga" },
    { r: "Final", opp: "Inglaterra", s: "1-1", pen: "3-2", note: "Tras prórroga" }
  ], fun: "Donnarumma fue elegido mejor jugador del torneo tras parar los penaltis de Sancho y Saka en la final de Wembley.", src: [W + "UEFA_Euro_2020", W + "UEFA_Euro_2020_Group_A", W + "Italy_at_the_UEFA_European_Championship"] },

  { id: "ca-33", team: "Portugal", alias: [], year: 2004, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Grecia", s: "1-2" },
    { r: "Fase de grupos", opp: "Rusia", s: "2-0" },
    { r: "Fase de grupos", opp: "España", s: "1-0" },
    { r: "Cuartos de final", opp: "Inglaterra", s: "2-2", pen: "6-5", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Países Bajos", s: "2-1" },
    { r: "Final", opp: "Grecia", s: "0-1" }
  ], fun: "Portugal perdió la final en casa contra Grecia, el mismo rival que le había ganado 2-1 en el partido inaugural.", src: [W + "UEFA_Euro_2004"] },

  { id: "ca-34", team: "Países Bajos", alias: ["Paises Bajos","Holanda","Netherlands"], year: 1988, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "URSS", s: "0-1" },
    { r: "Fase de grupos", opp: "Inglaterra", s: "3-1" },
    { r: "Fase de grupos", opp: "Irlanda", s: "1-0" },
    { r: "Semifinal", opp: "Alemania Occidental", s: "2-1" },
    { r: "Final", opp: "URSS", s: "2-0" }
  ], fun: "Van Basten marcó en la final una famosa volea desde un ángulo casi imposible y Países Bajos logró su único gran título.", src: [W + "UEFA_Euro_1988"] },

  { id: "ca-35", team: "España", alias: ["Espana","Spain"], year: 2024, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Croacia", s: "3-0" },
    { r: "Fase de grupos", opp: "Italia", s: "1-0" },
    { r: "Fase de grupos", opp: "Albania", s: "1-0" },
    { r: "Octavos de final", opp: "Georgia", s: "4-1" },
    { r: "Cuartos de final", opp: "Alemania", s: "2-1", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Francia", s: "2-1" },
    { r: "Final", opp: "Inglaterra", s: "2-1" }
  ], fun: "España ganó los siete partidos y marcó 15 goles, ambos récords de la Eurocopa. Lamine Yamal cumplió 17 años un día antes de la final.", src: [W + "UEFA_Euro_2024"] },

  { id: "ca-36", team: "Argentina", alias: [], year: 2021, comp: "Copa América", matches: [
    { r: "Fase de grupos", opp: "Chile", s: "1-1" },
    { r: "Fase de grupos", opp: "Uruguay", s: "1-0" },
    { r: "Fase de grupos", opp: "Paraguay", s: "1-0" },
    { r: "Fase de grupos", opp: "Bolivia", s: "4-1" },
    { r: "Cuartos de final", opp: "Ecuador", s: "3-0" },
    { r: "Semifinal", opp: "Colombia", s: "1-1", pen: "3-2" },
    { r: "Final", opp: "Brasil", s: "1-0" }
  ], fun: "Argentina rompió una sequía de 28 años sin títulos con la absoluta al ganar en el Maracaná a Brasil.", src: [W + "2021_Copa_Am%C3%A9rica", W + "Argentina_at_the_Copa_Am%C3%A9rica"] },

  { id: "ca-37", team: "Argentina", alias: [], year: 2024, comp: "Copa América", matches: [
    { r: "Fase de grupos", opp: "Canadá", s: "2-0" },
    { r: "Fase de grupos", opp: "Chile", s: "1-0" },
    { r: "Fase de grupos", opp: "Perú", s: "2-0" },
    { r: "Cuartos de final", opp: "Ecuador", s: "1-1", pen: "4-2" },
    { r: "Semifinal", opp: "Canadá", s: "2-0" },
    { r: "Final", opp: "Colombia", s: "1-0", note: "Tras prórroga" }
  ], fun: "Argentina ganó su 16ª Copa América, récord, con un gol de Lautaro Martínez en el minuto 112 de la final.", src: [W + "2024_Copa_Am%C3%A9rica", W + "2024_Copa_Am%C3%A9rica_knockout_stage"] },

  { id: "ca-38", team: "Chile", alias: [], year: 2015, comp: "Copa América", matches: [
    { r: "Fase de grupos", opp: "Ecuador", s: "2-0" },
    { r: "Fase de grupos", opp: "México", s: "3-3" },
    { r: "Fase de grupos", opp: "Bolivia", s: "5-0" },
    { r: "Cuartos de final", opp: "Uruguay", s: "1-0" },
    { r: "Semifinal", opp: "Perú", s: "2-1" },
    { r: "Final", opp: "Argentina", s: "0-0", pen: "4-1" }
  ], fun: "Chile ganó en casa su primera Copa América venciendo a Argentina en los penaltis, y en 2016 repitió final, rival y desenlace por penaltis.", src: [W + "2015_Copa_Am%C3%A9rica", W + "2015_Copa_Am%C3%A9rica_Group_A", W + "Chile_at_the_Copa_Am%C3%A9rica"] },

  { id: "ca-39", team: "Brasil", alias: ["Brazil"], year: 2019, comp: "Copa América", matches: [
    { r: "Fase de grupos", opp: "Bolivia", s: "3-0" },
    { r: "Fase de grupos", opp: "Venezuela", s: "0-0" },
    { r: "Fase de grupos", opp: "Perú", s: "5-0" },
    { r: "Cuartos de final", opp: "Paraguay", s: "0-0", pen: "4-3" },
    { r: "Semifinal", opp: "Argentina", s: "2-0" },
    { r: "Final", opp: "Perú", s: "3-1" }
  ], fun: "Brasil ganó en casa su novena Copa América sin perder ningún partido; Dani Alves fue elegido mejor jugador.", src: [W + "2019_Copa_Am%C3%A9rica", W + "2019_Copa_Am%C3%A9rica_Group_A", W + "Brazil_at_the_Copa_Am%C3%A9rica"] },

  { id: "ca-40", team: "Uruguay", alias: [], year: 2011, comp: "Copa América", matches: [
    { r: "Fase de grupos", opp: "Perú", s: "1-1" },
    { r: "Fase de grupos", opp: "Chile", s: "1-1" },
    { r: "Fase de grupos", opp: "México", s: "1-0" },
    { r: "Cuartos de final", opp: "Argentina", s: "1-1", pen: "5-4" },
    { r: "Semifinal", opp: "Perú", s: "2-0" },
    { r: "Final", opp: "Paraguay", s: "3-0" }
  ], fun: "Uruguay ganó su 15ª Copa América, récord en aquel momento, y Luis Suárez fue elegido mejor jugador del torneo.", src: [W + "2011_Copa_Am%C3%A9rica", W + "Uruguay_at_the_Copa_Am%C3%A9rica"] }
];
