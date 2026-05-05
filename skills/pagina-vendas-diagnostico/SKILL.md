---
name: pagina-vendas-diagnostico
description: Funil completo: landing → quiz de diagnóstico → lead gate → resultado personalizado → checkout. Motor genérico adaptável por número de questões, eixos, arquétipos e produto.
architecture: MODULAR
creator: Ana Retore
created: 2026-05-05
---

# Página de Vendas com Diagnóstico Embutido

**Nome Estratégico:** pagina-vendas-diagnostico
**Criador:** Ana Retore
**Arquitetura:** MODULAR
**Lógica:** Estrutura automática

---

# Página de Vendas com Diagnóstico Embutido

## O que é esta skill

Engenharia completa de um funil de vendas que usa um quiz de diagnóstico como mecanismo de qualificação e personalização. O resultado do quiz é personalizado por produto, revela padrões do usuário em múltiplos eixos e entrega um relatório editorial que naturaliza o checkout.

## Fluxo do Funil

```
Landing Page → Quiz (N questões) → Lead Gate → Resultado Diagnóstico → Checkout
```

### 1. Landing Page
- Hero com headline em variantes A/B/C (persistidas por sessionStorage)
- Seção de dores (nomeia padrões antes de apresentar solução)
- Seção de arquétipos ou perfis do produto
- Seção de mentoras/facilitadores do produto
- Value stack com preço comparativo
- Pricing section
- Garantia
- FAQ
- CTA repetido (hero + sticky + final)

### 2. Quiz de Diagnóstico
- N perguntas em escala 1-9 (onde 1 = nunca/pouco e 9 = sempre/muito)
- Agrupadas em D dimensões (padrão: 6 dimensões × 2 questões = 12 perguntas)
- R respiros motivacionais intercalados (padrão: a cada 4 questões)
- Introscreen com contexto emocional antes das questões

### 3. Lead Gate
- Formulário: Nome + Email + WhatsApp (opcional)
- Dispara após quiz, antes do resultado
- Salva lead em localStorage + backend (Supabase/outro)
- Enriquece o payload com dados do diagnóstico

### 4. Resultado do Diagnóstico
- Radar chart (mandala) com D eixos
- 4 parágrafos editoriais gerados automaticamente
- Triades: top 3 eixos / bottom 3 eixos / eixo central de tensão
- Plano de N dias gerado automaticamente
- Bloco de oferta personalizado por arquétipo
- PDF exportável + card para compartilhar
- CTA direto para checkout (URL + nome/email pré-preenchidos)

### 5. Checkout
- Link externo (Kiwify, Stripe, Hotmart, etc.)
- Rastreamento via analytics dataLayer

---

## Motor de Diagnóstico

Ver `references/diagnostic-engine.md` para implementação completa.

**Resumo:**
- Cada dimensão tem 2 questões: clínica (o que acontece) + simbólica (como se sente)
- Raw score 1-9 é invertido na normalização (ruído alto → estabilidade baixa)
- Média dos 2 scores por dimensão + tensão entre eles
- 6 tipos de padrão: EXCELENCIA, BASE_ESTAVEL, APAGAMENTO, EXECUTA_SEM_SI, SENTE_SEM_ESTRUTURA, OSCILACAO
- Top 3 e Bottom 3 por média; eixo central = maior tensão
- Score geral define arquétipo do usuário (4 níveis por faixa de score)

---

## Config Schema (o que muda por produto)

Ver `references/config-schema.md` para o schema TypeScript completo.

**Variáveis obrigatórias por produto:**
- `productName` — nome do produto
- `quizQuestions` — array de N questões (mínimo 12, máximo ilimitado)
- `dimensions` — labels das D dimensões (devem casar com questões)
- `archetypes` — 4 perfis com nome, cor, threshold de score
- `mentors` — facilitadores/mentoras do produto
- `pricing` — preços e planos
- `checkoutUrl` — URL do checkout
- `painPoints` — 4 dores específicas do público
- `faq` — perguntas e respostas

---

## Stack Técnica

```
Framework:  React 19 + TypeScript
Build:      Vite (SWC)
Styling:    Tailwind CSS + Framer Motion
UI:         shadcn-ui + Radix UI
Forms:      react-hook-form + zod
Charts:     SVG radar customizado (ou Recharts)
Export:     jsPDF + html2canvas
i18n:       i18next (opcional)
Analytics:  GTM dataLayer
Leads:      localStorage + Supabase
```

---

## Adaptando para Diferentes Produtos

### Produto com 12 perguntas (padrão)
- 6 dimensões × 2 questões
- 3 respiros (após q4, q8, q12)
- Motor padrão: `computeDiagnostic(answers, config)`

### Produto com 36 perguntas (aprofundado)
- 6 dimensões × 6 questões (3 clínicas + 3 simbólicas por dimensão)
- Cálculo por média das 3 clínicas e 3 simbólicas
- 9 respiros (a cada 4 questões)
- Mesmo motor; config define `questionsPerDimension: 6`

### Produto com N questões e D dimensões
- Config define `dimensions.length` e `questionsPerDimension`
- Motor calcula automaticamente agrupamentos
- Respiros: Math.floor(totalQuestions / 4)

---

## Regras de Qualidade

- Tom de voz: elegante, austero, direto — sem gatilhos de medo, culpa ou urgência
- Resultado do diagnóstico nomeia padrões, nunca julga
- CTA aparece naturalmente após o resultado, não como pressão
- Lead gate ocorre depois do quiz, não antes (compromisso primeiro)
- Cada arquétipo tem oferta distinta (não one-size-fits-all)
- PDF e share card são bônus de valor, não muros de acesso

---

## Exemplos de Uso

Ver `examples/` para configurações completas de produtos com 12 e 36 questões.





## Triggers

Use esta skill quando o usuário mencionar:
- página de vendas com quiz
- funil com diagnóstico
- quiz diagnóstico produto
- landing com resultado personalizado
- quiz de vendas
- diagnóstico embutido
- funil quiz → resultado → checkout


---

**Criador:** Ana Retore
© Ana Retore | The Cosmo
