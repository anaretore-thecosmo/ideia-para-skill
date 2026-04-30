# Ideia Para Skill v3

Orquestradora de skills — **processa estruturas sem chamar APIs**.

## O que é

Uma ferramenta que **recebe JSON com a estrutura da skill** (já analisado por um agente) e:

1. ✅ Cria diretórios e arquivos conforme arquitetura
2. ✅ Faz commit automático para GitHub
3. ✅ Retorna URL do repositório + caminho do arquivo

## Fluxo

```
Agente (Haiku/Sonnet/Opus)
    ↓
Analisa documento
    ↓
Gera JSON estruturado
    ↓
Passa para ideia-para-skill
    ↓
ideia-para-skill processa
    ↓
Commit + Push → GitHub
    ↓
Retorna GitHub URL + Caminho
```

## Arquiteturas Suportadas

### PADRÃO

- Um SKILL.md só
- Simples, linear, <500 palavras
- Sem código ou múltiplas camadas

### MODULAR

- SKILL.md + /references/ + /examples/
- Metodologia complexa, >800 palavras
- Múltiplas subcamadas

### EXECUTÁVEL

- SKILL.md + index.js/.py + package.json
- Contém código executável
- JavaScript ou Python

### COMPOSTA

- SKILL.md (orquestradora) + /\_sub/
- Pipeline com múltiplos passos
- Cada passo chama o próximo

### MCP

- SKILL.md + /mcp/ + /handlers/
- Integrações externas (ASTRA, TOM, APIs)
- Server MCP centralizado

## Uso

### 1. Gere JSON da skill (com seu agente favorito)

```json
{
  "name": "cliente-para-retrato",
  "title": "Leitura Estratégica do Cliente",
  "description": "Mapeia identidade confusa em estrutura clara",
  "creator": "Ana Retore",
  "creator_signature": "© Ana Retore | The Cosmo",
  "architecture": "MODULAR",
  "content": "# Conteúdo...",
  "triggers": ["cliente confuso", "identidade fragmentada"],
  "examples": [
    {
      "input": "Cliente com background múltiplo...",
      "expected_output": "Mapa estruturado com 3 pilares..."
    }
  ],
  "modular_structure": {
    "has_references": true,
    "reference_files": ["arquetipo.md", "bloqueios.md"],
    "has_examples": true,
    "example_files": ["case-ceo.md", "case-creator.md"]
  }
}
```

### 2. Processe com ideia-para-skill

```bash
node ideia-para-skill.js skill-data.json
```

### 3. Resultado

```
✅ Skill criada com sucesso!

📦 Nome: cliente-para-retrato
📝 Título: Leitura Estratégica do Cliente
🏗️  Arquitetura: MODULAR
👤 Criador: Ana Retore

📂 Localização: /mnt/skills/user/cliente-para-retrato

🔗 GitHub:
   Repository: https://github.com/anaretore-thecosmo/skills
   Branch: main
   Arquivo: cliente-para-retrato/SKILL.md
```

## Setup

### Local

```bash
git clone https://github.com/anaretore-thecosmo/ideia-para-skill
cd ideia-para-skill
npm install
node ideia-para-skill.js skill.json
```

### Na VPS

```bash
# Já instalado em /opt/ideia-para-skill
/opt/ideia-para-skill/run.sh skill.json
```

## Como Funciona

1. **Input**: JSON com estrutura da skill (já analisado)
2. **Processamento**:
   - Cria diretórios conforme arquitetura
   - Gera SKILL.md com metadados
   - Cria arquivos secundários (references/, handlers/, etc)
   - Adiciona assinatura do criador
3. **Output**:
   - Commit automático para GitHub
   - Retorna JSON com URLs e caminhos
   - SKILL.md pronto para usar

## Campos Obrigatórios no JSON

```json
{
  "name": "skill-em-kebab-case",
  "title": "Título Legível",
  "description": "Uma linha descritiva",
  "creator": "Nome do Criador",
  "architecture": "PADRÃO|MODULAR|EXECUTÁVEL|COMPOSTA|MCP",
  "content": "Conteúdo markdown da skill"
}
```

## Campos Opcionais

```json
{
  "name_reasoning": "Por que esse nome",
  "creator_signature": "© Assinatura Profissional",
  "triggers": ["trigger1", "trigger2"],
  "examples": [{"input": "...", "expected_output": "..."}],
  "modular_structure": {...},
  "executable_structure": {...},
  "composite_structure": {...},
  "mcp_structure": {...}
}
```

## Integração com Agentes

Para usar com Claude Code (qualquer modelo):

```bash
# 1. Agente analisa documento
# 2. Gera JSON estruturado
# 3. Salva em skill-data.json

# 4. Chama ideia-para-skill
node ideia-para-skill.js skill-data.json

# 5. Recebe resultado com GitHub URL
```

## Sem Custo Direto

✅ Não chama APIs
✅ Não custa créditos (a análise é feita pelo agente que te chamar)
✅ Apenas orquestração e persistência

## GitHub

https://github.com/anaretore-thecosmo/ideia-para-skill

## Versão

**v3.0.0** — Orquestradora sem APIs (processa JSON)
**Atualizado:** Abril 2026
