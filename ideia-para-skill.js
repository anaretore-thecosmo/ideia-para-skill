#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    IDEIA PARA SKILL                           ║
║     Transforma documentos em Skills estruturadas              ║
║     COM ARQUITETURA INTELIGENTE                               ║
╚════════════════════════════════════════════════════════════════╝

Uso:
  node ideia-para-skill.js <arquivo.txt>
  node ideia-para-skill.js <arquivo.md>

A aplicação detecta automaticamente:
  • Complexidade do conteúdo
  • Necessidade de modularização
  • Presença de código executável
  • Múltiplos passos / workflows
  • Integrações externas

E cria a estrutura apropriada!
  `);
  process.exit(0);
}

let inputFile = args[0];

if (!path.isAbsolute(inputFile)) {
  inputFile = path.resolve(process.cwd(), inputFile);
}

console.log(`\n🔍 Procurando arquivo: ${inputFile}`);

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Arquivo não encontrado: ${inputFile}`);
  console.error(
    `\n💡 Dica: use o caminho completo ou coloque o arquivo no diretório atual`,
  );
  console.error(`   Diretório atual: ${process.cwd()}\n`);
  process.exit(1);
}

let content;
try {
  content = fs.readFileSync(inputFile, "utf-8");
} catch (err) {
  console.error(`❌ Erro ao ler arquivo: ${err.message}`);
  process.exit(1);
}

if (!content.trim()) {
  console.error(`❌ Arquivo vazio: ${inputFile}`);
  process.exit(1);
}

console.log(`⏳ Analisando ${inputFile}...\n`);

