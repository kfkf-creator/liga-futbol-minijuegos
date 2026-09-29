#!/usr/bin/env python3
"""Genera data/entidades/*.json a partir de Reep v0 (CC0) + capa propia.
Uso: python3 build_entities.py <carpeta_reep_csv> <curated.json> <salida>"""
import csv, json, sys, re, unicodedata, collections, os
sys.path.insert(0, os.path.dirname(__file__))
from capa_selecciones import SEL, nat_map
csv.field_size_limit(10**9)
src, curp, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()

CLUBW = {'fc','cf','afc','sc','ac','as','ssc','us','rc','cd','ud','sd','fk','sk','bk','ca','sv','vfb','vfl','tsg','fsv','1','04','05','96','1899','1846','1893','1909','1910','1913','de','club','football','calcio','1907','1919'}
def core(s):
    t = [w for w in norm(s).split() if w not in CLUBW and len(w) > 1]
    return ' '.join(t)

from alias_manual import MANUAL, YEAR, PATCH
NAT = nat_map()
def nes(n): return NAT.get(n, n)

CUR = json.load(open(curp, encoding='utf-8'))
PL_MIN, CO_MIN, TM_MIN = 9, 3, 3
CURN = {k: {norm(n) for n in v} for k, v in CUR.items()}

# aliases de Reep (names.csv) por reep_id
al = collections.defaultdict(set)
for r in csv.DictReader(open(f'{src}/names.csv', encoding='utf-8')):
    if r['alias']: al[r['reep_id']].add(r['alias'])

def load_people():
    pl, co = [], []
    for r in csv.DictReader(open(f'{src}/people.csv', encoding='utf-8')):
        keys = [k for k in r if k.startswith('key_') and r[k]]
        f = len(keys)
        y = r['date_of_birth'][:4]
        y = int(y) if y.isdigit() else 0
        e = dict(id=r['reep_id'], n=r['name'].strip(), full=r['full_name'].strip(), nat=nes(r['nationality']), y=y, f=f)
        if not e['n']: continue
        if r['type'] == 'player' and (f >= PL_MIN or (0 < y <= 1975 and f >= 5)): pl.append(e)
        elif r['type'] == 'coach' and (f >= CO_MIN or (f >= 1 and norm(e['n']) in CURN['entrenadores'])): co.append(e)
    return pl, co
players, coaches = load_people()
have = {norm(e['n']) for e in players}
for i, (n, nat, y) in enumerate(PATCH):
    if norm(n) not in have: players.append(dict(id='patch%d' % i, n=n, full='', nat=nat, y=y, f=24))

teams, stad = [], {}
for r in csv.DictReader(open(f'{src}/teams.csv', encoding='utf-8')):
    f = sum(1 for k in r if k.startswith('key_') and r[k])
    if f < TM_MIN or not r['name']: continue
    teams.append(dict(id=r['reep_id'], n=r['name'].strip(), nat=nes(r['country']), y=int(r['founded'][:4]) if r['founded'][:4].isdigit() else 0, f=f))
    s = r['stadium'].strip()
    if s:
        k = norm(s)
        if k not in stad or stad[k]['f'] < f: stad[k] = dict(id='std_'+k.replace(' ','_'), n=s, nat=nes(r['country']), y=0, f=f)
stadiums = list(stad.values())

def index(lst, use_alias, K=norm):
    ix = collections.defaultdict(list)
    for e in lst:
        for nm in {e['n'], e.get('full', '')}:
            if nm: ix[K(nm)].append(e)
    return ix

