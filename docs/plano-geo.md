# Plano de GEO — Filomena Propaganda

**Objetivo:** aumentar a probabilidade de citação da Filomena em respostas de IA (AI Overviews, ChatGPT, Perplexity, Claude, Gemini) nas consultas de intenção "melhores/top agências" em pt-BR.

**Ponto de partida (dados deste turno):**
- A Filomena não aparece em **nenhuma das 30 URLs de top 10** analisadas nas consultas de intenção "melhores/top".
- Os SERPs de "melhores/top" em pt-BR têm **AI Overview na posição 1** em 5 de 5 SERPs verificados.
- O sitemap tem **29 URLs** (13 em /portfolio, 7 em /blog, raiz e páginas soltas) e **nenhuma página de ranking**.
- Domínio sem dados de rank orgânico; 94 backlinks de 53 domínios, contra 376 domínios de referência da Ana Couto.

**Enquadramento:** todo resultado aqui é **aumento de probabilidade de citação**. Nada garante inclusão em resposta de IA. O que se controla é a presença nos ativos que a IA lê e cita.

---

## 1. Mecanismo (como a IA cita)

| Etapa | O que acontece | Implicação para a Filomena |
|---|---|---|
| 1. Recuperação | O modelo busca em índice próprio ou em SERP ao vivo | Sem página de ranking, não há o que recuperar para a intenção "melhores" |
| 2. Seleção de fonte | Prioriza páginas que já rankeiam e têm estrutura extraível | AI Overview na posição 1 puxa dos listicles/agregadores do top 10 |
| 3. Extração | Lê listas, tabelas, FAQ, cabeçalhos e JSON-LD | Página canônica precisa de lista numerada, tabela e FAQPage |
| 4. Atribuição | Cita a fonte com nome, autor e data | Sem byline e sem data, a citação perde força e verificabilidade |
| 5. Consolidação | Repete fontes que aparecem em múltiplos pontos | Estar em listicle + site próprio + diretório multiplica a chance |

**Conclusão operacional:** a IA cita quem já está no corpus. O trabalho é entrar no corpus (outreach) e ser extraível quando entrar (página canônica).

---

## 2. Shortlist de keywords GEO

| Keyword | Volume/mês | CPC | Dificuldade | Intenção | Papel no plano |
|---|---|---|---|---|---|
| agências de publicidade são paulo | 210 | R$ 3,13 | Baixa | Comercial | Alvo principal da canônica |
| melhores agências de publicidade sp | 90 | R$ 3,07 | Baixa | Comercial | Variante de maior volume |
| melhores agências de publicidade do brasil | 70 | R$ 2,82 | Baixa | Comercial | Variante nacional |
| melhores agências de marketing digital | 40 | R$ 4,47 | Baixa | Comercial | Variante de serviço |
| melhores agências de publicidade | 20 | R$ 5,48 | Média | Comercial | Cabeça da intenção |
| melhores agências de branding | 10 | R$ 0,63 | Média | Comercial | Variante de nicho |
| melhores agências de comunicação | 10 | R$ — | Média | Comercial | Variante de nicho |
| melhores agências de publicidade 2026 | n/d | n/d | Baixa | Comercial | Variante temporal (baixo custo) |

**Leitura:** volume baixo, CPC comercial alto e dificuldade baixa. É um espaço de intenção de decisão, não de tráfego. O valor está na citação, não no clique. As variantes com token de ano não retornam volume — entram como cauda de baixo custo, não como prioridade.

---

## 3. Brief da página canônica

**URL proposta:** `/melhores-agencias-de-publicidade-sao-paulo/` (nova; hoje inexistente no sitemap)

| Elemento | Especificação |
|---|---|
| Title | Melhores Agências de Publicidade em São Paulo: Como Escolher em 2026 \| Filomena |
| H1 | Melhores agências de publicidade em São Paulo: critérios para escolher |
| Estrutura | Lista numerada de critérios + tabela comparativa de modelos de agência + FAQ com 6 perguntas |
| Conteúdo mínimo | 1.800 palavras; cada critério com definição, sinal de alerta e pergunta a fazer ao fornecedor |
| Prova de experiência | 2 cases da Filomena com números reais (Grampola: +3.200 cliques, 378 mil impressões; MBA USP: +2.400 leads, +270 matriculados) |
| Autoria | Byline nomeada + `Person` no JSON-LD, com credenciais |
| Dados estruturados | `Article` + `FAQPage` + `BreadcrumbList` + `Organization` |
| Datas | `datePublished` e `dateModified` visíveis e no schema |
| Transparência | Declarar que a Filomena é uma das agências do mercado; critérios aplicáveis a qualquer fornecedor |
| Internos | Links para /servicos, /sobre, /portfolio e 3 cases |
| hreflang | Declarar par pt-BR / en (hoje zero hreflang no site) |

**Regra de honestidade:** a página não pode se declarar "a melhor". Ela entrega critério verificável — é isso que a IA extrai e cita.