const callClaude = async () => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3500,
      messages: [
        {
          role: "user",
          content: `Você é um especialista em criar Skills com nomes estratégicos E em arquitetura de sistemas.

Analise este conteúdo e DECIDA QUAL ARQUITETURA USAR:

${content}

DEPOIS, responda APENAS em JSON (sem markdown, sem preamble):

{
  "name": "nome-estrategico-em-kebab-case",
  "name_reasoning": "Por que esse nome comunica problema + solução",
  "title": "Título da Skill",
  "description": "Descrição com triggers",
  "triggers": ["trigger1", "trigger2", "trigger3"],
  "content": "Instruções em markdown (300-500 palavras)",
  "examples": [
    {
      "input": "Exemplo de entrada",
      "expected_output": "Saída esperada"
    }
  ],
  "architecture": "PADRÃO|MODULAR|EXECUTÁVEL|COMPOSTA|MCP",
  "architecture_reasoning": "Por que essa arquitetura foi escolhida",
  "modular_structure": {
    "has_references": true/false,
    "has_examples": true/false,
    "has_scripts": true/false,
    "reference_files": ["arquivo1.md", "arquivo2.md"],
    "example_files": ["case-1.md", "case-2.md"]
  },
  "executable_structure": {
    "has_code": true/false,
    "language": "javascript|python|typescript",
    "code_snippet": "código principal se houver"
  },
  "composite_structure": {
    "is_pipeline": true/false,
    "sub_skills": ["skill-1", "skill-2", "skill-3"]
  },
  "mcp_structure": {
    "requires_mcp": true/false,
    "integrations": ["ASTRA", "TOM", "API"]
  }
}

CRITÉRIO DE DECISÃO DE ARQUITETURA:

PADRÃO (simples):
- Processo linear e claro
- Menos de 500 palavras
- Sem múltiplas camadas
- Sem código
→ Resultado: Um SKILL.md só

MODULAR (complexa com referências):
- Metodologia com múltiplas camadas
- Mais de 800 palavras
- Tem subcamadas, conceitos, referências
- Exemplos que precisam ser organizados
→ Resultado: SKILL.md + /references/ + /examples/

EXECUTÁVEL (com código):
- Contém código, scripts, funções
- Lógica programática
- Precisa ser executado/calculado
→ Resultado: SKILL.md + index.js (ou .py) + package.json

COMPOSTA (pipeline/workflow):
- Múltiplos passos sequenciais
- Um passo chama outro
- Transformação em fases
- Resultado de um passo = input do próximo
→ Resultado: SKILL.md orquestradora + /_sub/ com sub-skills

MCP (com integrações externas):
- Precisa de APIs, serviços externos
- ASTRA, TOM, banco de dados, Telegram, etc
- Integrações MCP
→ Resultado: SKILL.md + /mcp/ + handlers/

IMPORTANTE:
- Nome estratégico SEMPRE (problema → solução)
- Architecture é obrigatório
- Detalhe os arquivos necessários
- Seja honesto: se é simples, diga que é PADRÃO`,
        },
      ],
    });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      reject(
        new Error(
          "ANTHROPIC_API_KEY não definida. Configure a variável de ambiente.",
        ),
      );
      return;
    }

    const options = {
      hostname: "api.anthropic.com",
      port: 443,
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            reject(new Error(`API Error: ${response.error.message}`));
            return;
          }

          const contentBlock = response.content[0];
          if (contentBlock.type !== "text") {
            reject(new Error("Resposta inesperada da API"));
            return;
          }

          const skillData = JSON.parse(contentBlock.text);
          resolve(skillData);
        } catch (err) {
          reject(new Error(`Erro ao processar resposta: ${err.message}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.write(payload);
    req.end();
  });
};

const createSkillDirectory = (skillName, architecture, skillData) => {
  const skillDir = `/mnt/skills/user/${skillName}`;

  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir, { recursive: true });
  }

  // Cria o SKILL.md principal
  const skillMd = `---
name: ${skillData.name}
description: ${skillData.description}
architecture: ${architecture}
---

# ${skillData.title}

**Nome Estratégico:** ${skillData.name}
**Lógica do Nome:** ${skillData.name_reasoning}
**Arquitetura:** ${architecture} (${skillData.architecture_reasoning})

${skillData.content}

## Exemplos de Uso

${skillData.examples
  .map(
    (ex, i) => `### Exemplo ${i + 1}

**Entrada:**
\`\`\`
${ex.input}
\`\`\`

**Saída esperada:**
\`\`\`
${ex.expected_output}
\`\`\``,
  )
  .join("\n\n")}

## Triggers

Use esta skill quando o usuário mencionar:
${skillData.triggers.map((t) => `- ${t}`).join("\n")}
`;

  fs.writeFileSync(path.join(skillDir, "SKILL.md"), skillMd);

  // Cria estrutura MODULAR
  if (architecture === "MODULAR") {
    const refDir = path.join(skillDir, "references");
    fs.mkdirSync(refDir, { recursive: true });

    if (
      skillData.modular_structure.reference_files &&
      skillData.modular_structure.reference_files.length > 0
    ) {
      skillData.modular_structure.reference_files.forEach((file) => {
        const filePath = path.join(refDir, file);
        fs.writeFileSync(
          filePath,
          `# ${file}\n\n[Adicione conteúdo de referência aqui]\n`,
        );
      });
    }

    if (skillData.modular_structure.has_examples) {
      const examplesDir = path.join(refDir, "examples");
      fs.mkdirSync(examplesDir, { recursive: true });

      if (
        skillData.modular_structure.example_files &&
        skillData.modular_structure.example_files.length > 0
      ) {
        skillData.modular_structure.example_files.forEach((file) => {
          const filePath = path.join(examplesDir, file);
          fs.writeFileSync(filePath, `# ${file}\n\n[Adicione exemplo aqui]\n`);
        });
      }
    }
  }

  // Cria estrutura EXECUTÁVEL
  if (architecture === "EXECUTÁVEL") {
    if (skillData.executable_structure.has_code) {
      const indexFile = `index.${skillData.executable_structure.language === "python" ? "py" : "js"}`;
      const indexPath = path.join(skillDir, indexFile);
      fs.writeFileSync(
        indexPath,
        skillData.executable_structure.code_snippet || "// Código principal\n",
      );
    }

    if (!fs.existsSync(path.join(skillDir, "package.json"))) {
      const packageJson = {
        name: skillData.name,
        version: "1.0.0",
        description: skillData.title,
        main: "index.js",
        keywords: skillData.triggers,
      };
      fs.writeFileSync(
        path.join(skillDir, "package.json"),
        JSON.stringify(packageJson, null, 2),
      );
    }
  }

  // Cria estrutura COMPOSTA
  if (architecture === "COMPOSTA") {
    const subDir = path.join(skillDir, "_sub");
    fs.mkdirSync(subDir, { recursive: true });

    if (
      skillData.composite_structure.sub_skills &&
      skillData.composite_structure.sub_skills.length > 0
    ) {
      skillData.composite_structure.sub_skills.forEach((subSkill) => {
        const subSkillPath = path.join(subDir, `${subSkill}.md`);
        fs.writeFileSync(
          subSkillPath,
          `# ${subSkill}\n\n[Adicione conteúdo da sub-skill aqui]\n`,
        );
      });
    }
  }

  // Cria estrutura MCP
  if (architecture === "MCP") {
    const mcpDir = path.join(skillDir, "mcp");
    fs.mkdirSync(mcpDir, { recursive: true });

    const serverPath = path.join(mcpDir, "server.js");
    fs.writeFileSync(
      serverPath,
      `// MCP Server\n// Integrações: ${skillData.mcp_structure.integrations.join(", ")}\n`,
    );

    const handlersDir = path.join(skillDir, "handlers");
    fs.mkdirSync(handlersDir, { recursive: true });

    skillData.mcp_structure.integrations.forEach((integration) => {
      const handlerPath = path.join(
        handlersDir,
        `${integration.toLowerCase()}-handler.js`,
      );
      fs.writeFileSync(handlerPath, `// Handler para ${integration}\n`);
    });
  }

  return skillDir;
};

