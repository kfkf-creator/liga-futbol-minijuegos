// Conexiones de futbol (estilo NYT Connections). 12 retos, 4 grupos de 4.
// diff 1 (facil) a 4 (dificil, con trampa). "src" = fuentes usadas para verificar cada grupo.
const W = "https://en.wikipedia.org/wiki/";
const WC = W + "List_of_FIFA_World_Cup_finals";
const EU = W + "UEFA_European_Championship";
const AF = W + "Africa_Cup_of_Nations";
const BO = W + "Ballon_d%27Or";
const MG = W + "List_of_European_Cup_and_UEFA_Champions_League_winning_managers";
const PI = W + "Pichichi_Trophy";
const RC = W + "UEFA_Cup_Winners%27_Cup";

module.exports = [
  { id: "con-01", note: "Trampa: Paises Bajos tambien gano la Eurocopa 1988 (encajaria en el grupo de campeonas de Eurocopa sin Mundial), pero ese grupo ya tiene cuatro seguras y el de finalistas necesita a Paises Bajos para llegar a cuatro (Hungria, Suecia y Croacia). Checoslovaquia tambien seria finalista sin titulo, pero no aparece.", groups: [
    { name: "Selecciones campeonas del mundo", items: ["Uruguay", "Inglaterra", "Francia", "España"], diff: 1, src: [WC] },
    { name: "Campeonas de la Copa Africana de Naciones", items: ["Egipto", "Camerún", "Ghana", "Nigeria"], diff: 2, src: [AF] },
    { name: "Campeonas de la Eurocopa que nunca ganaron un Mundial", items: ["Dinamarca", "Grecia", "Portugal", "URSS"], diff: 3, src: [EU, WC] },
    { name: "Finalistas de un Mundial que nunca lo ganaron", items: ["Países Bajos", "Hungría", "Suecia", "Croacia"], diff: 4, src: [WC] }
  ]},
  { id: "con-02", note: "Despiste: Platini, Zidane, Rossi y Baggio ganaron el Balon de Oro en la Juventus, Matthaus en el Inter, Cannavaro y Kopa en el Real Madrid. Se agrupan por nacionalidad, no por club.", groups: [
    { name: "Balones de Oro brasileños", items: ["Rivaldo", "Ronaldinho", "Kaká", "Ronaldo"], diff: 1, src: [BO] },
    { name: "Balones de Oro franceses", items: ["Kopa", "Platini", "Papin", "Zidane"], diff: 2, src: [BO] },
    { name: "Balones de Oro italianos", items: ["Gianni Rivera", "Paolo Rossi", "Roberto Baggio", "Cannavaro"], diff: 3, src: [BO] },
    { name: "Balones de Oro alemanes", items: ["Gerd Müller", "Rummenigge", "Matthäus", "Sammer"], diff: 4, src: [BO] }
  ]},
  { id: "con-03", note: "Trampa doble con solucion unica: Guardiola (Barca y Manchester City) y Ancelotti (Milan y Real Madrid) encajan en dos grupos. Barca y Real Madrid tienen exactamente cuatro candidatos cada uno, asi que Guardiola va al Barca y Ancelotti al Madrid; Inglaterra e Italia se completan solos.", groups: [
    { name: "Entrenadores campeones de Europa con el Real Madrid", items: ["Del Bosque", "Ancelotti", "Zidane", "Heynckes"], diff: 1, src: [MG] },
    { name: "Entrenadores campeones de Europa con el Barcelona", items: ["Cruyff", "Rijkaard", "Guardiola", "Luis Enrique"], diff: 2, src: [MG] },
    { name: "Entrenadores campeones de Europa con clubes ingleses", items: ["Ferguson", "Paisley", "Clough", "Klopp"], diff: 3, src: [MG] },
    { name: "Entrenadores campeones de Europa con clubes italianos", items: ["Sacchi", "Capello", "Lippi", "Trapattoni"], diff: 4, src: [MG] }
  ]},
  { id: "con-04", note: "Trampa: existe un River Plate en Montevideo, pero el grupo de Buenos Aires necesita exactamente a Boca, River, San Lorenzo y Velez. Racing e Independiente son de Avellaneda y no aparecen.", groups: [
    { name: "Clubes de Londres", items: ["Arsenal", "Chelsea", "Tottenham", "West Ham"], diff: 1, src: [W + "List_of_football_clubs_in_London"] },
    { name: "Clubes de Estambul", items: ["Galatasaray", "Fenerbahçe", "Beşiktaş", "Başakşehir"], diff: 2, src: [W + "Galatasaray_S.K._(football)", W + "Fenerbah%C3%A7e_S.K._(football)", W + "Be%C5%9Fikta%C5%9F_J.K.", W + "%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_F.K."] },
    { name: "Clubes de la ciudad de Buenos Aires", items: ["Boca Juniors", "River Plate", "San Lorenzo", "Vélez Sarsfield"], diff: 3, src: [W + "List_of_football_clubs_in_Argentina"] },
    { name: "Clubes de Montevideo", items: ["Peñarol", "Nacional", "Danubio", "Liverpool"], diff: 4, src: [W + "Uruguayan_Primera_Divisi%C3%B3n", W + "Liverpool_F.C._(Montevideo)"] }
  ]},
  { id: "con-05", note: "Trampa: el Vicente Calderon tambien esta demolido, pero el grupo de estadios con nombre de presidente necesita a Bernabeu, Sanchez-Pizjuan, Villamarin y Calderon para llegar a cuatro; Sarria, Delle Alpi, Maine Road y Upton Park son los demolidos restantes.", groups: [
    { name: "Estadios de la Premier League 2025/26", items: ["Anfield", "Old Trafford", "Stamford Bridge", "St James' Park"], diff: 1, src: [W + "List_of_Premier_League_stadiums"] },
    { name: "Estadios de la Bundesliga 2025/26", items: ["Allianz Arena", "Signal Iduna Park", "BayArena", "Borussia-Park"], diff: 2, src: ["https://www.bundesliga.com/en/bundesliga/news/stadiums-germany-2025-26-allianz-arena-signal-iduna-park-32656"] },
    { name: "Estadios que llevan el nombre de un presidente del club", items: ["Bernabéu", "Sánchez-Pizjuán", "Villamarín", "Vicente Calderón"], diff: 3, src: ["https://es.wikipedia.org/wiki/Estadio_Santiago_Bernab%C3%A9u", "https://es.wikipedia.org/wiki/Estadio_Ram%C3%B3n_S%C3%A1nchez-Pizju%C3%A1n", "https://es.wikipedia.org/wiki/Estadio_Benito_Villamar%C3%ADn", "https://es.wikipedia.org/wiki/Estadio_Vicente_Calder%C3%B3n"] },
    { name: "Estadios de fútbol ya demolidos", items: ["Sarrià", "Delle Alpi", "Maine Road", "Upton Park"], diff: 4, src: [W + "Sarri%C3%A0_Stadium", W + "Stadio_delle_Alpi", W + "Maine_Road", W + "Boleyn_Ground"] }
  ]},
  { id: "con-06", note: "Despiste: Pericos (periquitos) y Canarinho (canario) son aves, pero son apodos de equipos, no de futbolistas. El grupo de animales es solo de apodos de jugadores.", groups: [
    { name: "Apodos de futbolistas que son animales", items: ["La Pulga", "El Buitre", "El Tigre", "La Pantera Negra"], diff: 1, src: [W + "Lionel_Messi", W + "Emilio_Butrague%C3%B1o", W + "Radamel_Falcao", W + "Eus%C3%A9bio"] },
    { name: "Apodos de entrenadores", items: ["El Loco", "El Flaco", "El Cholo", "The Special One"], diff: 2, src: [W + "Marcelo_Bielsa", W + "C%C3%A9sar_Luis_Menotti", W + "Diego_Simeone", W + "Jos%C3%A9_Mourinho"] },
    { name: "Apodos de clubes españoles", items: ["Colchoneros", "Pericos", "Txuri-urdin", "Submarino Amarillo"], diff: 3, src: [W + "Atl%C3%A9tico_Madrid", W + "RCD_Espanyol", W + "Real_Sociedad", W + "Villarreal_CF"] },
    { name: "Apodos de selecciones nacionales", items: ["Albiceleste", "Canarinho", "Azzurri", "Die Mannschaft"], diff: 4, src: [W + "Argentina_national_football_team", W + "Brazil_national_football_team", W + "Italy_national_football_team", W + "Germany_national_football_team"] }
  ]},
  { id: "con-07", note: "Trampa: Hugo Sanchez gano el Pichichi con el Atletico (1985) y con el Real Madrid (1986, 1987, 1988 y 1990; en 1989 lo gano Baltazar, del Atletico), pero el grupo del Real Madrid tiene ya cuatro seguros (Di Stefano, Puskas, Raul, Benzema) y el del Atletico necesita a Hugo para llegar a cuatro. Alos comparte el Pichichi de 1957-58 (Valencia) con Badenes y Di Stefano, y Wikipedia lo cuenta como ganador.", groups: [
    { name: "Pichichis con el Real Madrid", items: ["Di Stéfano", "Puskás", "Raúl", "Benzema"], diff: 1, src: [PI] },
    { name: "Pichichis con el Barcelona", items: ["Romário", "Eto'o", "Luis Suárez", "Lewandowski"], diff: 2, src: [PI] },
    { name: "Pichichis con el Valencia", items: ["Mundo", "Waldo", "Kempes", "Alós"], diff: 3, src: [PI] },
    { name: "Pichichis con el Atlético de Madrid", items: ["Aragonés", "Baltazar", "Forlán", "Hugo Sánchez"], diff: 4, src: [PI] }
  ]},
  { id: "con-08", note: "Trampa: Butragueño pertenece a La Quinta del Buitre, pero el grupo del 7 del Real Madrid solo llega a cuatro con él (Raul, Cristiano, Juanito). Los otros cuatro de La Quinta son Michel, Martin Vazquez, Sanchis y Pardeza.", groups: [
    { name: "Han llevado el dorsal 10 del Barcelona", items: ["Maradona", "Rivaldo", "Ronaldinho", "Messi"], diff: 1, src: ["https://www.si.com/soccer/history-of-barcelona-10-shirt"] },
    { name: "Los cuatro primeros galácticos de Florentino (2000 a 2003)", items: ["Figo", "Zidane", "Ronaldo Nazário", "Beckham"], diff: 2, src: [W + "Gal%C3%A1cticos"] },
    { name: "Han llevado el dorsal 7 del Real Madrid", items: ["Raúl", "Cristiano Ronaldo", "Butragueño", "Juanito"], diff: 3, src: ["https://www.managingmadrid.com/2019/8/13/20800759/from-kopa-to-hazard-a-history-of-real-madrids-number-seven"] },
    { name: "Miembros de La Quinta del Buitre", items: ["Míchel", "Martín Vázquez", "Sanchís", "Pardeza"], diff: 4, src: [W + "La_Quinta_del_Buitre"] }
  ]},
  { id: "con-09", groups: [
    { name: "Seleccionadores de Alemania", items: ["Löw", "Klinsmann", "Vogts", "Völler"], diff: 1, src: [W + "List_of_Germany_national_football_team_managers"] },
    { name: "Seleccionadores de España", items: ["Camacho", "Clemente", "Aragonés", "Lopetegui"], diff: 2, src: [W + "List_of_Spain_national_football_team_managers"] },
    { name: "Seleccionadores de Argentina", items: ["Bilardo", "Menotti", "Sabella", "Scaloni"], diff: 3, src: [W + "List_of_Argentina_national_football_team_managers"] },
    { name: "Seleccionadores de Francia", items: ["Deschamps", "Jacquet", "Lemerre", "Hidalgo"], diff: 4, src: [W + "List_of_France_national_football_team_managers"] }
  ]},
  { id: "con-10", note: "Despiste: Bernabeu (final de 1982) y Luzhniki, Lusail y Rose Bowl son estadios; Jabulani, Brazuca, Teamgeist y Fevernova son balones; Footix, Zakumi, Fuleco y Zabivaka son mascotas animales; el resto son canciones oficiales.", groups: [
    { name: "Mascotas de Mundial que son animales", items: ["Footix", "Zakumi", "Fuleco", "Zabivaka"], diff: 1, src: [W + "List_of_FIFA_World_Cup_official_mascots"] },
    { name: "Canciones oficiales de un Mundial", items: ["Waka Waka", "La Copa de la Vida", "Live It Up", "We Are One"], diff: 2, src: [W + "List_of_FIFA_World_Cup_official_songs_and_anthems"] },
    { name: "Balones oficiales de un Mundial", items: ["Jabulani", "Brazuca", "Teamgeist", "Fevernova"], diff: 3, src: [W + "List_of_FIFA_World_Cup_official_match_balls"] },
    { name: "Estadios que albergaron una final de Mundial", items: ["Santiago Bernabéu", "Rose Bowl", "Luzhniki", "Lusail"], diff: 4, src: [WC] }
  ]},
  { id: "con-11", note: "Solo se listan cuatro campeones por pais; hay mas (Bayern, Manchester City, Manchester United, Everton, Milan, Juventus...) que no aparecen.", groups: [
    { name: "Clubes ingleses campeones de la Recopa", items: ["Tottenham", "West Ham", "Arsenal", "Chelsea"], diff: 1, src: [RC] },
    { name: "Clubes italianos campeones de la Recopa", items: ["Fiorentina", "Sampdoria", "Parma", "Lazio"], diff: 2, src: [RC] },
    { name: "Clubes españoles campeones de la Recopa", items: ["Atlético de Madrid", "Valencia", "Real Zaragoza", "Barcelona"], diff: 3, src: [RC] },
    { name: "Clubes alemanes campeones de la Recopa (RFA y RDA)", items: ["Borussia Dortmund", "Werder Bremen", "Hamburgo", "Magdeburgo"], diff: 4, src: [RC] }
  ]},
  { id: "con-12", note: "Despiste: Manchester City (iglesia) y Manchester United (trabajadores) se separan por su origen. Espanyol lo fundo un estudiante y fue el primer club de solo españoles, asi que no va con los fundados por extranjeros. Tottenham lo fundaron colegiales del Hotspur Cricket Club; la clase biblica de All Hallows llego un año despues, por lo que no va con los nacidos de una iglesia.", groups: [
    { name: "Clubes fundados por trabajadores de una empresa", items: ["Arsenal", "West Ham", "Manchester United", "PSV"], diff: 1, src: [W + "Arsenal_F.C.", W + "West_Ham_United_F.C.", W + "Manchester_United_F.C.", W + "PSV_Eindhoven"] },
    { name: "Clubes fundados por extranjeros en su país", items: ["Barcelona", "AC Milan", "Genoa", "Sevilla"], diff: 2, src: [W + "FC_Barcelona", W + "AC_Milan", W + "Genoa_C.F.C.", W + "Sevilla_FC"] },
    { name: "Clubes fundados por estudiantes", items: ["Juventus", "Atlético de Madrid", "Tottenham", "Espanyol"], diff: 3, src: [W + "Juventus_F.C.", W + "Atl%C3%A9tico_Madrid", W + "Tottenham_Hotspur_F.C.", W + "RCD_Espanyol"] },
    { name: "Clubes nacidos de una iglesia o capilla", items: ["Everton", "Aston Villa", "Southampton", "Manchester City"], diff: 4, src: [W + "Everton_F.C.", W + "Aston_Villa_F.C.", W + "Southampton_F.C.", W + "Manchester_City_F.C."] }
  ]}
];
