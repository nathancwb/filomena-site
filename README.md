# Filomena Propaganda & Marketing — Site Institucional

Site institucional da **Filomena Propaganda & Marketing**, construído com Astro e gerenciado via CMS headless (Decap CMS). Hospedado na Vercel com deploy automático a partir da branch `main`.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Astro](https://astro.build) v6 |
| CMS | [Decap CMS](https://decapcms.org) (antigo Netlify CMS) |
| Hospedagem | [Vercel](https://vercel.com) |
| Autenticação CMS | GitHub OAuth via API própria (`/api`) |
| Estilização | CSS puro com variáveis customizadas |
| Fontes | Space Grotesk, Inter, OliviarSans (local) |

---

## Estrutura do Projeto

```
filomena-site/
├── src/
│   ├── pages/               # Páginas do site (Astro)
│   │   ├── index.astro      # Home
│   │   ├── sobre.astro      # Sobre a agência
│   │   ├── servicos.astro   # Serviços oferecidos
│   │   ├── portfolio.astro  # Portfólio de projetos
│   │   ├── contato.astro    # Página de contato
│   │   ├── blog.astro       # Listagem do blog
│   │   ├── trabalhe-conosco.astro
│   │   └── blog/[id].astro  # Post individual do blog
│   └── content/             # Conteúdo gerenciado pelo CMS
│       ├── blog/            # Artigos em Markdown
│       ├── portfolio/       # Projetos em Markdown
│       └── pages/           # Conteúdo de páginas em JSON
├── public/
│   ├── assets/
│   │   ├── images/          # Imagens do site
│   │   └── fonts/           # Fontes locais (OliviarSans)
│   ├── styles.css           # Estilos globais
│   └── admin/               # Interface do Decap CMS
│       ├── index.html
│       └── config.yml       # Configuração das coleções do CMS
├── api/                     # Endpoints serverless (autenticação OAuth)
├── content.config.ts        # Schema das coleções de conteúdo
├── astro.config.mjs
└── vercel.json
```

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Home — hero, serviços em destaque, cases, clientes, Instagram (otimizada para SEO local) |
| `/sobre` | História da agência, equipe, valores |
| `/servicos` | Catálogo completo de serviços com scroll navegável |
| `/portfolio` | Galeria de projetos com exibição interativa interna de cases (sem links externos para fora do site) |
| `/blog` | Listagem de artigos com categorias |
| `/blog/[id]` | Post individual do blog |
| `/contato` | Página de contato premium — formulário interativo, canais de atendimento, WhatsApp e mapa integrado |
| `/trabalhe-conosco` | Página de vagas e candidatura |
| `/admin` | Interface de administração do CMS (acesso restrito) |

---

---

## SEO & Otimizações Locais

O site foi completamente otimizado para **SEO Técnico e Local**, garantindo máxima relevância nos mecanismos de busca:

- **JSON-LD Structured Data (Schema.org):** Implementação de dados estruturados sob a classe `AdvertisingAgency` (Agência de Publicidade) para rich snippets de pesquisa local.
- **GEO Geotagging:** Injeção de metatags geográficas oficiais (`geo.region`, `geo.placename`, `geo.position`, `ICBM`) apontando diretamente para as coordenadas reais do escritório físico da agência em São Carlos-SP.
- **Open Graph & Twitter Cards:** Configuração robusta com imagens de preview e metadados completos para compartilhamento visual premium no WhatsApp, LinkedIn, Facebook, etc.
- **Core Web Vitals:** Transições e animações da classe `.fade-in` otimizadas para carregamento instantâneo de conteúdo (melhorando a métrica INP/LCP).

## CMS — Decap CMS

O conteúdo é editado via `/admin`, que abre a interface do Decap CMS. As edições são commitadas diretamente no GitHub na branch `main`, disparando um novo deploy automático na Vercel.

### Coleções disponíveis no CMS

- **Blog** — artigos com título, autor, data, categoria, imagem de capa e corpo em Markdown
- **Portfólio** — projetos com cliente, categoria, ID do Behance e imagem de capa
- **Páginas** — conteúdo editável de seções específicas (JSON)

### Autenticação

O login no CMS usa OAuth do GitHub. A autenticação passa pelo endpoint serverless em `/api`, que precisa das seguintes variáveis de ambiente configuradas na Vercel:

```
OAUTH_CLIENT_ID=     # GitHub OAuth App Client ID
OAUTH_CLIENT_SECRET= # GitHub OAuth App Client Secret
```

---

## Identidade Visual

### Paleta de Cores

| Variável CSS | Hex | Uso |
|---|---|---|
| `--accent` | `#59266d` | Roxo principal — header, botões, destaques |
| `--accent-dark` | `#45105e` | Roxo escuro — fundo premium (cases, footer) |
| `--accent-light` | `#9047ba` | Roxo médio — gradientes, hovers |
| `--secondary` | `#a157bc` | Lilás suave — elementos secundários |
| `--secondary-light` | `#d08fff` | Lilás claro — números em destaque, glow |
| `--secondary-dark` | `#463960` | Roxo acinzentado — complementos |

### Tipografia

- **Títulos:** Space Grotesk (Google Fonts)
- **Corpo:** Inter (Google Fonts)
- **Marca:** OliviarSans (fonte local, arquivos em `public/assets/fonts/`)

---

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

Requer **Node.js >= 22.12.0**.

---

## Deploy

O deploy é automático via Vercel. Qualquer push na branch `main` dispara um novo build.

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Framework preset:** Astro

---

## Repositório

`nathancwb/filomena-site` — acesso necessário para editar conteúdo pelo CMS.
