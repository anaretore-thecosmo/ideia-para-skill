# Exemplo: Config para Produto com 36 Questões

Produto mais aprofundado: 6 dimensões × 6 questões (3 clínicas + 3 simbólicas por dimensão).

```typescript
const config: SalesPageConfig = {
  // ... mesmos campos de identidade, hero, dores, mentores, pricing, garantia, FAQ

  dimensions: [
    { key: 'dim1', label: 'Dimensão 1', description: 'O que esta dimensão avalia.' },
    // ... 6 dimensões
  ],

  quizQuestions: [
    // dim1 — 3 clínicas + 3 simbólicas
    { id: 'q01', text: 'Questão clínica 1 de dim1.', dimension: 'dim1', type: 'clinical' },
    { id: 'q02', text: 'Questão clínica 2 de dim1.', dimension: 'dim1', type: 'clinical' },
    { id: 'q03', text: 'Questão clínica 3 de dim1.', dimension: 'dim1', type: 'clinical' },
    { id: 'q04', text: 'Questão simbólica 1 de dim1.', dimension: 'dim1', type: 'symbolic' },
    { id: 'q05', text: 'Questão simbólica 2 de dim1.', dimension: 'dim1', type: 'symbolic' },
    { id: 'q06', text: 'Questão simbólica 3 de dim1.', dimension: 'dim1', type: 'symbolic' },
    // ... dim2 até dim6 (total: 36 questões)
  ],

  quizRespiros: [
    { afterQuestion: 4, title: 'Pausa 1.', body: 'Continue.' },
    { afterQuestion: 8, title: 'Pausa 2.', body: 'Metade do caminho.' },
    // ... a cada 4 questões = 9 respiros
  ],

  diagnostic: {
    questionsPerDimension: 6,  // 3 clinical + 3 symbolic por dimensão
    scaleMin: 1,
    scaleMax: 9,
    invertScale: true,
    respiroEvery: 4,
  },

  // archetypes — mesma estrutura de 4 perfis
};
```

## Diferenças no Motor para 36 Questões

O motor lida automaticamente com `questionsPerDimension: 6`:
- Agrupa as 3 questões `clinical` da dimensão → calcula média
- Agrupa as 3 questões `symbolic` da dimensão → calcula média
- Usa essas médias no cálculo de `AxisData` normalmente

Nenhuma alteração no motor é necessária — só na config.
