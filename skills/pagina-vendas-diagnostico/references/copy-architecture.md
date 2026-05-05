# Arquitetura de Copy — Página de Vendas com Diagnóstico

## Princípio de Frequência

Todo copy desta página opera acima de 350hz.

Proibido abaixo dessa frequência:
- Escassez fabricada ('últimas vagas', 'oferta por tempo limitado' sem ser real)
- Culpa ('você ainda não fez isso?')
- Medo como motivador primário
- Urgência artificial

Permitido e desejável:
- Nomear a dor com precisão (reconhecimento, não manipulação)
- Revelar mecanismo oculto (o por que do padrão, não o produto)
- Espelhar o que a pessoa vive sem que ela tenha nomeado ainda
- Solução presente mesmo quando não é uma receita
- Venda como consequência, nunca como intenção declarada

---

## Nível de Consciência do Público (Schwartz)

Antes de escrever qualquer headline, identificar onde o público está:

| Nível | Estado | Abordagem |
|---|---|---|
| **Não-consciente** | Não sabe que tem o problema | Abrir com história ou curiosidade — sem mencionar produto |
| **Consciente do problema** | Sente, mas não sabe a causa | Nomear o sintoma com precisão. Agitar antes de resolver |
| **Consciente da solução** | Sabe que existe solução, não conhece a sua | Conectar a solução ao produto. Mostrar mecanismo único |
| **Consciente do produto** | Conhece o produto, não comprou | Diferenciar. Remover objeção. Prova |
| **Mais consciente** | Está pronto, falta o empurrão | Nome + oferta direta |

Páginas de diagnóstico trabalham principalmente com **consciente do problema** — o quiz é o mecanismo que eleva o nível de consciência antes do checkout.

---

## Estrutura de Copy por Seção

### Hero

**Objetivo:** parar o scroll + criar curiosidade + iniciar identificação

**Fórmula:**
```
[Kicker — overline em uppercase, 2-4 palavras]
[Headline — nomeia o estado interno, não o produto]
[Subheadline — especifica quem é e o que vai descobrir]
[CTA — ação de baixo risco: 'Ver meu resultado' não 'Comprar agora']
```

**Tipos de headline que funcionam para diagnóstico:**
- Estado interno nomeado: 'Você sabe que tem mais dentro de si. O diagnóstico mostra onde está o bloqueio.'
- Inversão: 'O problema não é falta de esforço. É que você está usando a ferramenta errada para o problema certo.'
- Pergunta cirúrgica: 'E se o padrão que te trava tivesse um nome específico?'

**Variantes A/B/C:** testar 2-3 headlines. Persistir em sessionStorage. Registrar via analytics.

---

### Seção de Dores

**Objetivo:** espelhar o que a pessoa vive — ela deve sentir que foi escrita para ela

**Regra:** nomear o padrão, não o sentimento genérico
- Fraco: 'Você se sente perdida?'
- Forte: 'Você sabe exatamente o que precisa fazer. Mas na hora H, algo para você.'

**Estrutura:**
```
[4 frases curtas — cada uma nomeia um padrão específico]
[Pergunta de identificação: 'Você se reconhece aqui?']
[Transição para o diagnóstico: 'Isso tem nome. E tem causa.']
```

---

### Seção de Arquétipos/Perfis

**Objetivo:** mostrar que o resultado é personalizado — não é um produto genérico

**Estrutura por perfil:**
```
[Nome do arquétipo]
[Descrição em 2 linhas — quem é essa pessoa]
[O que ela carrega — dor ou padrão central]
[O que ela ganha com o diagnóstico]
```

---

### Seção de Facilitadores/Mentoras

**Objetivo:** mostrar suporte especializado — humanizar o produto

**Estrutura por facilitador:**
```
[Nome]
[Área de atuação]
[O que resolve — específico, não genérico]
[Equivalente de valor: 'Uma sessão individual custa R$X — aqui está incluído']
```

---

### Value Stack

**Objetivo:** construir valor percebido antes de revelar o preço

