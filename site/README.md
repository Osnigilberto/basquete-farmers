# Site — Antônio Carlos Farmers

Site institucional do projeto social de basquete (Next.js 16, App Router, CSS Modules).

## Rodar

```bash
npm install
npm run dev
```

## Onde editar

- `src/lib/site.js` — **contatos (WhatsApp, Instagram, e-mail), chave PIX e turmas**.
  Enquanto o WhatsApp estiver vazio, o formulário de pré-inscrição fica desativado
  e os botões mostram "em breve".
- `src/app/globals.css` — paleta oficial (verde `#0E3A1E`, creme `#F3EBDD`,
  vermelho `#D7080A`, caramelo `#BC7B3D`).
- `public/img/` — versões otimizadas dos logos (originais em `../imagens`).

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Hero, missão, turmas, chamada para apoio |
| `/sobre` | História, significado do escudo, diretoria |
| `/turmas` | Categorias, dias e locais |
| `/apoie` | Patrocínio, sócio apoiador, voluntariado, PIX |
| `/inscricao` | Pré-inscrição enviada pelo WhatsApp (com consentimento LGPD) |

## Publicação

- Produção: https://antonio-carlos-farmers.vercel.app
- Repositório: https://github.com/Osnigilberto/basquete-farmers (branch `main`)
- Todo push na `main` publica sozinho na Vercel (projeto `antonio-carlos-farmers`, pasta raiz `site`).
- Pelo celular: edite no app do GitHub ou peça ao Claude em claude.ai/code neste repositório.

## Próximas fases

- Fase 2: transparência (prestação de contas), notícias/agenda com painel admin, galeria.
- Fase 3: área do atleta integrada ao BasqueteAC (Firebase).