(async () => {
  try {
    const skillData = await callClaude();
    const architecture = skillData.architecture;

    const skillDir = createSkillDirectory(
      skillData.name,
      architecture,
      skillData,
    );

    console.log(`\n✅ Skill criada com sucesso!\n`);
    console.log(`📦 Nome: ${skillData.name}`);
    console.log(`📝 Título: ${skillData.title}`);
    console.log(`🏗️  Arquitetura: ${architecture}`);
    console.log(`💡 Lógica: ${skillData.name_reasoning}\n`);
    console.log(`📂 Localização: ${skillDir}\n`);

    console.log(`📋 Estrutura criada:`);
    if (architecture === "PADRÃO") {
      console.log(`   ├── SKILL.md`);
    } else if (architecture === "MODULAR") {
      console.log(`   ├── SKILL.md`);
      console.log(`   ├── references/`);
      console.log(
        `   │   ├── ${skillData.modular_structure.reference_files.join("\n   │   ├── ")}`,
      );
      if (skillData.modular_structure.has_examples) {
        console.log(`   │   └── examples/`);
      }
    } else if (architecture === "EXECUTÁVEL") {
      console.log(`   ├── SKILL.md`);
      console.log(
        `   ├── index.${skillData.executable_structure.language === "python" ? "py" : "js"}`,
      );
      console.log(`   └── package.json`);
    } else if (architecture === "COMPOSTA") {
      console.log(`   ├── SKILL.md (orquestradora)`);
      console.log(`   └── _sub/`);
      console.log(
        `       ├── ${skillData.composite_structure.sub_skills.join("\n       ├── ")}`,
      );
    } else if (architecture === "MCP") {
      console.log(`   ├── SKILL.md`);
      console.log(`   ├── mcp/`);
      console.log(`   │   └── server.js`);
      console.log(`   └── handlers/`);
      console.log(
        `       ├── ${skillData.mcp_structure.integrations.map((i) => i.toLowerCase() + "-handler.js").join("\n       ├── ")}`,
      );
    }

    console.log(`\n🔧 Triggers:`);
    skillData.triggers.forEach((t) => console.log(`   • ${t}`));
    console.log(`\n✨ A Skill está pronta para usar!\n`);
  } catch (err) {
    console.error(`\n❌ Erro ao criar Skill: ${err.message}\n`);
    process.exit(1);
  }
})();
