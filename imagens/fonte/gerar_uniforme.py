"""
Gera o mockup do uniforme (modelo 3) como HTML/SVG e exporta PNG/JPG via Chrome headless.

Uso:  python imagens/fonte/gerar_uniforme.py
Saída: imagens/mockups/modelo3_uniforme.png / .jpg  e  site/public/img/uniforme-v3.jpg

Lados seguem a visão de quem VESTE: "direito" do calção = esquerda na imagem de frente.
"""
import os
import subprocess
from pathlib import Path

from PIL import Image

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent

NUMERO = '23'
NOME_COSTAS = 'SOBRENOME'

VERDE = '#0E3A1E'
VERDE_ESC = '#082714'
CREME = '#F3EBDD'
VERMELHO = '#D7080A'

KITS = {
    'CASA': dict(base=CREME, trim=VERDE, texto=VERDE, contorno=VERMELHO, faixa=VERMELHO, patro='rgba(14,58,30,.45)'),
    'FORA': dict(base=VERDE, trim=CREME, texto=CREME, contorno=VERMELHO, faixa=VERMELHO, patro='rgba(243,235,221,.55)'),
}

# --- formas (coordenadas locais) -------------------------------------------
# Regata: 400 x 520
REGATA_FRENTE = 'M95 0 L140 0 Q200 100 260 0 L305 0 Q312 78 380 128 L380 500 Q200 522 20 500 L20 128 Q88 78 95 0 Z'
REGATA_COSTAS = 'M95 0 L140 0 Q200 44 260 0 L305 0 Q312 78 380 128 L380 500 Q200 522 20 500 L20 128 Q88 78 95 0 Z'
GOLA_FRENTE = 'M140 0 Q200 100 260 0'
GOLA_COSTAS = 'M140 0 Q200 44 260 0'
CAVAS = 'M95 0 Q88 78 20 128 M305 0 Q312 78 380 128'
# Calção: 400 x 300
CALCAO = 'M30 34 L370 34 L394 292 L224 292 L200 210 L176 292 L6 292 Z'


def patrocinio(x, y, w, h, cor, rotulo='PATROCINADOR'):
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="none" stroke="{cor}" '
        f'stroke-width="2.5" stroke-dasharray="8 6"/>'
        f'<text x="{x + w / 2}" y="{y + h / 2 + 6}" text-anchor="middle" class="patro" fill="{cor}">{rotulo}</text>'
    )


def regata(kid, k, costas=False):
    corpo = REGATA_COSTAS if costas else REGATA_FRENTE
    gola = GOLA_COSTAS if costas else GOLA_FRENTE
    cid = f'clip-{kid}-{"c" if costas else "f"}'
    partes = [
        f'<clipPath id="{cid}"><path d="{corpo}"/></clipPath>',
        f'<g clip-path="url(#{cid})">',
        f'<path d="{corpo}" fill="{k["base"]}"/>',
        # painéis laterais
        f'<rect x="0" y="0" width="52" height="540" fill="{k["trim"]}"/>',
        f'<rect x="348" y="0" width="52" height="540" fill="{k["trim"]}"/>',
        f'<rect x="52" y="120" width="7" height="420" fill="{k["faixa"]}"/>',
        f'<rect x="341" y="120" width="7" height="420" fill="{k["faixa"]}"/>',
        f'<path d="{gola}" fill="none" stroke="{k["trim"]}" stroke-width="22"/>',
        f'<path d="{gola}" fill="none" stroke="{k["faixa"]}" stroke-width="5" transform="translate(0 13)"/>',
        f'<path d="{CAVAS}" fill="none" stroke="{k["trim"]}" stroke-width="22"/>',
        f'<rect x="0" y="496" width="400" height="30" fill="url(#sombra-barra)"/>',
        '</g>',
        f'<path d="{corpo}" fill="url(#volume)"/>',
    ]
    if not costas:
        aid = f'arco-{kid}'
        partes += [
            f'<path id="{aid}" d="M78 238 Q200 168 322 238" fill="none"/>',
            f'<text class="arco" fill="{k["texto"]}" stroke="{k["contorno"]}">'
            f'<textPath href="#{aid}" startOffset="50%" text-anchor="middle">FARMERS</textPath></text>',
            f'<text x="200" y="400" text-anchor="middle" class="num" fill="{k["texto"]}" stroke="{k["contorno"]}">{NUMERO}</text>',
        ]
    else:
        partes += [
            patrocinio(110, 62, 180, 44, k['patro']),
            f'<text x="200" y="158" text-anchor="middle" class="nome" fill="{k["texto"]}" stroke="{k["contorno"]}">{NOME_COSTAS}</text>',
            f'<text x="200" y="350" text-anchor="middle" class="num-costas" fill="{k["texto"]}" stroke="{k["contorno"]}">{NUMERO}</text>',
            patrocinio(95, 400, 210, 54, k['patro']),
        ]
    return ''.join(partes)


