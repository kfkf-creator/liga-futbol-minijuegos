"""Capa propia: nombres españoles/populares -> nombre(s) que usa la base (Reep/Wikidata).
Solo hace falta lo que no enlaza solo. Se amplía viendo data/mapping-report.json."""
MANUAL = {
 'equipos': {
  'Bayern Múnich': ['FC Bayern Munich'], 'PSG': ['Paris Saint-Germain'], 'Barcelona': ['Futbol Club Barcelona', 'FC Barcelona'], 'Almería': ['Unión Deportiva Almería'], 'Espanyol': ['RCD Espanyol de Barcelona'],
  'Bolonia': ['Bologna'], 'Mónaco': ['AS Monaco'], 'Tottenham': ['Tottenham Hotspur'],
  'Celta de Vigo': ['Celta Vigo', 'RC Celta de Vigo'], 'Hoffenheim': ['TSG 1899 Hoffenheim', 'TSG Hoffenheim'],
  'Mainz': ['Mainz 05', '1. FSV Mainz 05'], 
  'Real Betis': ['Real Betis Balompié', 'Betis'], 'Brighton & Hove Albion': ['Brighton and Hove Albion', 'Brighton'],
  'Juventus': ['Juventus FC'], 'Real Madrid': ['Real Madrid Club de Fútbol'],
  'Benfica': ['S.L. Benfica'], 'Lille': ['Lille OSC'], 'Osasuna': ['Club Atlético Osasuna'],
  'Sporting de Portugal': ['Sporting CP'], 'Olympique de Lyon': ['Olympique Lyonnais'],
  'Wolverhampton': ['Wolverhampton Wanderers'], 'Estrella Roja': ['FK Crvena zvezda'],
  'Copenhague': ['F.C. Copenhagen'], 'Salzburgo': ['FC Red Bull Salzburg'], 'Basilea': ['FC Basel'],
  'Hertha Berlín': ['Hertha BSC'], 'Wolfsburgo': ['VfL Wolfsburg'], 'Colonia': ['1. FC Köln'],
  'Niza': ['OGC Nice'], 'Verona': ['Hellas Verona'], 'Genoa': ['Genoa CFC'], 'Sampdoria': ['UC Sampdoria'],
  'Rennes': ['Stade Rennais'], 'Cádiz': ['Cádiz CF'], 'Zaragoza': ['Real Zaragoza'], 'Tenerife': ['CD Tenerife'],
  'Club Brugge': ['Club Brugge KV'], 'Dinamo Zagreb': ['GNK Dinamo Zagreb'], 'Besiktas': ['Beşiktaş J.K.'],
  'Fenerbahçe': ['Fenerbahçe SK'], 'Galatasaray': ['Galatasaray SK'], 'Anderlecht': ['R.S.C. Anderlecht'],
  'Aberdeen': ['Aberdeen F.C.'], 'Young Boys': ['BSC Young Boys'],
 },
 'estadios': {'Metropolitano': ['Metropolitano Stadium'], 'Olympiastadion de Berlín': ['Berlin Olympic Stadium'],
   'Maracanã': ['Maracanã Stadium'], 'Maracaná': ['Maracanã Stadium'], 'Balaídos': ['Abanca Balaídos Stadium'],
   'Mestalla': ['Mestalla Stadium'], 'Olympiastadion de Múnich': ['Munich Olympic Stadium'],
   'San Mamés': ['San Mamés Stadium'], 'Ramón Sánchez Pizjuán': ['Ramón Sánchez Pizjuán Stadium'],
   'Riazor': ['Estadio Municipal de Abanca Riazor'], 'Estadio Riazor': ['Estadio Municipal de Abanca Riazor'],
   'El Sadar': ['El Sadar Stadium'], 'Anoeta': ['Anoeta Stadium'], 'Reale Arena': ['Anoeta Stadium'],
   'Ibrox': ['Ibrox Stadium']}, 'jugadores': {'Raúl González': ['Raúl'], 'Leo Messi': ['Lionel Messi'],
   'Ronaldo Nazário': ['Ronaldo'], 'Oleg Blokhin': ['Oleh Blokhin'], 'Dani Alves': ['Daniel Alves'],
   'Alan Ball': ['Alan Ball Jr.'], 'Rivellino': ['Rivelino'], 'Piazza': ['Wilson da Silva Piazza'], 'Rivellino': ['Rivelino', 'Roberto Rivellino']},
 'entrenadores': {'Marcelino': ['Marcelino García Toral']},
}

# Nombres de una sola palabra (o ambiguos): año de nacimiento de quien es en los niveles
YEAR = {'Santillana': 1952, 'Pirri': 1945, 'Migueli': 1951, 'Eusébio': 1942, 'Tostão': 1947, 'Rivellino': 1946, 'Marcelino': 1965, 'Míchel': 1963, 'Ronaldo Nazário': 1976, 'Pedro': 1987, 'Hugo Sánchez': 1958, 'Nacho': 1990, 'Piazza': 1943, 'Alan Ball': 1945, 'Everaldo': 1944, 'Clodoaldo': 1949, 'Gérson': 1941, 'Jairzinho': 1944, 'Raúl': 1977, 'Xavi': 1980, 'Pelé': 1940, 'Marquinhos': 1994, 'Rivaldo': 1972, 'Marcelo': 1988,
        'Pepe': 1983, 'Joaquín': 1981, 'Rodri': 1996, 'Iniesta': 1984, 'Casillas': 1981, 'Ronaldinho': 1980,
        'Kaká': 1982, 'Ronaldo': 1976, 'Romário': 1966, 'Cafu': 1970, 'Zidane': 1972, 'Maradona': 1960}

# Jugadores muy recientes que Reep v0 (congelado en junio 2026) no trae: (nombre, país, año nac.)
PATCH = [('Lamine Yamal','España',2007),('Pau Cubarsí','España',2007),('Endrick','Brasil',2006),
         ('Arda Güler','Turquía',2005),('Kobbie Mainoo','Reino Unido',2005),('Warren Zaïre-Emery','Francia',2006),
         ('Désiré Doué','Francia',2005),('Kenan Yıldız','Turquía',2005),('Dean Huijsen','España',2005),
         ('Alejandro Garnacho','Argentina',2004),('Rico Lewis','Reino Unido',2004),('Estêvão','Brasil',2007)]