---

## 4. Roadmap de variantes

| Ordem | Variante | URL | Base | Prazo |
|---|---|---|---|---|
| 1 | Publicidade SP | /melhores-agencias-de-publicidade-sao-paulo/ | Canônica | Semana 1–2 |
| 2 | Publicidade Brasil | /melhores-agencias-de-publicidade-brasil/ | Canônica + recorte nacional | Semana 3–4 |
| 3 | Marketing digital | /melhores-agencias-de-marketing-digital/ | Canônica + recorte de serviço | Semana 5–6 |
| 4 | Branding | /melhores-agencias-de-branding/ | Canônica + recorte de disciplina | Semana 7–8 |
| 5 | Comunicação | /melhores-agencias-de-comunicacao/ | Canônica + recorte de disciplina | Semana 9–10 |
| 6 | Temporal 2026 | Atualização anual da canônica | Revisão de dados e data | Semana 11–12 |

**Regra:** uma variante por vez, cada uma com conteúdo próprio. Variante clonada não é citada — é descartada como duplicata.

---

## 5. Shortlist de outreach

| Alvo | Arquétipo | Por que | Caminho de contato | Prioridade |
|---|---|---|---|---|
| marketingestrategia.com.br | Listicle | #2 em 3 de 4 SERPs; byline "burlamaqui"; atualizado 03/07/2026 | /en/contato-burlamaqui-consultoria/ · +55 41 99944-5539 | Alta |
| ohub.com.br | Listicle | #11 e #2 em SERPs de agências | Página de contato do site | Alta |
| hoogli.com.br | Listicle | #7 e #6 em SERPs de agências | 0800-000-1909 | Alta |
| gid.ind.br | Recurso | #5 e #3 em SERPs de agências | comercial@gid.ind.br · (14) 3406-2861 | Média |
| neilpatel.com/br | Listicle | #10, #4 e #8; byline Neil Patel | /contact/ | Média |
| agencies.semrush.com/pt/list/ | Agregador | Diretório de agências pt-BR | agencies@semrush.com | Média |
| meioemensagem.com.br | Editorial | A-List, 09/03/2026 | /fale-conosco | Baixa |
| cenp.com.br | Oficial | Ranking setorial, abril/2026 | cenp@cenp.com.br · (11) 4858-8043 | Baixa |
| leadersleague.com | Agregador | Rankings internacionais | Endereço no rodapé | Baixa |
| revistapegn.globo.com | Editorial | Matéria GV8, 30/03/2026 | Sem contato visível | Baixa |

**Nota:** nenhum desses 10 alvos menciona a Filomena hoje. A prioridade segue a ordem "já rankeia + tem contato claro".

---

## 6. Rascunhos de outreach prontos para envio

### 6.1 marketingestrategia.com.br — listicle (prioridade alta)

**Assunto:** Atualização do ranking de agências: uma inclusão de São Paulo

**Corpo:**
Vi que o ranking de agências foi atualizado em 3 de julho e hoje traz Burlamaqui, AlmapBBDO e Africa Creative no topo. Falta representação de agências do interior paulista que operam com verba de PME.

A Filomena Propaganda, de São Carlos, atende +250 marcas desde 2013. Dois números verificáveis: +3.200 cliques e 378 mil impressões para a Grampola; +2.400 leads e +270 matriculados para a MBA USP.

Posso enviar um resumo de uma página com esses dados para você avaliar uma inclusão na próxima atualização?

---

### 6.2 ohub.com.br — listicle (prioridade alta)

**Assunto:** Sugestão para a lista de agências de propaganda

**Corpo:**
Sua lista de agências de propaganda aparece bem posicionada nas buscas por fornecedor em São Paulo. Notei que nenhuma agência de São Carlos está representada.

A Filomena atua desde 2013, com +250 marcas atendidas e cases com resultado medido — a Grampola somou +3.200 cliques e 378 mil impressões em campanha.

Faz sentido eu enviar um parágrafo pronto, no formato da sua lista, para você considerar?

---

### 6.3 hoogli.com.br — listicle (prioridade alta)

**Assunto:** Uma agência fora do eixo capital para a sua lista

**Corpo:**
Sua lista compara seis modelos de agência e coloca a Hoogli em primeiro. Um modelo que não aparece é o da agência regional com estrutura de capital.

A Filomena, de São Carlos, existe desde 2013 e atende +250 marcas. Case com número: MBA USP, +2.400 leads e +270 matriculados.

Quer que eu envie os dados no formato da sua tabela para você avaliar?

---

### 6.4 gid.ind.br — recurso (prioridade média)

**Assunto:** Dado de campanha para o conteúdo sobre agências

**Corpo:**
Seu conteúdo sobre agências de propaganda é um dos que aparecem nas buscas por fornecedor. Ele cita critérios de escolha, mas sem números de campanha reais.

