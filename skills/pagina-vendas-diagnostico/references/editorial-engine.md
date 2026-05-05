# Motor Editorial — Geração Automática de Textos

## Parágrafos do Resultado (4 parágrafos)

```typescript
function generateEditorialDiagnostic(data: DiagnosticData): string[] {
  const { top3, bottom3, centralAxis, overallMean, axes } = data;
  const stableCount = axes.filter(a => a.mean >= 7).length;
  const noiseCount = axes.filter(a => a.mean <= 3).length;

  // P1 — Panorama geral
  const p1 = stableCount >= 4
    ? `Seu padrão atual tem base sólida. ${stableCount} de ${axes.length} dimensões operam acima do ruído. Isso não é pouca coisa.`
    : noiseCount >= 3
    ? `O momento atual é de muito gasto interno. ${noiseCount} dimensões estão abaixo do limiar de estabilidade. O corpo e a mente estão pagando um custo alto.`
    : `Você está em movimento. Há pontos firmes e pontos que precisam de atenção. Esse é o mapa real — sem otimismo vazio, sem alarmismo.`;

  // P2 — Onde sustenta (top3)
  const p2 = `Suas zonas de base são ${
    top3.map(a => a.label).join(', ')
  }. ${top3[0] ? top3[0].label + ': ' + axisTypeMicro(top3[0].type) : ''}`;

  // P3 — Onde vaza energia (bottom3)
  const p3 = `Os pontos que mais consomem energia: ${
    bottom3.map(a => a.label).join(', ')
  }. ${
    bottom3[0] ? bottom3[0].label + ' mostra ' + axisTypeMicro(bottom3[0].type) : ''
  }`;

  // P4 — A virada (eixo central)
  const p4 = `O conflito central está em ${centralAxis.label}. ${
    axisTypeMicro(centralAxis.type)
  } Tensão de ${centralAxis.tension.toFixed(1)} — o maior gap entre o que você faz e o que sente.`;

  return [p1, p2, p3, p4];
}

function axisTypeMicro(type: AxisType): string {
  const micros: Record<AxisType, string> = {
    EXCELENCIA: 'Aqui você está acima do ruído. Sustente isso.',
    BASE_ESTAVEL: 'Existe base. O foco é proteger, não exigir mais.',
    APAGAMENTO: 'O ruído está ocupando espaço. Comece pelo mínimo.',
    EXECUTA_SEM_SI: 'Você consegue fazer, mas se perde de si. Retorno antes da ação.',
    SENTE_SEM_ESTRUTURA: 'Você percebe, mas não sustenta. Estrutura leve, não força.',
    OSCILACAO: 'Há alternância. Reduzir custo mental estabiliza.',
  };
  return micros[type];
}
```

## Plano de N Dias (padrão 7)

```typescript
function generateNDayPlan(data: DiagnosticData, days = 7): string[] {
  const { bottom3, top3, centralAxis } = data;
  const b1 = bottom3[0]?.label ?? 'foco interno';
  const b2 = bottom3[1]?.label ?? 'ritmo';
  const t1 = top3[0]?.label ?? 'base';

  const templates = [
    `Dia 1: Observe sem agir. Perceba em que momento do dia ${b1} pesa mais.`,
    `Dia 2: Escolha uma micro-ação que proteja ${t1}. Algo que leva menos de 3 minutos.`,
    `Dia 3: Nomeie o que está custando energia em ${b2}. Só nomear já reduz.`,
    `Dia 4: Observe sua resposta automática quando ${centralAxis.label} entra em conflito.`,
    `Dia 5: Faça o contrário de uma reação automática — só uma, só hoje.`,
    `Dia 6: Pergunte: o que eu precisaria parar de fazer para ${b1} ficar mais leve?`,
    `Dia 7: Feche a semana nomeando o que mudou. Sem julgamento, sem meta.`,
  ];

  return templates.slice(0, days);
}
```

## Customização dos Templates

Se o config tiver `planTemplates`, use-os no lugar dos defaults.
Placeholders disponíveis:
- `{bottom1}`, `{bottom2}`, `{bottom3}` — labels das 3 dimensões com mais ruído
- `{top1}`, `{top2}`, `{top3}` — labels das 3 dimensões mais estáveis
- `{centralAxis}` — label do eixo central de tensão
- `{archetypeName}` — nome do arquétipo do usuário
