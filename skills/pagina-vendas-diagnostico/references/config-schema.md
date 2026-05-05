# Config Schema — Página de Vendas com Diagnóstico

```typescript
interface SalesPageConfig {
  // ── IDENTIDADE DO PRODUTO ──────────────────────────────
  productName: string;           // Ex: 'Portal Reset Mental'
  productTagline: string;        // Ex: 'Espaço de consciência e poder'
  productColor: string;          // Hex principal, ex: '#C8B870'
  contactEmail: string;
  contactWhatsApp?: string;

  // ── HERO ───────────────────────────────────────────────
  heroHeadlines: string[];       // 2-3 variantes A/B/C
  heroSubheadline: string;
  heroCTA: string;               // Ex: 'Ver meu mapa grátis'
  heroImages: {
    url: string;
    alt: string;
    mobileUrl?: string;
  }[];

  // ── DORES (pain points) ────────────────────────────────
  painPoints: string[];          // 4 frases que nomeiam padrões do público

  // ── QUIZ ───────────────────────────────────────────────
  quizIntroTitle: string;
  quizIntroBody: string;
  quizQuestions: {
    id: string;                  // Ex: 'q01'
    text: string;
    dimension: string;           // deve casar com dimensions[]
    type: 'clinical' | 'symbolic';
  }[];
  quizRespiros: {
    afterQuestion: number;       // Após qual questão aparece
    title: string;
    body: string;
  }[];

  // ── DIMENSÕES ──────────────────────────────────────────
  dimensions: {
    key: string;                 // Ex: 'corpo'
    label: string;               // Ex: 'Corpo'
    description?: string;
  }[];

  // ── ARQUÉTIPOS ─────────────────────────────────────────
  archetypes: {
    key: string;                 // Ex: 'curiosa'
    name: string;                // Ex: 'Curiosa'
    color: string;               // Hex do arquétipo
    scoreThreshold: number;      // Score máximo para este arquétipo
    abertura: string;            // Frase de reconhecimento
    dorRaiz: string;             // O que está acontecendo
    cicloRecomendado: string;    // Ex: 'Ciclo Destrava — Módulos 01, 03'
    primeiroPassoTexto: string;  // Próximo passo concreto
  }[];                           // Ordenados do menor para maior threshold

  // ── MENTORES/FACILITADORES ─────────────────────────────
  mentors: {
    name: string;
    title: string;
    description: string;
    areas: string[];             // Ex: ['mente', 'clareza']
    priceEquivalent?: string;    // Ex: 'Sessão de R$350/h'
  }[];

  // ── PRICING ────────────────────────────────────────────
  pricing: {
    founder?: {
      amount: number;
      currency: string;          // Ex: 'BRL'
      period: string;            // Ex: 'mês'
      bonus?: string;            // Ex: '6 meses inclusos'
      vacancyLimit?: number;     // Ex: 200
    };
    regular: {
      amount: number;
      currency: string;
      period: string;
    };
    plans?: {
      name: string;
      duration: string;
      amountPerMonth: number;
    }[];
  };
  checkoutUrl: string;

  // ── GARANTIA ───────────────────────────────────────────
  guarantee: {
    days: number;                // Ex: 30
    title: string;
    body: string;
  };

  // ── FAQ ────────────────────────────────────────────────
  faq: {
    question: string;
    answer: string;
  }[];

  // ── DIAGNÓSTICO ────────────────────────────────────────
  diagnostic: {
    questionsPerDimension: number;  // Ex: 2 (12q) ou 6 (36q)
    scaleMin: number;               // Geralmente 1
    scaleMax: number;               // Geralmente 9
    invertScale: boolean;           // true = ruído alto → estabilidade baixa
    respiroEvery: number;           // A cada N questões
  };

  // ── 7-DAY PLAN (templates) ─────────────────────────────
  planTemplates?: {
    day: number;
    template: string;            // Use {bottom1}, {top1}, {centralAxis} como placeholders
  }[];
}
```

---

## Validação Mínima

Antes de renderizar, validar:
- `quizQuestions.length === dimensions.length × diagnostic.questionsPerDimension`
- `archetypes` ordenados por `scoreThreshold` ascendente
- `archetypes[archetypes.length-1].scoreThreshold >= diagnostic.scaleMax`
- `quizRespiros` com `afterQuestion` dentro do range de questões