A Filomena, agência de São Carlos desde 2013, tem dois: Grampola com +3.200 cliques e 378 mil impressões; MBA USP com +2.400 leads e +270 matriculados.

Posso enviar um trecho de 150 palavras com esses dados para você usar como exemplo?

---

### 6.5 neilpatel.com/br — listicle (prioridade média)

**Assunto:** Inclusão regional na lista de agências de marketing digital

**Corpo:**
Sua lista de agências de marketing digital traz NP Digital, CMLO&CO e Kryzalis. Todas com operação concentrada em grandes centros.

A Filomena opera de São Carlos desde 2013, com +250 marcas atendidas e cases medidos: +3.200 cliques e 378 mil impressões na Grampola.

Posso enviar um resumo com dados e links de verificação para avaliação de inclusão?

---

### 6.6 agencies.semrush.com/pt/list/ — agregador (prioridade média)

**Assunto:** Cadastro de agência brasileira no diretório pt-BR

**Corpo:**
O diretório pt-BR de agências lista fornecedores de vários portes, mas a cobertura de agências do interior de São Paulo é pequena.

A Filomena Propaganda atua desde 2013 em São Carlos, com +250 marcas atendidas e cases com métricas de campanha verificáveis.

Qual é o processo para incluir a Filomena na listagem brasileira?

---

### 6.7 Template reutilizável por arquétipo

**Listicle**
- Assunto: [Atualização/inclusão] na lista de [tema da página]
- Abertura: referência a um item específico já presente na lista (nome + posição ou data de atualização)
- Ponte: lacuna concreta de representação (região, porte, modelo)
- Prova: 2 números de case verificáveis
- CTA único: enviar resumo no formato da lista

**Editorial**
- Assunto: [Dado/pauta] para a matéria sobre [tema]
- Abertura: referência à data e ao ângulo da matéria publicada
- Ponte: ausência de dado primário de mercado no texto
- Prova: 2 números de case verificáveis
- CTA único: enviar trecho pronto para uso como exemplo

**Agregador / diretório**
- Assunto: [Cadastro/inclusão] no diretório de [categoria]
- Abertura: referência à cobertura atual do diretório
- Ponte: lacuna de cobertura regional ou de porte
- Prova: tempo de operação + volume de marcas atendidas
- CTA único: perguntar o processo de inclusão

**Oficial / institucional**
- Assunto: [Contribuição] para o levantamento de [setor]
- Abertura: referência ao levantamento e à data de publicação
- Ponte: critério de elegibilidade que a Filomena atende
- Prova: dados cadastrais e de operação
- CTA único: solicitar o formulário ou os requisitos

---

## 7. Checklist de acompanhamento manual

**Frequência:** semanal. **Ferramentas:** ChatGPT, Perplexity, Claude e Gemini, em sessão nova a cada teste.

### Prompts testados (rodar os 5 em cada ferramenta)

1. Quais são as melhores agências de publicidade em São Paulo?
2. Quais são as melhores agências de publicidade do Brasil?
3. Quais são as melhores agências de marketing digital no Brasil?
4. Quais são as melhores agências de branding no Brasil?
5. Quais são as melhores agências de comunicação em São Paulo?

### Registro por teste

| Campo | O que anotar |
|---|---|
| Data | Dia da execução |
| Ferramenta | ChatGPT / Perplexity / Claude / Gemini |
| Prompt | Número do prompt (1–5) |
| Filomena citada? | Sim / Não |
| Posição na resposta | Se citada, em que ponto da lista |
| Fontes citadas | URLs exatas que a ferramenta referenciou |
| Alvos do outreach presentes | Quais dos 10 alvos da Parte 5 apareceram |
| Mudança vs. semana anterior | Nova citação, perda ou estável |

### Rotina semanal

1. Rodar os 5 prompts nas 4 ferramentas (20 testes) em sessões limpas.
2. Registrar fontes citadas — é o mapa real do corpus que a IA usa.
3. Comparar com a semana anterior e marcar variação.
4. Se um alvo do outreach aparecer citando a Filomena, registrar como conversão.
5. Se um alvo aparecer sem citar, priorizar o follow-up.
6. Revisar a canônica a cada 4 semanas: data, dados e FAQ.

### Leitura dos resultados

- **Citação zero por 4 semanas:** o problema é entrada no corpus, não a página. Reforçar outreach.
- **Alvo cita a página, não a marca:** falta entidade. Reforçar byline, `Person` e `Organization`.
- **Ferramenta cita concorrente e não a Filomena:** comparar estrutura da página citada com a canônica.

---

**Antes de enviar:** os rascunhos da Parte 6 são ponto de partida. Revise e personalize cada um antes do envio — confirme o nome do contato, o item específico citado na página-alvo e os números do case. Mensagem genérica não é publicada, e mensagem com dado errado queima o alvo.

A Filomena não está no corpus hoje. Estar nele é uma decisão de execução, não de sorte.
