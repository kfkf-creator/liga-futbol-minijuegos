// Camino a la final: partidos de una seleccion en un torneo, en orden cronologico.
// s = goles de la seleccion misteriosa - goles del rival al final del partido (con prorroga si la hubo).
// Si hubo tanda de penaltis, s es el resultado antes de la tanda y pen es la tanda (seleccion misteriosa - rival).
// src = paginas de Wikipedia usadas para verificar los resultados.
const W = "https://en.wikipedia.org/wiki/";

module.exports = [
  { id: "ca-01", team: "Brasil", alias: ["Brazil"], year: 1970, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Checoslovaquia", s: "4-1" },
    { r: "Fase de grupos", opp: "Inglaterra", s: "1-0" },
    { r: "Fase de grupos", opp: "Rumanía", s: "3-2" },
    { r: "Cuartos de final", opp: "Perú", s: "4-2" },
    { r: "Semifinal", opp: "Uruguay", s: "3-1" },
    { r: "Final", opp: "Italia", s: "4-1" }
  ], src: [W + "1970_FIFA_World_Cup", W + "1970_FIFA_World_Cup_Group_3", W + "1970_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-02", team: "Países Bajos", alias: ["Paises Bajos", "Holanda", "Netherlands", "Naranja Mecanica"], year: 1974, comp: "Mundial", matches: [
    { r: "Primera fase", opp: "Uruguay", s: "2-0" },
    { r: "Primera fase", opp: "Suecia", s: "0-0" },
    { r: "Primera fase", opp: "Bulgaria", s: "4-1" },
    { r: "Segunda fase de grupos", opp: "Argentina", s: "4-0" },
    { r: "Segunda fase de grupos", opp: "Alemania Oriental", s: "2-0" },
    { r: "Segunda fase de grupos", opp: "Brasil", s: "2-0" },
    { r: "Final", opp: "Alemania Occidental", s: "1-2" }
  ], src: [W + "1974_FIFA_World_Cup", W + "1974_FIFA_World_Cup_Group_3"] },

  { id: "ca-03", team: "Argentina", alias: [], year: 1986, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Corea del Sur", s: "3-1" },
    { r: "Fase de grupos", opp: "Italia", s: "1-1" },
    { r: "Fase de grupos", opp: "Bulgaria", s: "2-0" },
    { r: "Octavos de final", opp: "Uruguay", s: "1-0" },
    { r: "Cuartos de final", opp: "Inglaterra", s: "2-1" },
    { r: "Semifinal", opp: "Bélgica", s: "2-0" },
    { r: "Final", opp: "Alemania Occidental", s: "3-2" }
  ], src: [W + "1986_FIFA_World_Cup"] },

  { id: "ca-04", team: "Italia", alias: ["Italy"], year: 1994, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Irlanda", s: "0-1" },
    { r: "Fase de grupos", opp: "Noruega", s: "1-0" },
    { r: "Fase de grupos", opp: "México", s: "1-1" },
    { r: "Octavos de final", opp: "Nigeria", s: "2-1", note: "Tras prórroga" },
    { r: "Cuartos de final", opp: "España", s: "2-1" },
    { r: "Semifinal", opp: "Bulgaria", s: "2-1" },
    { r: "Final", opp: "Brasil", s: "0-0", pen: "2-3", note: "Tras prórroga" }
  ], src: [W + "1994_FIFA_World_Cup"] },

  { id: "ca-05", team: "Alemania", alias: ["Germany", "Alemania Federal"], year: 2002, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Arabia Saudí", s: "8-0" },
    { r: "Fase de grupos", opp: "Irlanda", s: "1-1" },
    { r: "Fase de grupos", opp: "Camerún", s: "2-0" },
    { r: "Octavos de final", opp: "Paraguay", s: "1-0" },
    { r: "Cuartos de final", opp: "Estados Unidos", s: "1-0" },
    { r: "Semifinal", opp: "Corea del Sur", s: "1-0" },
    { r: "Final", opp: "Brasil", s: "0-2" }
  ], src: [W + "2002_FIFA_World_Cup", W + "2002_FIFA_World_Cup_Group_E", W + "2002_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-06", team: "España", alias: ["Espana", "Spain"], year: 2010, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Suiza", s: "0-1" },
    { r: "Fase de grupos", opp: "Honduras", s: "2-0" },
    { r: "Fase de grupos", opp: "Chile", s: "2-1" },
    { r: "Octavos de final", opp: "Portugal", s: "1-0" },
    { r: "Cuartos de final", opp: "Paraguay", s: "1-0" },
    { r: "Semifinal", opp: "Alemania", s: "1-0" },
    { r: "Final", opp: "Países Bajos", s: "1-0", note: "Tras prórroga" }
  ], src: [W + "2010_FIFA_World_Cup", W + "2010_FIFA_World_Cup_Group_H"] },

  { id: "ca-07", team: "Croacia", alias: ["Croatia"], year: 2018, comp: "Mundial", matches: [
    { r: "Fase de grupos", opp: "Nigeria", s: "2-0" },
    { r: "Fase de grupos", opp: "Argentina", s: "3-0" },
    { r: "Fase de grupos", opp: "Islandia", s: "2-1" },
    { r: "Octavos de final", opp: "Dinamarca", s: "1-1", pen: "3-2", note: "Tras prórroga" },
    { r: "Cuartos de final", opp: "Rusia", s: "2-2", pen: "4-3", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Inglaterra", s: "2-1", note: "Tras prórroga" },
    { r: "Final", opp: "Francia", s: "2-4" }
  ], src: [W + "2018_FIFA_World_Cup", W + "2018_FIFA_World_Cup_knockout_stage"] },

  { id: "ca-08", team: "Francia", alias: ["France"], year: 1984, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Dinamarca", s: "1-0" },
    { r: "Fase de grupos", opp: "Bélgica", s: "5-0" },
    { r: "Fase de grupos", opp: "Yugoslavia", s: "3-2" },
    { r: "Semifinal", opp: "Portugal", s: "3-2", note: "Tras prórroga" },
    { r: "Final", opp: "España", s: "2-0" }
  ], src: [W + "UEFA_Euro_1984"] },

  { id: "ca-09", team: "URSS", alias: ["Unión Soviética", "Union Sovietica", "Soviet Union", "CCCP", "Rusia"], year: 1988, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Países Bajos", s: "1-0" },
    { r: "Fase de grupos", opp: "Irlanda", s: "1-1" },
    { r: "Fase de grupos", opp: "Inglaterra", s: "3-1" },
    { r: "Semifinal", opp: "Italia", s: "2-0" },
    { r: "Final", opp: "Países Bajos", s: "0-2" }
  ], src: [W + "UEFA_Euro_1988", W + "UEFA_Euro_1988_Group_2"] },

  { id: "ca-10", team: "Dinamarca", alias: ["Denmark"], year: 1992, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Inglaterra", s: "0-0" },
    { r: "Fase de grupos", opp: "Suecia", s: "0-1" },
    { r: "Fase de grupos", opp: "Francia", s: "2-1" },
    { r: "Semifinal", opp: "Países Bajos", s: "2-2", pen: "5-4", note: "Tras prórroga" },
    { r: "Final", opp: "Alemania", s: "2-0" }
  ], src: [W + "UEFA_Euro_1992", W + "UEFA_Euro_1992_Group_A", W + "UEFA_Euro_1992_knockout_stage"] },

  { id: "ca-11", team: "Grecia", alias: ["Greece"], year: 2004, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Portugal", s: "2-1" },
    { r: "Fase de grupos", opp: "España", s: "1-1" },
    { r: "Fase de grupos", opp: "Rusia", s: "1-2" },
    { r: "Cuartos de final", opp: "Francia", s: "1-0" },
    { r: "Semifinal", opp: "República Checa", s: "1-0", note: "Gol de plata en la prórroga" },
    { r: "Final", opp: "Portugal", s: "1-0" }
  ], src: [W + "UEFA_Euro_2004", W + "UEFA_Euro_2004_Group_A"] },

  { id: "ca-12", team: "Turquía", alias: ["Turquia", "Turkiye", "Türkiye", "Turkey"], year: 2008, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Portugal", s: "0-2" },
    { r: "Fase de grupos", opp: "Suiza", s: "2-1" },
    { r: "Fase de grupos", opp: "República Checa", s: "3-2" },
    { r: "Cuartos de final", opp: "Croacia", s: "1-1", pen: "3-1", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Alemania", s: "2-3" }
  ], src: [W + "UEFA_Euro_2008", W + "UEFA_Euro_2008_Group_A", W + "UEFA_Euro_2008_knockout_stage"] },

  { id: "ca-13", team: "Portugal", alias: [], year: 2016, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Islandia", s: "1-1" },
    { r: "Fase de grupos", opp: "Austria", s: "0-0" },
    { r: "Fase de grupos", opp: "Hungría", s: "3-3" },
    { r: "Octavos de final", opp: "Croacia", s: "1-0", note: "Tras prórroga" },
    { r: "Cuartos de final", opp: "Polonia", s: "1-1", pen: "5-3", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Gales", s: "2-0" },
    { r: "Final", opp: "Francia", s: "1-0", note: "Tras prórroga" }
  ], src: [W + "UEFA_Euro_2016", W + "UEFA_Euro_2016_knockout_phase"] },

  { id: "ca-14", team: "Inglaterra", alias: ["England"], year: 2024, comp: "Eurocopa", matches: [
    { r: "Fase de grupos", opp: "Serbia", s: "1-0" },
    { r: "Fase de grupos", opp: "Dinamarca", s: "1-1" },
    { r: "Fase de grupos", opp: "Eslovenia", s: "0-0" },
    { r: "Octavos de final", opp: "Eslovaquia", s: "2-1", note: "Tras prórroga" },
    { r: "Cuartos de final", opp: "Suiza", s: "1-1", pen: "5-3", note: "Tras prórroga" },
    { r: "Semifinal", opp: "Países Bajos", s: "2-1" },
    { r: "Final", opp: "España", s: "1-2" }
  ], src: [W + "UEFA_Euro_2024", W + "UEFA_Euro_2024_Group_C", W + "UEFA_Euro_2024_knockout_phase"] }
];
