#!/usr/bin/env python3
"""Genera los iconos de la PWA a partir del logo original (pwa/logo-original.png).
Uso: python3 make-icons.py   (escribe en ../../../top10/)"""
from PIL import Image, ImageDraw, ImageFilter
import os
here=os.path.dirname(os.path.abspath(__file__))
out=os.path.join(here,'..','..','..','top10')
im=Image.open(os.path.join(here,'logo-original.png')).convert('RGB')
# region interior del icono redondeado (sin esquinas blancas)
crop=im.crop((230,205,1020,1040))
w,h=crop.size
px=crop.load()
bg=lambda y:px[3,y]                      # color de fondo por fila, del borde izquierdo
# limpia posibles pixeles claros en las esquinas
for (x0,y0) in [(0,0),(w-70,0),(0,h-70),(w-70,h-70)]:
    for y in range(y0,y0+70):
        for x in range(x0,x0+70):
            r,g,b=px[x,y]
            if r>90 or g>120 or b>90: px[x,y]=bg(min(max(y,0),h-1)) if x0==0 else px[w-4,y]
def render(size,scale=1.0):
    """Recorte centrado sobre lienzo cuadrado; el margen replica el borde del logo (que es solo fondo),
    asi no hay costuras. scale<1 deja margen extra (zona segura de los iconos maskable)."""
    import numpy as np
    base=max(w,h)
    side=int(round(base/scale))
    a=np.array(crop)
    py=(side-h)//2; pxx=(side-w)//2
    a=np.pad(a,((py,side-h-py),(pxx,side-w-pxx),(0,0)),mode='edge')
    return Image.fromarray(a).resize((size,size),Image.LANCZOS)
fullbleed=lambda size: render(size,1.0)
maskable=lambda size: render(size,0.80)
fullbleed(512).save(os.path.join(out,'icon-512.png'),optimize=True)
fullbleed(192).save(os.path.join(out,'icon-192.png'),optimize=True)
fullbleed(180).save(os.path.join(out,'apple-touch-icon.png'),optimize=True)
fullbleed(48).save(os.path.join(out,'favicon-48.png'),optimize=True)
maskable(512).save(os.path.join(out,'icon-maskable-512.png'),optimize=True)
print('ok')