def calcao(kid, k, costas=False):
    cid = f'clipc-{kid}-{"c" if costas else "f"}'
    partes = [
        f'<clipPath id="{cid}"><path d="{CALCAO}"/></clipPath>',
        f'<g clip-path="url(#{cid})">',
        f'<path d="{CALCAO}" fill="{k["base"]}"/>',
        f'<path d="M30 34 L60 34 L40 300 L0 300 Z" fill="{k["trim"]}"/>',
        f'<path d="M340 34 L370 34 L400 300 L360 300 Z" fill="{k["trim"]}"/>',
        f'<path d="M60 34 L67 34 L47 300 L40 300 Z" fill="{k["faixa"]}"/>',
        f'<path d="M333 34 L340 34 L360 300 L353 300 Z" fill="{k["faixa"]}"/>',
        '</g>',
        f'<rect x="28" y="0" width="344" height="36" rx="4" fill="{k["trim"]}"/>',
        f'<rect x="28" y="30" width="344" height="5" fill="{k["faixa"]}"/>',
        f'<path d="{CALCAO}" fill="url(#volume)"/>',
    ]
    if not costas:
        # escudo na perna DIREITA do atleta (esquerda na imagem), patrocínio na outra
        partes += [
            '<image href="escudo_circular_260.png" x="70" y="150" width="96" height="96"/>',
            patrocinio(218, 172, 104, 54, k['patro'], 'PATROC.'),
        ]
    else:
        partes += [patrocinio(112, 58, 176, 46, k['patro'])]
    return ''.join(partes)


def peca(svg, x, y, escala, rotulo):
    return (
        f'<g transform="translate({x} {y}) scale({escala})" filter="url(#sombra)">{svg}</g>'
        f'<text x="{x + 200 * escala}" y="{y + (560 if "REGATA" in rotulo else 340) * escala}" '
        f'text-anchor="middle" class="rotulo">{rotulo.split(" · ")[1]}</text>'
    )


def montar():
    W, H = 2400, 1420
    corpo = []
    for i, (nome, k) in enumerate(KITS.items()):
        ox = 80 + i * 1200
        kid = nome.lower()
        corpo.append(peca(regata(kid, k), ox + 40, 110, 1.2, 'REGATA · FRENTE'))
        corpo.append(peca(regata(kid, k, True), ox + 560, 110, 1.2, 'REGATA · COSTAS'))
        corpo.append(peca(calcao(kid, k), ox + 80, 860, 1.0, 'CALÇÃO · FRENTE'))
        corpo.append(peca(calcao(kid, k, True), ox + 600, 860, 1.0, 'CALÇÃO · COSTAS'))
        corpo.append(f'<text x="{ox + 540}" y="1340" text-anchor="middle" class="kit">{nome}</text>')
    corpo.append('<line x1="1200" y1="120" x2="1200" y2="1300" stroke="#cfcac0" stroke-width="2"/>')

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs>
  <radialGradient id="fundo" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#f7f5f0"/><stop offset="1" stop-color="#dcd9d2"/></radialGradient>
  <linearGradient id="volume" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".06"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
  <linearGradient id="sombra-barra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
  <filter id="sombra" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#000" flood-opacity=".22"/></filter>
</defs>
<rect width="{W}" height="{H}" fill="url(#fundo)"/>
{''.join(corpo)}
</svg>'''

    html = f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=block" rel="stylesheet">
<style>
html,body{{margin:0;background:#e8e5df}}
svg{{display:block}}
text{{font-family:'Barlow Condensed',sans-serif;font-weight:800}}
.arco{{font-size:68px;letter-spacing:1px;stroke-width:7px;paint-order:stroke;stroke-linejoin:round}}
.num{{font-size:190px;stroke-width:9px;paint-order:stroke;stroke-linejoin:round}}
.num-costas{{font-size:200px;stroke-width:9px;paint-order:stroke;stroke-linejoin:round}}
.nome{{font-size:50px;letter-spacing:4px;stroke-width:5px;paint-order:stroke;stroke-linejoin:round}}
.patro{{font-size:17px;font-weight:700;letter-spacing:3px}}
.rotulo{{font-size:26px;font-weight:700;letter-spacing:6px;fill:#6b6a66}}
.kit{{font-size:62px;letter-spacing:18px;fill:#1c2a22}}
</style></head><body>{svg}</body></html>'''
    (AQUI / 'uniforme.html').write_text(html, encoding='utf-8')
    return W, H


def exportar(W, H):
    chrome = next(
        p for p in [
            r'C:\Program Files\Google\Chrome\Application\chrome.exe',
            r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        ] if os.path.exists(p)
    )
    png = RAIZ / 'imagens' / 'mockups' / 'modelo3_uniforme.png'
    subprocess.run([
        chrome, '--headless=new', '--disable-gpu', '--hide-scrollbars',
        f'--window-size={W},{H}', '--virtual-time-budget=8000',
        f'--screenshot={png}', (AQUI / 'uniforme.html').as_uri(),
    ], check=True, capture_output=True)
    im = Image.open(png).convert('RGB')
    im.save(png.with_suffix('.jpg'), quality=92)
    web = im.resize((1600, round(1600 * H / W)), Image.LANCZOS)
    web.save(RAIZ / 'site' / 'public' / 'img' / 'uniforme-v3.jpg', quality=85)
    print('ok:', png, im.size, '| site:', web.size)


if __name__ == '__main__':
    exportar(*montar())
