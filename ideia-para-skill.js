#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    IDEIA PARA SKILL v3                        ║
║     Orquestradora de Skills (sem chamada API)                 ║
╚════════════════════════════════════════════════════════════════╝

Uso:
  node ideia-para-skill.js skill-data.json

Input esperado:
  {
    "name": "skill-nome",
    "title": "Título da Skill",
    "description": "Descrição",
    "creator": "Nome do Criador",
    "creator_signature": "© Assinatura",
    "content": "Conteúdo markdown",
    "triggers": ["trigger1", "trigger2"],
    "examples": [{"input": "...", "expected_output": "..."}],
    "architecture": "PADRÃO|MODULAR|EXECUTÁVEL|COMPOSTA|MCP",
    "architecture_reasoning": "Por que essa arquitetura",
    "modular_structure": {...},
    "executable_structure": {...},
    "composite_structure": {...},
    "mcp_structure": {...}
  }

Saída:
  ✅ Skill criada e pushada para GitHub
  📦 Nome: skill-nome
  🔗 GitHub: https://github.com/anaretore-thecosmo/skills/tree/main/skill-nome
  📂 Arquivo: skill-nome/SKILL.md
  `);
  process.exit(0);
}

const inputFile = args[0];

if (!fs.existsSync(inputFile)) {
  console.error(`❌ Arquivo não encontrado: ${inputFile}`);
  process.exit(1);
}

let skillData;
try {
  const content = fs.readFileSync(inputFile, "utf-8");
  skillData = JSON.parse(content);
} catch (err) {
  console.error(`❌ Erro ao ler/parsear JSON: ${err.message}`);
  process.exit(1);
}

// Validar campos obrigatórios
const required = [
  "name",
  "title",
  "description",
  "creator",
  "architecture",
  "content",
];
const missing = required.filter((f) => !skillData[f]);
if (missing.length > 0) {
  console.error(`❌ Campos obrigatórios faltando: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`\n📦 Processando skill: ${skillData.name}`);

const createSkillDirectory = (skillData) => {
  // Usar diretório local ou /mnt/skills/user (VPS)
  const baseDir = fs.existsSync("/mnt/skills/user")
    ? "/mnt/skills/user"
    : path.resolve("./skills");
  const skillDir = path.join(baseDir, skillData.name);

  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir, { recursive: true });
  }

  // Gerar SKILL.md
  const skillMd = `---
name: ${skillData.name}
description: ${skillData.description}
architecture: ${skillData.architecture}
creator: ${skillData.creator}
created: ${new Date().toISOString().split("T")[0]}
---

# ${skillData.title}

**Nome Estratégico:** ${skillData.name}
**Criador:** ${skillData.creator}
**Arquitetura:** ${skillData.architecture}
**Lógica:** ${skillData.name_reasoning || "Estrutura automática"}

---

${skillData.content}

${
  skillData.examples && skillData.examples.length > 0
    ? `
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
`
    : ""
}

${
  skillData.triggers && skillData.triggers.length > 0
    ? `
## Triggers

