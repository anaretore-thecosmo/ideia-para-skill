# Ideia Para Skill - CLI

Transforma documentos em Skills estruturadas com **um comando**.

## Setup Rápido

### 1. Tenha Node.js instalado
```bash
node --version  # deve ser v14+
```

### 2. Configure a API Key

#### Opção A: Variável de Ambiente (recomendado)
```bash
export ANTHROPIC_API_KEY="sua-chave-aqui"
```

#### Opção B: No seu `.bashrc` ou `.zshrc` (permanente)
```bash
echo 'export ANTHROPIC_API_KEY="sua-chave-aqui"' >> ~/.bashrc
source ~/.bashrc
```

#### Opção C: Em Claude Code (automático)
Se usar Claude Code na sua VPS, a chave já está disponível.

## Como Usar

### Exemplo 1: Arquivo na pasta atual
```bash
node ideia-para-skill.js meu-processo.txt
```

### Exemplo 2: Caminho completo
```bash
node ideia-para-skill.js /home/ana/documentos/plano-a.md
```

### Exemplo 3: Qualquer extensão
```bash
node ideia-para-skill.js documento.txt
node ideia-para-skill.js transcrição.md
node ideia-para-skill.js anotações
```

## O que Acontece

1. Lê o arquivo
2. Envia para Claude Sonnet analisar
3. Claude gera a Skill com **nome estratégico**
4. Salva automaticamente em `/mnt/skills/user/[nome]/SKILL.md`
5. Mostra resultado na tela

## Exemplo de Uso Completo

```bash
# Crie um arquivo com sua ideia
echo "Meu processo de diagnóstico de cliente..." > cliente-para-retrato.txt

# Execute o script
node ideia-para-skill.js cliente-para-retrato.txt

# Resultado:
# ✅ Skill criada com sucesso!
# 📦 Nome: cliente-para-retrato
# 📂 Localização: /mnt/skills/user/cliente-para-retrato/SKILL.md
```

## Troubleshooting

### ❌ "Arquivo não encontrado"
- Verifique o caminho do arquivo
- Use o caminho completo se necessário

```bash
# Errado (se não estiver na pasta)
node ideia-para-skill.js documento.txt

# Certo
node ideia-para-skill.js /home/ana/documentos/documento.txt
```

### ❌ "ANTHROPIC_API_KEY não definida"
- Configure a variável de ambiente:

```bash
export ANTHROPIC_API_KEY="sua-chave-aqui"
```

- Verifique se foi configurada:
```bash
echo $ANTHROPIC_API_KEY
```

### ❌ "Arquivo vazio"
- O arquivo precisa ter conteúdo

## Architetura

```
seu-arquivo.txt
       ↓
Node.js lê arquivo
       ↓
Envia para Claude API
       ↓
Claude gera Skill com nome estratégico
       ↓
Script salva em /mnt/skills/user/
       ↓
Skill pronta para usar
```

## Onde as Skills Ficam

Após executar, a Skill fica em:
```
/mnt/skills/user/
├── ideia-para-skill/
│   └── SKILL.md
├── cliente-para-retrato/
│   └── SKILL.md
├── caos-para-ordem/
│   └── SKILL.md
```

Você pode referenciar em qualquer prompt:
```
Use a Skill ideia-para-skill para...
Use a Skill cliente-para-retrato para...
```

## Exemplos de Input → Output

### Input 1: Processo Plano A
**Arquivo:** `plano-a.txt`
```
Leio astrologia, mapeia conflitos, extraio 3 pilares, estruturo roteiro...
```

**Output:**
```
Skill: cliente-para-roteiro-vida
📂 /mnt/skills/user/cliente-para-roteiro-vida/SKILL.md
```

### Input 2: Transcrição
**Arquivo:** `tom-strategy.md`
```
[Transcrição de áudio explicando TOM]
```

**Output:**
```
Skill: ideia-para-tom
📂 /mnt/skills/user/ideia-para-tom/SKILL.md
```

### Input 3: Metodologia
**Arquivo:** `matriz-arquetipica.txt`
```
Explicação completa da Matriz com 12 arquétipos...
```

**Output:**
```
Skill: cliente-para-arquetipo
📂 /mnt/skills/user/cliente-para-arquetipo/SKILL.md
```

## Performance

- Tempo de processamento: ~10-20 segundos
- Limite de tamanho de arquivo: 50KB (suficiente para a maioria dos documentos)
- Custo: ~0.01-0.05 USD por Skill criada

## Próximos Passos

Após criar a Skill:
1. Revise o arquivo gerado se quiser
2. Comece a usar em seus prompts
3. Se precisar ajustar, edite o SKILL.md manualmente

---

**Versão:** 1.0  
**Atualizado:** Abril 2026  
**Status:** Pronto para produção