**Regra Hormozi:** o valor percebido deve ser ≥10x o preço apresentado.

**Estrutura:**
```
[Item 1] — valor de mercado: R$XXX
[Item 2] — valor de mercado: R$XXX
...
Valor total: R$X.XXX
Seu investimento: R$XX/mês
Economia: X%
```

**O que conta como item:** diagnóstico, acesso às mentoras/facilitadores, plano gerado, materiais, comunidade, suporte, bônus de tempo (meses inclusos).

---

### Pricing

**Objetivo:** remover objeção de preço via ancoragem e comparação

**Técnicas:**
- **Ancoragem:** mostrar preço regular antes do founder/especial
- **Comparação diária:** 'R$X/mês = R$Y/dia — menos que um café'
- **Comparação de mercado:** 'Uma sessão individual: R$X. Aqui por X meses: R$Y/mês'
- **Founder/acesso especial:** limitar por vagas reais ou janela de tempo real

**Estrutura mínima:**
```
[Plano fundador — destaque visual, mais barato]
[Plano regular — ancora o fundador como barganha]
[O que inclui — listagem de itens do value stack]
[CTA — específico: 'Garantir meu acesso fundadora']
```

---

### Garantia

**Objetivo:** eliminar risco percebido — tornar a decisão reversível

**Regras:**
- Ser específico nos dias: '30 dias' não 'garantia'
- Explicar o processo: 'Se não fizer sentido, basta enviar um email para X e devolvemos tudo'
- Sem condições escondidas
- Visual: ícone de escudo ou selo torna a garantia mais tangível

---

### FAQ

**Objetivo:** responder objeções reais antes que impeçam a compra

**As 6 objeções universais de produtos digitais:**
1. Tempo: 'Quanto tempo preciso dedicar?'
2. Resultado: 'Como eu sei que vai funcionar para mim?'
3. Diferença: 'Como isso é diferente de [alternativa conhecida]?'
4. Acesso: 'Como funciona o acesso? Por quanto tempo?'
5. Cancelamento: 'Posso cancelar? Como?'
6. Suporte: 'Terei acompanhamento ou é só conteúdo gravado?'

**Regra de resposta:**
- Específico e honesto — sem evasivas
- Curto: 2-4 linhas por resposta
- Se a resposta for desvantagem, admitir e recontextualizar: 'Não é para quem quer resultado em 24h. É para quem quer mudança que dura.'

---

### CTAs — Distribuição e Copy

**Regra:** mínimo 5 CTAs distribuídos ao longo da página. Nunca agrupados.

**Posições obrigatórias:**
1. Hero (acima da dobra)
2. Após seção de dores
3. Após valor stack / pricing
4. Após garantia
5. CTA final + sticky mobile

**Copy por posição:**

| Posição | Copy | Lógica |
|---|---|---|
| Hero | 'Ver meu diagnóstico grátis' | Baixo risco, sem falar em compra |
| Pós-dores | 'Quero saber meu padrão' | Identificação — curiosidade |
| Pós-value stack | 'Garantir meu acesso' | Decisão — já viu o valor |
| Pós-garantia | 'Começar agora — 30 dias de garantia' | Remove objeção de risco |
| Final | 'Entrar agora' | Direto — já leu tudo |

**Friction reducers — adicionar ao CTA ou próximo a ele:**
- Prova social: 'Junte-se a X pessoas'
- Velocidade: 'Acesso imediato'
- Garantia resumida: '30 dias ou seu dinheiro de volta'
- Sem cartão: 'Experimente grátis' (se aplicável)

---

## Regras Globais de Copy

- Nunca usar superlativo sem prova ('melhor', 'único', 'revolucionário')
- Nunca voz passiva em CTAs
- Nunca mais de 3 frases sem quebra visual
- Nunca jargão que o público não usa
- Sempre: especificidade > generalidade. '6 de 10 mulheres' > 'muitas pessoas'
- Sempre: ler em voz alta antes de publicar — se soar escrito, reescrever
