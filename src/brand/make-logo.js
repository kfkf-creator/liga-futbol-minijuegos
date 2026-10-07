// Genera el logo de Falso Nueve (SVG) y sus PNG. Uso: node make-logo.js
const fs=require("fs"),path=require("path");
const GOLD="#f2c14e",BG="#090e1b";
const C=[512,400],R=250,r=150,P=72;
const pent=[...Array(5)].map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;return[C[0]+P*Math.cos(a),C[1]+P*Math.sin(a)];});
const spokes=pent.map(([x,y],i)=>{const a=-Math.PI/2+i*2*Math.PI/5;return `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(C[0]+92*Math.cos(a)).toFixed(1)}" y2="${(C[1]+92*Math.sin(a)).toFixed(1)}"/>`}).join("");
const wedges=[...Array(5)].map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/5,w=0.30,q=(rad,ang)=>[(C[0]+rad*Math.cos(ang)).toFixed(1),(C[1]+rad*Math.sin(ang)).toFixed(1)].join(",");return `<polygon points="${q(86,a)} ${q(r+12,a-w)} ${q(r+12,a+w)}"/>`}).join("");
const sym=(fill)=>`<g fill="${fill}" stroke="none">
<path fill-rule="evenodd" d="M${C[0]-R},${C[1]}a${R},${R} 0 1,0 ${2*R},0a${R},${R} 0 1,0 ${-2*R},0zM${C[0]-r},${C[1]}a${r},${r} 0 1,1 ${2*r},0a${r},${r} 0 1,1 ${-2*r},0z"/>
<path d="M${C[0]+R},${C[1]}C${C[0]+R},620 600,800 300,905C520,745 650,620 ${C[0]+r},${C[1]+20}Z"/>
<polygon points="${pent.map(p=>p.map(v=>v.toFixed(1)).join(",")).join(" ")}"/>
${wedges}<g stroke="${fill}" stroke-width="26" stroke-linecap="butt">${spokes}</g></g>`;
// bounding aprox x 262..762, y 150..905 -> centro (512,527)
const place=(s)=>`<g transform="translate(512 512) scale(${s}) translate(-512 -527)">`;
const icon=(s,bg=true)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">${bg?`<rect width="1024" height="1024" fill="${BG}"/>`:""}${place(s)}${sym(GOLD)}</g></svg>`;
const out=__dirname;
fs.writeFileSync(path.join(out,"logo-9.svg"),icon(0.95,false));
fs.writeFileSync(path.join(out,"icon.svg"),icon(0.95));
fs.writeFileSync(path.join(out,"icon-maskable.svg"),icon(0.72));
const wide=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 600" width="1600" height="600"><rect width="1600" height="600" fill="${BG}"/><g transform="translate(60 40) scale(0.5)">${sym(GOLD)}</g><text x="560" y="300" font-family="Arial Black,Impact,Helvetica,sans-serif" font-weight="900" font-size="150" fill="${GOLD}" textLength="980" lengthAdjust="spacingAndGlyphs">FALSO NUEVE</text><text x="564" y="390" font-family="Helvetica,Arial,sans-serif" font-size="48" fill="#e8ecf5" textLength="960" lengthAdjust="spacingAndGlyphs">Cuatro retos al día. Una liga con tus amigos.</text></svg>`;
fs.writeFileSync(path.join(out,"logo-horizontal.svg"),wide);

const og=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><rect width="1200" height="630" fill="${BG}"/><g transform="translate(40 15) scale(0.6)">${sym(GOLD)}</g><text x="560" y="300" font-family="Arial Black,Impact,Helvetica,sans-serif" font-weight="900" font-size="92" fill="${GOLD}" textLength="590" lengthAdjust="spacingAndGlyphs">FALSO NUEVE</text><text x="562" y="372" font-family="Helvetica,Arial,sans-serif" font-size="28" fill="#e8ecf5" textLength="586" lengthAdjust="spacingAndGlyphs">Cuatro retos al día. Una liga con tus amigos.</text></svg>`;
fs.writeFileSync(path.join(out,"og.svg"),og);