def link(kind, lst, use_alias=True):
    K = core if kind in ('equipos',) else norm
    ix = index(lst, use_alias, K); res = {}; rep = []
    for name, d in CUR[kind].items():
        cands = []
        man = MANUAL.get(kind, {}).get(name, [])
        names = [name] + man if kind != 'equipos' else [name] + d.get('a', []) + man
        for nm in names:
            cands += ix.get(K(nm), [])
        seen = {}
        for c in cands: seen[c['id']] = c
        cands = sorted(seen.values(), key=lambda c: -c['f'])
        hint = YEAR.get(name)
        if kind in ('jugadores', 'entrenadores'):
            if hint: cands = [c for c in cands if c['y'] == hint]
            elif len(norm(name).split()) == 1: cands = []
        if not cands and kind in ('jugadores', 'entrenadores'):
            tk = set(norm(name).split())
            pool = [e for e in lst if e['f'] >= 18 and (not hint or e['y'] == hint) and
                    (tk <= set(norm(e['n']).split()) or tk <= set(norm(e.get('full', '')).split()))]
            pool.sort(key=lambda c: -c['f'])
            if pool and (len(pool) == 1 or pool[0]['f'] - pool[1]['f'] >= 3):
                cands = pool[:1]; FALLBACK.append((name, pool[0]['n'], pool[0].get('full', ''), pool[0]['nat'], pool[0]['y'], pool[0]['f']))
        if not cands and kind == 'equipos':
            kk = K(name)
            cands = sorted([e for e in lst if e['f'] >= 10 and K(e['n']).startswith(kk + ' ')], key=lambda c: -c['f'])[:1]
        if not cands: rep.append((name, 'sin_match')); continue
        if man and kind == 'equipos':
            pref = [c for c in cands if norm(c['n']) in {norm(x) for x in man}]
            cands = pref or cands
        if len(cands) > 1 and cands[0]['f'] - cands[1]['f'] < 5 and cands[0]['y'] != cands[1]['y']:
            rep.append((name, 'ambiguo: ' + '; '.join(f"{c['n']} {c['nat']} {c['y']} f{c['f']}" for c in cands[:3])))
        if kind == 'equipos':
            ok = {K(x) for x in [name] + d.get('a', []) + MANUAL.get(kind, {}).get(name, [])}
            cands = [c for c in cands if K(c['n']) in ok] or cands[:1]
        best = cands[0]
        extra = {best['n']} | ({best['full']} if best.get('full') else set())
        if kind == 'equipos': extra = {x for x in extra if K(x) in ok or True}
        res[name] = dict(id=best['id'], alias=sorted(x for x in extra if norm(x) != norm(name)))
    return res, rep

report = {}
FALLBACK = []
links = {}
for kind, lst in (('jugadores', players), ('entrenadores', coaches), ('equipos', teams), ('estadios', stadiums)):
    for e in lst: e.setdefault('id', '')
    links[kind], report[kind] = link(kind, lst, kind in ('jugadores', 'entrenadores'))
# selecciones: capa propia, sin Reep
sel_out = [[es, 'Selección', 0, 50] for es, en, a in SEL]
links['selecciones'] = {}

# Los nombres que ya estan en el curado se retiran de la lista general (para no duplicar)
def dedupe(lst, kind):
    K = core if kind == 'equipos' else norm
    curnorm = {K(n) for n in list(CUR[kind]) + [a for v in CUR[kind].values() for a in v.get('a', [])]}
    curids = {v['id'] for v in links[kind].values()}
    return [e for e in lst if e['id'] not in curids and K(e['n']) not in curnorm]

def pack(lst, kind, with_year=True):
    lst = sorted(dedupe(lst, kind), key=lambda e: -e['f'])
    return [[e['n'], e['nat'], e['y'], e['f']] for e in lst]

out_files = {
    'jugadores': pack(players, 'jugadores'),
    'entrenadores': pack(coaches, 'entrenadores'),
    'equipos': pack(teams, 'equipos'),
    'estadios': pack(stadiums, 'estadios'),
    'selecciones': sel_out,
}
for k, v in out_files.items():
    json.dump(v, open(f'{out}/{k}.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    print(k, len(v), os.path.getsize(f'{out}/{k}.json') // 1024, 'KB')
# alias que el juego suma a las respuestas del curado
ca = {k: {n: v['alias'] for n, v in links[k].items() if v['alias']} for k in links}
json.dump(ca, open(f'{out}/curated-aliases.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'), sort_keys=True)
json.dump(report, open(f'{out}/../mapping-report.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(FALLBACK, open(f'{out}/../fallback-links.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
for k, v in report.items(): print(k, 'sin resolver/ambiguos:', len(v), '/', len(CUR[k]))
