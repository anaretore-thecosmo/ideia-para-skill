# Exemplo: Config para Produto com 12 Questões

Este exemplo mostra a estrutura mínima de config para um produto com 12 questões (6 dimensões × 2 questões cada).

```typescript
const config: SalesPageConfig = {
  productName: 'Nome do Produto',
  productTagline: 'Tagline do produto',
  productColor: '#C8B870',
  contactEmail: 'suporte@exemplo.com',

  heroHeadlines: [
    'Headline principal',
    'Variante B',
    'Variante C',
  ],
  heroSubheadline: 'Subheadline que nomeia a dor ou o desejo central.',
  heroCTA: 'Ver meu resultado grátis',
  heroImages: [
    { url: 'https://cdn.exemplo.com/hero1.avif', alt: 'Descrição da imagem 1' },
    { url: 'https://cdn.exemplo.com/hero2.avif', alt: 'Descrição da imagem 2' },
  ],

  painPoints: [
    'Você sente X mas não consegue Y.',
    'Tenta Z mas sempre volta ao mesmo padrão.',
    'Sabe o que precisa, mas algo trava na hora de executar.',
    'O esforço é grande, mas o resultado não acompanha.',
  ],

  dimensions: [
    { key: 'dim1', label: 'Dimensão 1' },
    { key: 'dim2', label: 'Dimensão 2' },
    { key: 'dim3', label: 'Dimensão 3' },
    { key: 'dim4', label: 'Dimensão 4' },
    { key: 'dim5', label: 'Dimensão 5' },
    { key: 'dim6', label: 'Dimensão 6' },
  ],

  quizIntroTitle: 'Seu diagnóstico começa aqui.',
  quizIntroBody: 'Responda com a primeira impressão. Não existe resposta certa ou errada.',
  quizQuestions: [
    { id: 'q01', text: 'Com que frequência você sente [padrão dim1 clínico]?', dimension: 'dim1', type: 'clinical' },
    { id: 'q02', text: 'Com que frequência você se sente [padrão dim1 simbólico]?', dimension: 'dim1', type: 'symbolic' },
    { id: 'q03', text: 'Questão clínica dim2.', dimension: 'dim2', type: 'clinical' },
    { id: 'q04', text: 'Questão simbólica dim2.', dimension: 'dim2', type: 'symbolic' },
    // ... até q12
  ],
  quizRespiros: [
    { afterQuestion: 4, title: 'Pausa.', body: 'Você está no caminho. Continue.' },
    { afterQuestion: 8, title: 'Metade vencida.', body: 'Suas respostas já dizem algo importante.' },
    { afterQuestion: 12, title: 'Quase lá.', body: 'Resultado em instantes.' },
  ],

  archetypes: [
    {
      key: 'nivel1',
      name: 'Perfil 1',
      color: '#7BB89A',
      scoreThreshold: 3,
      abertura: 'Frase de reconhecimento para score <= 3.',
      dorRaiz: 'O que está acontecendo em padrão de score baixo.',
      cicloRecomendado: 'Módulo de entrada recomendado.',
      primeiroPassoTexto: 'Ação concreta para começar.',
    },
    {
      key: 'nivel2',
      name: 'Perfil 2',
      color: '#C8A050',
      scoreThreshold: 5,
      abertura: 'Frase de reconhecimento para score 4-5.',
      dorRaiz: 'Padrão de score médio-baixo.',
      cicloRecomendado: 'Módulo intermediário.',
      primeiroPassoTexto: 'Próximo passo concreto.',
    },
    {
      key: 'nivel3',
      name: 'Perfil 3',
      color: '#7B9EC8',
      scoreThreshold: 7,
      abertura: 'Frase para score 6-7.',
      dorRaiz: 'Padrão de score médio-alto.',
      cicloRecomendado: 'Módulo avançado.',
      primeiroPassoTexto: 'Consolidação.',
    },
    {
      key: 'nivel4',
      name: 'Perfil 4',
      color: '#C8B870',
      scoreThreshold: 9,
      abertura: 'Frase para score > 7.',
      dorRaiz: 'Padrão de alta estabilidade.',
      cicloRecomendado: 'Expansão.',
      primeiroPassoTexto: 'Sustentação do nível.',
    },
  ],

  mentors: [
    { name: 'Mentor 1', title: 'Título', description: 'Descrição', areas: ['area1', 'area2'] },
    { name: 'Mentor 2', title: 'Título', description: 'Descrição', areas: ['area3'] },
  ],

  pricing: {
    founder: { amount: 47, currency: 'BRL', period: 'mês', bonus: 'Bônus exclusivo', vacancyLimit: 200 },
    regular: { amount: 147, currency: 'BRL', period: 'mês' },
  },
  checkoutUrl: 'https://checkout.exemplo.com/produto',

  guarantee: {
    days: 30,
    title: 'Garantia de 30 dias',
    body: 'Se não fizer sentido, devolvemos tudo. Sem perguntas.',
  },

  faq: [
    { question: 'Quanto tempo preciso por dia?', answer: 'Resposta honesta e específica.' },
    { question: 'Como funciona o diagnóstico?', answer: 'Explicação do processo.' },
    { question: 'Posso cancelar?', answer: 'Política de cancelamento.' },
  ],

  diagnostic: {
    questionsPerDimension: 2,
    scaleMin: 1,
    scaleMax: 9,
    invertScale: true,
    respiroEvery: 4,
  },
};
```
