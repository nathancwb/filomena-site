# Filomena Propaganda & Marketing — Site Institucional

Site institucional da **Filomena Propaganda & Marketing**, construído com Astro e gerenciado via CMS headless (Sveltia/Decap CMS). Hospedado na **HostGator** (`filomenapropaganda.com.br`), com build e deploy automáticos via **GitHub Actions** a cada push na branch `main`.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Astro](https://astro.build) v6 |
| CMS | [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (compatível com Decap) |
| Hospedagem | [HostGator](https://www.hostgator.com.br) (Apache/cPanel) |
| Deploy | [GitHub Actions](.github/workflows/deploy-hostgator.yml) → FTP |
| Autenticação CMS | GitHub OAuth via função serverless na Vercel (`/api`) |
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

## Performance

Otimizações aplicadas para reduzir o tempo de carregamento:

- **Fontes auto-hospedadas:** as fontes do Google (Inter e Space Grotesk) foram removidas — eram baixadas de forma render-blocking em toda página, mas **não eram usadas** (todo o site renderiza em OliviarSans via override de CSS). Elimina 2 requisições externas bloqueantes.
- **Fonte em WOFF2:** OliviarSans convertida de TTF/OTF para WOFF2 (**208 KB → 71 KB**, ~66% menor), com `font-display: swap` e `preload` da variação principal.
- **Imagens otimizadas:** recomprimidas e redimensionadas com `sharp` (**~5,1 MB → 3,2 MB**). Logos de clientes que estavam em 4636 px foram reduzidos para tamanhos de exibição reais. 14 PNGs duplicados (não usados) foram removidos.
- **`loading="lazy"`** em imagens abaixo da dobra; `loading="eager"` preservado no logo e nas imagens do hero.
- **CSS e JS minificados** no build (`scripts/optimize-dist.mjs` via esbuild): CSS ~60 KB → ~42 KB, JS ~23 KB → ~13 KB.
- **Compressão gzip + cache de navegador** configurados no `.htaccess` (ver seção Deploy).

> Para otimizar novas imagens adicionadas pelo CMS, rode `sharp` localmente ou considere migrar as imagens para o pipeline `<Image>` do Astro (otimização automática no build).

## CMS — Decap CMS

O conteúdo é editado via `/admin`, que abre a interface do Sveltia CMS. As edições são commitadas diretamente no GitHub na branch `main`, disparando o GitHub Actions que reconstrói o site e o publica no HostGator.

### Coleções disponíveis no CMS

- **Blog** — artigos com título, autor, data, categoria, imagem de capa e corpo em Markdown
- **Portfólio** — projetos com cliente, categoria, ID do Behance e imagem de capa
- **Páginas** — conteúdo editável de seções específicas (JSON)

### Autenticação

O login no CMS usa OAuth do GitHub. A autenticação passa por uma função serverless em `/api`, que **permanece hospedada na Vercel** (a hospedagem compartilhada do HostGator não roda Node.js serverless). As seguintes variáveis de ambiente precisam estar configuradas no projeto da Vercel:

```
OAUTH_GITHUB_CLIENT_ID=     # GitHub OAuth App Client ID
OAUTH_GITHUB_CLIENT_SECRET= # GitHub OAuth App Client Secret
```

> A *Authorization callback URL* do GitHub OAuth App deve continuar apontando para `https://filomena-site.vercel.app/api/callback`. O painel `/admin` é servido pelo HostGator, mas delega só o login para a Vercel (ver `base_url` em `public/admin/config.yml`).

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

## Deploy (HostGator)

O site é estático: o build gera a pasta `dist/`, que é publicada na raiz do HostGator (`public_html`). A publicação é **automática** via GitHub Actions (`.github/workflows/deploy-hostgator.yml`): todo push na `main` reconstrói e envia por FTP.

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node:** >= 22.12.0

### Configuração inicial (uma vez)

1. **Secrets do GitHub** — em *Settings → Secrets and variables → Actions*, criar:
   - `FTP_SERVER` — ex.: `ftp.filomenapropaganda.com.br`
   - `FTP_USERNAME` — usuário FTP criado no cPanel do HostGator
   - `FTP_PASSWORD` — senha desse usuário FTP
2. **DNS** — apontar `filomenapropaganda.com.br` para o HostGator (nameservers ou registro A com o IP do servidor, informado no e-mail/painel do HostGator). Incluir o registro de `www`.
3. **SSL** — no cPanel, ativar o *AutoSSL* (Let's Encrypt) para `filomenapropaganda.com.br` e `www`.
4. **Primeiro deploy** — rodar o workflow manualmente (*Actions → Deploy para HostGator → Run workflow*) ou fazer um push na `main`.

### O que o `.htaccess` faz (incluído no build)

Como o HostGator é Apache (e não a Vercel), o arquivo `public/.htaccess` recria o que a Vercel fazia automaticamente:

- Redirecionamento canônico para **HTTPS + www**
- Compressão **gzip** (HTML/CSS/JS) e **cache** de assets
- **Headers de segurança** (antes no `vercel.json`)
- Página de erro **404** personalizada

### Publicação manual (alternativa)

Caso precise subir sem o GitHub Actions: rode `npm run build` e envie o **conteúdo** de `dist/` (incluindo o `.htaccess`) para `public_html` via Gerenciador de Arquivos do cPanel ou FTP.

---

## Repositório

`nathancwb/filomena-site` — acesso necessário para editar conteúdo pelo CMS.
