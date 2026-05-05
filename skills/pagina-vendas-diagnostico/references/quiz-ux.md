# UX do Quiz de Diagnóstico

Regras de experiência do usuário para o fluxo de quiz. Extraídas dos princípios de cognitive load (Cowan, 2001) e interaction design.

---

## Princípio Central: Uma Coisa por Vez

O quiz é um ambiente de introspecção. Qualquer elemento que compete com a pergunta atual é ruído cognitivo.

**Regra:** uma questão por tela. Sem preview das próximas. Sem contagem regressiva de tempo.

---

## Cognitive Load no Quiz

**Working memory limit: ≤4 itens simultâneos (Miller/Cowan)**

Aplicações diretas:

- A escala de resposta deve ter ≤ 9 pontos (o padrão 1-9 está no limite — nunca usar escala de 1-10 sem âncoras claras)
- Âncoras obrigatórias nas extremidades: label no 1 e no 9. Nunca deixar o usuário inferir o significado
- Instrução da escala aparece uma vez (introscreen) e fica visível durante o quiz em formato compacto
- Nunca exigir que o usuário lembre uma resposta anterior para responder a atual

**Exemplo de âncoras:**
```
1 ←————————————→ 9
Quase nunca         Quase sempre
```

---

## Progresso Visível

O usuário deve saber onde está e quanto falta. Barra de progresso obrigatória.

**Regras:**
- Progresso por questão, não por dimensão (o usuário não conhece a estrutura interna)
- Formato: barra preenchida gradualmente. Texto 'Questão 4 de 12' é opcional mas útil
- Nunca mostrar número de dimensões ou eixos — expõe a engenharia
- Cor da barra: cor primária do produto

---

## Respiros (Pausas Motivacionais)

Cada respiro é um reset de atenção que previne fadiga de quiz.

**Regras:**
- Frequência: a cada 4 questões (Math.floor(totalQuestions / 4))
- Duração visual: tela separada, não modal. O usuário para completamente
- Conteúdo: 1 título curto + 1-2 linhas. Sem perguntas, sem decisões
- Tom: reconhecimento ('Você já está no caminho'), não motivação vazia ('Continue! Você consegue!')
- CTA do respiro: 'Continuar' — específico, não 'Próximo'

---

## Labels de Botão (UX Writing)

Nunca usar termos vagos. Cada botão descreve o que acontece ao clicar.

| Contexto | Errado | Certo |
|---|---|---|
| Avançar no quiz | Próximo | Ver próxima questão |
| Iniciar quiz | Começar | Abrir meu diagnóstico |
| Continuar após respiro | OK / Próximo | Continuar |
| Enviar lead gate | Enviar / Submit | Ver meu resultado |
| Voltar questão | Voltar | Questão anterior |
| Reiniciar | Recomeçar | Fazer o diagnóstico de novo |

---

## Lead Gate — Formulário

O lead gate aparece após o quiz e antes do resultado. O usuário já investiu tempo — a conversão é mais natural aqui.

**Regras:**
- Campos: Nome (obrigatório) + Email (obrigatório) + WhatsApp (opcional)
- Nunca: campo de senha, endereço, CPF — qualquer dado não essencial
- Labels visíveis acima do campo — nunca só placeholder (desaparece ao digitar)
- Placeholder: mostrar formato esperado. Ex: `seu@email.com`
- Validação: no blur (quando o campo perde foco), não no keystroke
- Erro: abaixo do campo, específico. 'Por favor, inclua um @ no email' não 'Email inválido'
- CTA: 'Ver meu resultado' — reforça o que o usuário ganha, não o que a empresa coleta
- Contexto visível: mostrar acima do form que o resultado está pronto ('Seu diagnóstico está pronto. Informe onde enviar.')

---

## Estados de Loading do Resultado

O resultado envolve cálculo do diagnóstico + geração editorial. O loading deve parecer intencional, não travado.

**Regras:**
- Feedback imediato: spinner ou skeleton ao submeter o lead gate
- Mensagem específica: 'Calculando seu diagnóstico...' não 'Carregando...'
- Para esperas > 2s: mostrar progresso em etapas: 'Mapeando seus eixos... Gerando seu perfil... Preparando seu plano...'
- Skeleton screen > spinner genérico: preview da estrutura do resultado enquanto carrega
- Nunca deixar tela em branco por > 300ms

---

## Estados Interativos da Escala 1-9

Cada ponto da escala é um elemento interativo. Todos os 8 estados devem ser tratados:

| Estado | Tratamento |
|---|---|
| Default | Círculo outline, cor muted |
| Hover | Fill parcial, cursor pointer, leve escala (1.05x) |
| Focus (teclado) | Outline 2px cor primária, offset 2px |
| Selected | Fill cor primária, peso visual maior |
| Active (pressed) | Escala 0.95x (pressed in) |
| Disabled | Não usar — toda escala deve estar acessível |
| Error | Não aplicável à escala |
| Success | Animação suave ao selecionar (0.2s ease) — confirma a escolha |

**Acessibilidade:** escala 1-9 via teclado (←→ para navegar, Enter para selecionar). Aria-label em cada ponto: `aria-label='1 — quase nunca'`.

---

## Transições entre Telas

**Framer Motion — padrão recomendado:**

```typescript
// Entrada de nova questão
const questionVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

// Respiro — fade simples, sem slide
const respiroVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.3 } },
};

// Resultado — reveal progressivo com stagger
const resultVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.35, ease: 'easeOut' }
  }),
};
```

**Regra do motion:** se o usuário tem `prefers-reduced-motion`, remover translate e manter só opacity.

```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

---

## Checklist UX Quiz

- [ ] Uma questão por tela
- [ ] Âncoras nos extremos da escala (1 e 9)
- [ ] Barra de progresso visível
- [ ] Respiro a cada 4 questões
- [ ] Lead gate antes do resultado (não antes do quiz)
- [ ] Labels de botão específicos (não 'Próximo')
- [ ] Validação do form no blur, não no keystroke
- [ ] Erro específico abaixo do campo com problema
- [ ] Loading com mensagem específica
- [ ] Skeleton screen no resultado
- [ ] Navegação por teclado na escala (←→ + Enter)
- [ ] AnimatePresence em todas as trocas de tela
- [ ] prefers-reduced-motion respeitado
