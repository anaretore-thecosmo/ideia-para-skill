# Motor de Diagnóstico — Implementação

## Entrada

```typescript
type RawAnswer = { questionId: string; value: number }; // value: 1-9
```

## Normalização

```typescript
// Questões medem FREQUÊNCIA DE RUÍDO
// Raw 9 = 'quase sempre no ruído' → normalizado = 1 (baixa estabilidade)
// Raw 1 = 'quase nunca no ruído' → normalizado = 9 (alta estabilidade)

function normalize(raw: number, scaleMax: number): number {
  return (scaleMax + 1) - raw;
}
```

## Construção dos Eixos

```typescript
function buildAxes(answers: RawAnswer[], config: SalesPageConfig): AxisData[] {
  return config.dimensions.map((dim) => {
    const dimQuestions = config.quizQuestions
      .filter(q => q.dimension === dim.key)
      .sort((a, b) => a.id.localeCompare(b.id));

    const clinicals = dimQuestions.filter(q => q.type === 'clinical');
    const symbolics = dimQuestions.filter(q => q.type === 'symbolic');

    const clinMean = avg(clinicals.map(q =>
      normalize(getAnswer(answers, q.id), config.diagnostic.scaleMax)
    ));
    const symbMean = avg(symbolics.map(q =>
      normalize(getAnswer(answers, q.id), config.diagnostic.scaleMax)
    ));

    const mean = (clinMean + symbMean) / 2;
    const tension = Math.abs(clinMean - symbMean);

    return {
      key: dim.key,
      label: dim.label,
      clinical: clinMean,
      symbolic: symbMean,
      mean,
      tension,
      type: classifyAxis(clinMean, symbMean, tension, config.diagnostic.scaleMax),
    };
  });
}
```

## Classificação do Tipo de Eixo

```typescript
type AxisType =
  | 'EXCELENCIA'
  | 'BASE_ESTAVEL'
  | 'APAGAMENTO'
  | 'EXECUTA_SEM_SI'
  | 'SENTE_SEM_ESTRUTURA'
  | 'OSCILACAO';

function classifyAxis(
  clin: number,
  symb: number,
  tension: number,
  scaleMax: number
): AxisType {
  const high = scaleMax;         // 9
  const highThresh = high * 0.77; // ~7
  const lowThresh = high * 0.33;  // ~3

  if (clin === high && symb === high) return 'EXCELENCIA';
  if (clin >= highThresh && symb >= highThresh) return 'BASE_ESTAVEL';
  if (clin <= lowThresh && symb <= lowThresh) return 'APAGAMENTO';
  if (clin >= highThresh && symb <= lowThresh) return 'EXECUTA_SEM_SI';
  if (clin <= lowThresh && symb >= highThresh) return 'SENTE_SEM_ESTRUTURA';
  return 'OSCILACAO'; // fallback (inclui tension >= 4)
}
```

## Rankings

```typescript
function computeRankings(axes: AxisData[]) {
  const sorted = [...axes].sort((a, b) => b.mean - a.mean || b.tension - a.tension);

  return {
    top3: sorted.slice(0, 3),
    bottom3: sorted.slice(-3).reverse(),
    // Eixo central = maior tensão (conflito mais vivo)
    centralAxis: [...axes].sort((a, b) => b.tension - a.tension)[0],
  };
}
```

## Output: DiagnosticData

```typescript
interface DiagnosticData {
  axes: AxisData[];        // Todas as dimensões
  top3: AxisData[];        // 3 mais estáveis
  bottom3: AxisData[];     // 3 com mais ruído
  centralAxis: AxisData;   // Maior tensão interna
  overallMean: number;     // Score geral (1-9)
  archetype: ArchetypeData; // Arquétipo calculado
  rawAnswers: RawAnswer[];
  normAnswers: { questionId: string; value: number }[];
}
```

## Cálculo do Arquétipo

```typescript
function getArchetype(overallMean: number, config: SalesPageConfig): ArchetypeData {
  // archetypes DEVE estar ordenado por scoreThreshold ASC
  const match = config.archetypes.find(a => overallMean <= a.scoreThreshold);
  return match ?? config.archetypes[config.archetypes.length - 1];
}
```
