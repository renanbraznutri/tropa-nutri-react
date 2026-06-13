# 🚀 Tropa do Nutri Performance - React Version

Versão refatorada em React do sistema de performance para atletas.

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Claude Code (para desenvolvimento com IA)

## 🛠️ Setup Inicial

### 1. Clone o repositório
```bash
git clone seu-repo-url
cd tropa-nutri-react
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute em desenvolvimento
```bash
npm run dev
```

Acesse: http://localhost:5173

## 📚 Estrutura do Projeto

```
src/
├── components/        # Componentes reutilizáveis
├── pages/            # Páginas principais
├── config/           # Configurações (Supabase, etc)
├── styles/           # CSS modular
├── utils/            # Funções utilitárias
├── App.jsx           # Componente principal
└── main.jsx          # Entry point
```

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local`:
```
VITE_SUPABASE_URL=https://naaiycyifdkqwbqllvrm.supabase.co
VITE_SUPABASE_KEY=seu-key-aqui
```

## 🚀 Usando Claude Code

```bash
# Instale Claude Code globalmente
npm install -g @anthropic-ai/claude-code

# Inicie Claude Code no projeto
claude-code start

# Claude vai ajudar com:
# - Refatoração de componentes
# - Adição de features
# - Testes
# - Build e deploy
```

## 📦 Build para Produção

```bash
npm run build
```

Arquivos otimizados em `dist/`

## 🌐 Deploy no Cloudflare Pages

```bash
# Build
npm run build

# Deploy (instale Wrangler primeiro)
npm install -g wrangler
wrangler pages deploy dist
```

## 🗄️ Banco de Dados

Supabase já está configurado e conectado. Todas as tabelas existentes continuam funcionando.

## 📝 Próximos Passos

1. ✅ Refatorar Páginas de Pacientes
2. ✅ Refatorar Página de Repasses
3. ✅ Refatorar Dashboard
4. ✅ Adicionar features novas (Anexos, Documentos, etc)

---

**Desenvolvido com React + Vite + Supabase**