Use esta skill quando o usuário mencionar:
${skillData.triggers.map((t) => `- ${t}`).join("\n")}
`
    : ""
}

---

**Criador:** ${skillData.creator}
${skillData.creator_signature || ""}
`;

  fs.writeFileSync(path.join(skillDir, "SKILL.md"), skillMd);

  // MODULAR
  if (skillData.architecture === "MODULAR" && skillData.modular_structure) {
    const refDir = path.join(skillDir, "references");
    fs.mkdirSync(refDir, { recursive: true });

    skillData.modular_structure.reference_files?.forEach((file) => {
      fs.writeFileSync(path.join(refDir, file), `# ${file}\n\n[Conteúdo]\n`);
    });

    if (skillData.modular_structure.has_examples) {
      const exDir = path.join(refDir, "examples");
      fs.mkdirSync(exDir, { recursive: true });
      skillData.modular_structure.example_files?.forEach((file) => {
        fs.writeFileSync(path.join(exDir, file), `# ${file}\n\n[Exemplo]\n`);
      });
    }
  }

  // EXECUTÁVEL
  if (
    skillData.architecture === "EXECUTÁVEL" &&
    skillData.executable_structure?.has_code
  ) {
    const ext =
      skillData.executable_structure.language === "python" ? "py" : "js";
    const indexPath = path.join(skillDir, `index.${ext}`);
    fs.writeFileSync(
      indexPath,
      skillData.executable_structure.code_snippet || "// Código\n",
    );

    const pkgPath = path.join(skillDir, "package.json");
    if (!fs.existsSync(pkgPath)) {
      fs.writeFileSync(
        pkgPath,
        JSON.stringify(
          {
            name: skillData.name,
            version: "1.0.0",
            description: skillData.title,
            keywords: skillData.triggers || [],
          },
          null,
          2,
        ),
      );
    }
  }

  // COMPOSTA
  if (skillData.architecture === "COMPOSTA" && skillData.composite_structure) {
    const subDir = path.join(skillDir, "_sub");
    fs.mkdirSync(subDir, { recursive: true });

    skillData.composite_structure.sub_skills?.forEach((sub) => {
      fs.writeFileSync(
        path.join(subDir, `${sub}.md`),
        `# ${sub}\n\n[Conteúdo]\n`,
      );
    });
  }

  // MCP
  if (skillData.architecture === "MCP" && skillData.mcp_structure) {
    const mcpDir = path.join(skillDir, "mcp");
    fs.mkdirSync(mcpDir, { recursive: true });

    fs.writeFileSync(
      path.join(mcpDir, "server.js"),
      `// MCP Server\n// Integrações: ${skillData.mcp_structure.integrations?.join(", ") || "N/A"}\n`,
    );

    const handDir = path.join(skillDir, "handlers");
    fs.mkdirSync(handDir, { recursive: true });

    skillData.mcp_structure.integrations?.forEach((int) => {
      fs.writeFileSync(
        path.join(handDir, `${int.toLowerCase()}-handler.js`),
        `// Handler para ${int}\n`,
      );
    });
  }

  return skillDir;
};

const pushToGitHub = (skillDir, skillName) => {
  try {
    // Verificar se é repo git
    if (!fs.existsSync(path.join(skillDir, "..", ".git"))) {
      console.log("⚠️  Não é repositório git. Pulando push...");
      return null;
    }

    const parentDir = path.dirname(skillDir);

    // Git add
    execSync(`cd "${parentDir}" && git add "${skillName}/" 2>/dev/null`, {
      stdio: "pipe",
    });

    // Git commit
    try {
      execSync(
        `cd "${parentDir}" && git commit -m "feat: adicionar skill ${skillName}" 2>/dev/null`,
        { stdio: "pipe" },
      );
    } catch {
      // Já commitado ou nada mudou
    }

    // Git push
    execSync(`cd "${parentDir}" && git push origin main 2>/dev/null`, {
      stdio: "pipe",
    });

    return {
      repository: "https://github.com/anaretore-thecosmo/skills",
      branch: "main",
      path: `${skillName}/SKILL.md`,
    };
  } catch (err) {
    console.log("⚠️  Não foi possível fazer push para GitHub");
    return null;
  }
};

// Executar
try {
  const skillDir = createSkillDirectory(skillData);
  const gitInfo = pushToGitHub(skillDir, skillData.name);

  console.log(`\n✅ Skill criada com sucesso!\n`);
  console.log(`📦 Nome: ${skillData.name}`);
  console.log(`📝 Título: ${skillData.title}`);
  console.log(`🏗️  Arquitetura: ${skillData.architecture}`);
  console.log(`👤 Criador: ${skillData.creator}\n`);
  console.log(`📂 Localização: ${skillDir}`);

  if (gitInfo) {
    console.log(`\n🔗 GitHub:`);
    console.log(`   Repository: ${gitInfo.repository}`);
    console.log(`   Branch: ${gitInfo.branch}`);
    console.log(`   Arquivo: ${gitInfo.path}\n`);
  }

  // Saída JSON para o agente orquestrador
  console.log(
    JSON.stringify(
      {
        success: true,
        skill: {
          name: skillData.name,
          title: skillData.title,
          creator: skillData.creator,
          architecture: skillData.architecture,
          path: skillDir,
          github: gitInfo || null,
        },
      },
      null,
      2,
    ),
  );
} catch (err) {
  console.error(`\n❌ Erro: ${err.message}\n`);
  process.exit(1);
}
