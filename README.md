# Ideia Para Skill

Transforma documentos em Skills estruturadas com **detecção automática de arquitetura**.

## O que é Novo

- ✅ Detecção inteligente de complexidade
- ✅ Arquitetura automática: PADRÃO → MODULAR → EXECUTÁVEL → COMPOSTA → MCP
- ✅ Estrutura gerada conforme tipo de skill
- ✅ Referências, exemplos, código, handlers criados automaticamente

## Arquiteturas

### PADRÃO

Processo simples em um SKILL.md

- Conteúdo linear e claro
- Menos de 500 palavras
- Sem múltiplas camadas
- Sem código

### MODULAR

Metodologia complexa com /references e /examples

- Múltiplas camadas conceituais
- Mais de 800 palavras
- Subcamadas e referências
- Exemplos organizados em pasta

### EXECUTÁVEL

Skill com código (index.js/py + package.json)

- Contém scripts ou funções
- Lógica programática executável
- Suporte a JavaScript e Python

### COMPOSTA

Pipeline com sub-skills em /\_sub/

- Múltiplos passos sequenciais
- Cada passo chama o próximo
- Orquestração central

### MCP

Com integrações externas em /mcp/ e /handlers/

- Integra APIs e serviços (ASTRA, TOM, etc)
- Handlers especializados por integracao
- MCP Server central

## Uso

```bash
node ideia-para-skill.js seu-documento.txt
```

A aplicação:

1. Analisa o conteúdo
2. Detecta arquitetura apropriada
3. Gera nome estratégico
4. Cria estrutura de diretórios
5. Salva em `/mnt/skills/user/{nome}/`

## Exemplo de Saída

```
✅ Skill criada com sucesso!

📦 Nome: cliente-para-retrato
📝 Título: Leitura Estratégica do Cliente
🏗️  Arquitetura: MODULAR
💡 Lógica: Transforma perfil caótico em mapa estruturado

📂 Localização: /mnt/skills/user/cliente-para-retrato/

📋 Estrutura criada:
   ├── SKILL.md
   ├── references/
   │   ├── arquetipo-principal.md
   │   ├── mapa-de-bloqueios.md
   │   └── examples/
   │       ├── case-ceo-tech.md
   │       └── case-criador-digital.md

🔧 Triggers:
   • cliente confuso sobre sua direção
   • precisa mapear identidade
   • identidade fragmentada

✨ A Skill está pronta para usar!
```

## Setup Rápido

### 1. Tenha Node.js instalado

```bash
node --version  # deve ser v14+
```

### 2. Configure a API Key

```bash
export ANTHROPIC_API_KEY="sua-chave-aqui"
```

### 3. Clone e instale

```bash
git clone https://github.com/anaretore-thecosmo/ideia-para-skill
cd ideia-para-skill
npm install
```

### 4. Use

```bash
node ideia-para-skill.js seu-documento.txt
```

## Como Funciona

A ferramenta envia seu documento para Claude API (Sonnet 4) que:

1. **Analisa** complexidade, camadas, código, integrações
2. **Decide** qual arquitetura usar
3. **Gera** nome estratégico (problema → solução)
4. **Retorna** JSON estruturado com todos os metadados
5. **Cria** diretórios e arquivos conforme o tipo

## Critério de Decisão

| Tipo           | Quando Usar                          | Resultado                              |
| -------------- | ------------------------------------ | -------------------------------------- |
| **PADRÃO**     | Simples, <500 palavras               | SKILL.md só                            |
| **MODULAR**    | Complexo, >800 palavras, referências | SKILL.md + /references/                |
| **EXECUTÁVEL** | Tem código, scripts                  | SKILL.md + index.js/.py + package.json |
| **COMPOSTA**   | Pipeline, múltiplos passos           | SKILL.md + /\_sub/                     |
| **MCP**        | APIs externas, integrações           | SKILL.md + /mcp/ + /handlers/          |

## Troubleshooting

### ❌ "ANTHROPIC_API_KEY não definida"

```bash
export ANTHROPIC_API_KEY="sua-chave-aqui"
echo $ANTHROPIC_API_KEY  # verifique
```

### ❌ "Arquivo não encontrado"

Use o caminho completo:

```bash
node ideia-para-skill.js /caminho/completo/documento.txt
```

### ❌ "Arquivo vazio"

O arquivo precisa ter conteúdo. Salve e tente novamente.

## GitHub

https://github.com/anaretore-thecosmo/ideia-para-skill

## Versão

**v2.0.0** — Detecção inteligente de arquitetura
**Atualizado:** Abril 2026
