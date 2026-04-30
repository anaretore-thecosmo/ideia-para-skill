#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function transformDocToSkill(filePath) {
  // Validar arquivo
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${filePath}`);
    process.exit(1);
  }

  // Ler conteúdo
  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content.trim()) {
    console.error('❌ Arquivo vazio');
    process.exit(1);
  }

  console.log('🔄 Analisando documento...');

  // Enviar para Claude
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6-20250514',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Você é especialista em estruturação de Skills. Analise este documento e crie uma Skill estruturada.

DOCUMENTO:
${content}

INSTRUÇÕES:
1. Identifique o core do processo/metodologia
2. Crie um nome estratégico (kebab-case, 2-3 palavras, sem "skill" ou prefixos genéricos)
3. Estruture como SKILL.md com:
   - Nome
   - Descrição (1 linha)
   - O que faz (bullets)
   - Como usar (exemplo prático)
   - Quando usar
   - Resultado esperado

RESPONDA APENAS COM A ESTRUTURA SKILL.MD PURA, SEM EXPLICAÇÕES.
Comece direto com # Nome da Skill`,
      },
    ],
  });

  const skillContent = message.content[0].type === 'text' ? message.content[0].text : '';

  // Extrair nome da skill (primeira linha com #)
  const nameMatch = skillContent.match(/^#\s+(.+?)$/m);
  if (!nameMatch) {
    console.error('❌ Não foi possível extrair nome da skill');
    process.exit(1);
  }

  const skillName = nameMatch[1]
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  // Determinar caminho de saída
  const skillDir = path.join('C:/Users/Ana/Downloads/Ana/skills', skillName);
  const skillFile = path.join(skillDir, 'SKILL.md');

  // Criar diretório se não existir
  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir, { recursive: true });
  }

  // Salvar arquivo
  fs.writeFileSync(skillFile, skillContent, 'utf-8');

  console.log('✅ Skill criada com sucesso!');
  console.log(`📦 Nome: ${skillName}`);
  console.log(`📂 Localização: ${skillFile}`);

  return { skillName, skillFile, skillContent };
}

// Executar
const args = process.argv.slice(2);
if (!args.length) {
  console.error('Uso: node ideia-para-skill.js <arquivo>');
  process.exit(1);
}

transformDocToSkill(args[0]).catch((error) => {
  console.error('❌ Erro:', error.message);
  process.exit(1);
});
