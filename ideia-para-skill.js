#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Estruturas de Skills por tipo
const SKILL_STRUCTURES = {
  processual: `# {nome}

**Tipo:** Processual

**Descrição:** {descricao}

## O que faz
{bullets}

## Como usar
\`\`\`
{exemplo}
\`\`\`

## Passos
{passos}

## Resultado esperado
{resultado}`,

  diagnóstica: `# {nome}

**Tipo:** Diagnóstica

**Descrição:** {descricao}

## O que faz
Mapeia, identifica e estrutura {subject}

## Como funciona
{funcionamento}

## Input esperado
{input}

## Output / Diagnóstico
{output}

## Quando usar
- {caso1}
- {caso2}
- {caso3}`,

  conversacional: `# {nome}

**Tipo:** Agente Conversacional

**Descrição:** {descricao}

## Propósito
{proposito}

## Características principais
- {trait1}
- {trait2}
- {trait3}

## Como chamar
\`\`\`
{como_chamar}
\`\`\`

## Exemplo de conversa
{exemplo}

## Resultado esperado
{resultado}`,

  metodológica: `# {nome}

**Tipo:** Metodológica

**Descrição:** {descricao}

## Princípios fundamentais
{principios}

## Pilares
### {pilar1}
{desc1}

### {pilar2}
{desc2}

### {pilar3}
{desc3}

## Aplicação
{aplicacao}

## Resultado esperado
{resultado}`,

  mapa: `# {nome}

**Tipo:** Mapa Estrutural

**Descrição:** {descricao}

## Núcleo central
{nucleo}

## Ramos principais
### {ramo1}
{desc1}
- {subramo1}
- {subramo2}
- {subramo3}

### {ramo2}
{desc2}
- {subramo1}
- {subramo2}
- {subramo3}

### {ramo3}
{desc3}
- {subramo1}
- {subramo2}
- {subramo3}

## Conexões / Sínteses
{conexoes}

## Resultado esperado
{resultado}`,
};

async function detectSkillType(content) {
  const detectPrompt = `Analise este texto e responda APENAS com UMA destas palavras:
- processual (passo a passo, receita, procedimento)
- diagnóstica (mapeia, lê, identifica, estrutura, análise)
- conversacional (agente, assistente, persona, interlocutor)
- metodológica (framework, método, princípios, pilares)
- mapa (estrutura visual, ramos, hierarquia, organização)

TEXTO:
${content.substring(0, 1000)}

RESPOSTA (só a palavra):`;

  const response = await client.messages.create({
    model: "claude-opus-4-6-20250805",
    max_tokens: 10,
    messages: [{ role: "user", content: detectPrompt }],
  });

  const type =
    response.content[0].type === "text"
      ? response.content[0].text.toLowerCase().trim()
      : "processual";

  const validTypes = [
    "processual",
    "diagnóstica",
    "conversacional",
    "metodológica",
    "mapa",
  ];
  return validTypes.includes(type) ? type : "processual";
}

async function transformDocToSkill(filePath) {
  // Validar arquivo
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${filePath}`);
    process.exit(1);
  }

  // Ler conteúdo
  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.trim()) {
    console.error("❌ Arquivo vazio");
    process.exit(1);
  }

  console.log("🔄 Detectando tipo de skill...");
  const skillType = await detectSkillType(content);
  console.log(`📊 Tipo detectado: ${skillType}`);

  console.log("🔄 Analisando documento...");

  // Determinar template e instruções específicas
  const templateInstructions = {
    processual: `Foco: passos práticos, sequência clara, resultado concreto.`,
    diagnóstica: `Foco: mapping, análise, identificação de padrões.`,
    conversacional: `Foco: personalidade, tom, características do agente.`,
    metodológica: `Foco: princípios, pilares, fundamentos estruturantes.`,
    mapa: `Foco: estrutura visual, ramos principais, hierarquia clara, conexões.`,
  };

  const message = await client.messages.create({
    model: "claude-opus-4-6-20250805",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `Você é especialista em estruturação de Skills. Analise este documento e crie uma Skill ${skillType}.

${templateInstructions[skillType]}

DOCUMENTO:
${content}

INSTRUÇÕES:
1. Identifique o core do processo/metodologia
2. Crie um nome estratégico (kebab-case, 2-3 palavras, sem prefixos genéricos)
3. Estruture preenchendo todos os campos do template ${skillType}
4. Preencha TODOS os placeholders ({...}) com conteúdo relevante
5. Mantenha a estrutura exata do template

RESPONDA APENAS COM A ESTRUTURA SKILL.MD PURA, SEM EXPLICAÇÕES.
Comece direto com # Nome da Skill`,
      },
    ],
  });

  const skillContent =
    message.content[0].type === "text" ? message.content[0].text : "";

  // Extrair nome da skill
  const nameMatch = skillContent.match(/^#\s+(.+?)$/m);
  if (!nameMatch) {
    console.error("❌ Não foi possível extrair nome da skill");
    process.exit(1);
  }

  const skillName = nameMatch[1]
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  // Determinar caminho de saída
  const skillDir = path.join("C:/Users/Ana/Downloads/Ana/skills", skillName);
  const skillFile = path.join(skillDir, "SKILL.md");

  // Criar diretório
  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir, { recursive: true });
  }

  // Salvar arquivo
  fs.writeFileSync(skillFile, skillContent, "utf-8");

  console.log("✅ Skill criada com sucesso!");
  console.log(`📦 Nome: ${skillName}`);
  console.log(`📊 Tipo: ${skillType}`);
  console.log(`📂 Localização: ${skillFile}`);

  return { skillName, skillFile, skillContent, skillType };
}

// Executar
const args = process.argv.slice(2);
if (!args.length) {
  console.error("Uso: node ideia-para-skill.js <arquivo>");
  process.exit(1);
}

transformDocToSkill(args[0]).catch((error) => {
  console.error("❌ Erro:", error.message);
  process.exit(1);
});
