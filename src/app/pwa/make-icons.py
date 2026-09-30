#!/usr/bin/env python3
"""Iconos PROVISIONALES de la app de minijuegos (balon dorado sobre azul noche). Se sustituiran por un logo propio.
Uso: python3 make-icons.py   (escribe en ../../../app/)"""
from PIL import Image, ImageDraw
import math, os
here=os.path.dirname(os.path.abspath(__file__))
out=os.path.join(here,'..','..','..','app')
os.makedirs(out,exist_ok=True)
BG=(11,16,32); GOLD=(255,200,61); INK=(11,16,32)
def poly(cx,cy,r,rot,n=5):
    return [(cx+r*math.cos(rot+2*math.pi*i/n),cy+r*math.sin(rot+2*math.pi*i/n)) for i in range(n)]
def render(size,ball=0.62):
    S=size*4
    im=Image.new('RGB',(S,S),BG); d=ImageDraw.Draw(im)
    c=S/2; R=S*ball/2
    d.ellipse((c-R,c-R,c+R,c+R),fill=GOLD)
    top=-math.pi/2
    d.polygon(poly(c,c,R*0.36,top),fill=INK)
    for i in range(5):
        a=top+2*math.pi*i/5
        vx,vy=c+R*0.36*math.cos(a),c+R*0.36*math.sin(a)
        ox,oy=c+R*0.80*math.cos(a),c+R*0.80*math.sin(a)
        d.line((vx,vy,ox,oy),fill=INK,width=int(S*0.014))
        d.polygon(poly(c+R*0.98*math.cos(a+math.pi/5*0),c+R*0.98*math.sin(a),R*0.16,a+math.pi),fill=INK)
    d.ellipse((c-R,c-R,c+R,c+R),outline=INK,width=int(S*0.012))
    return im.resize((size,size),Image.LANCZOS)
render(512,0.66).save(os.path.join(out,'icon-512.png'),optimize=True)
render(192,0.66).save(os.path.join(out,'icon-192.png'),optimize=True)
render(180,0.66).save(os.path.join(out,'apple-touch-icon.png'),optimize=True)
render(48,0.80).save(os.path.join(out,'favicon-48.png'),optimize=True)
render(512,0.50).save(os.path.join(out,'icon-maskable-512.png'),optimize=True)
print('ok')
