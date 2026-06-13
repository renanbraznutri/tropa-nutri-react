# 🚀 Tropa do Nutri - PROJECT BRIEF

## 📋 RESUMO DO PROJETO

Sistema de gestão de performance para atletas e profissionais de nutrição. Refatorado de HTML vanilla para React + Vite.

---

## 🏗️ STACK ATUAL

- **Frontend:** React 18 + Vite
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Deploy:** Cloudflare Pages
- **Linguagem:** JavaScript/JSX
- **Package Manager:** npm

---

## 🔑 CREDENCIAIS SUPABASE

```javascript
Project ID: naaiycyifdkqwbqllvrm
URL: https://naaiycyifdkqwbqllvrm.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYWl5Y3lpZmRrcXdibGxybyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzEyMzQ2MTAwLCJleHAiOjE4NzcxNTQ1MDB9.eD9mKPfnLb3xHexHVVxU7Z3P5n7pN1j4i8mFwQpZWBo
```

---

## 📦 TABELAS DO BANCO DE DADOS

### **PACIENTES**
- `id` (uuid)
- `nome` (text)
- `email` (text)
- `telefone` (text)
- `categoria` (text) - Amador/Profissional/Clínico/Premium
- `status` (text) - Ativo/Inativo
- `created_at` (timestamp)

### **ATLETA_TREINOS**
- `id` (uuid)
- `atleta_id` (uuid)
- `modalidade` (text) - Corrida, Musculação, Natação, etc
- `dias` (jsonb) - [{dia: 'seg', horario: '10:00'}, ...]
- `observacoes` (text)
- `created_at` (timestamp)

### **REPASSES**
- `id` (uuid)
- `profissional_id` (uuid)
- `valor` (numeric)
- `mes_ref` (text) - YYYY-MM
- `status` (text) - pendente/pago
- `data_pagamento` (date)
- `created_at` (timestamp)

### **REPASSE_ANEXOS**
- `id` (uuid)
- `profissional_id` (uuid)
- `mes_ref` (text)
- `arquivo_url` (text)
- `nome_arquivo` (text)
- `tamanho` (integer)
- `uploaded_at` (timestamp)

### **PROFILES** (usuários do sistema)
- `id` (uuid)
- `nome` (text)
- `email` (text)
- `profissao` (text)
- `cargos` (jsonb)

---

## ✅ FUNCIONALIDADES COMPLETAS (Do sistema antigo)

### **DASHBOARD**
- Overview de pacientes
- Estatísticas de repasses
- Próximos eventos

### **PACIENTES - CRM**
- Lista com filtros
- Pipeline kanban (Indicação → Contato → Proposta → Ativo)
- Categorias personalizadas
- Perfil do paciente com abas

### **ABA TREINOS (do Perfil do Paciente)**
- ✅ Grade semanal (Seg-Dom)
- ✅ Treinos cadastrados com CRUD
- ✅ Modal dropdown para selecionar modalidade
- ✅ Horários por dia

### **REPASSES**
- ✅ Lista por profissional
- ✅ Total do mês
- ✅ Status (Pendente/Pago)
- ✅ Botão "Pagar"
- ✅ Múltiplos anexos (Comprovante, Recibo, Nota Fiscal)
- ✅ Upload para Supabase Storage

### **OUTROS**
- Eventos/Competições
- Indicações
- Configurações
- Usuários/Profissionais

---

## 🎯 ESTRUTURA REACT ATUAL

```
src/
├── components/
│   └── Navigation.jsx          ← Menu lateral
├── pages/
│   ├── Dashboard.jsx           ← Página inicial
│   ├── Pacientes.jsx           ← Lista + CRM
│   └── Repasses.jsx            ← Repasses com anexos
├── config/
│   └── supabase.js             ← Configuração do Supabase
├── styles/
│   ├── index.css               ← Estilos globais
│   ├── navigation.css
│   └── app.css
├── App.jsx                     ← Componente principal
└── main.jsx                    ← Entry point
```

---

## 🚀 PRÓXIMAS FEATURES A IMPLEMENTAR

### **PRIORIDADE ALTA:**
1. Refatorar **Pacientes** (CRM com pipeline)
2. Refatorar **Aba Treinos** (Grade + CRUD treinos)
3. Refatorar **Repasses** (Lista + múltiplos anexos)
4. Dashboard com gráficos

### **PRIORIDADE MÉDIA:**
5. Eventos/Competições
6. Indicações
7. Autenticação Supabase

### **PRIORIDADE BAIXA:**
8. Dark mode
9. Relatórios/PDFs
10. Notificações

---

## 📝 PADRÕES DO CÓDIGO

### **Hooks Recomendados:**
- `useState` para estado local
- `useEffect` para chamadas ao Supabase
- `useContext` para dados globais (currentUser, etc)

### **Padrão de Chamadas Supabase:**
```javascript
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  supabase
    .from('tabela')
    .select('*')
    .then(({ data }) => setData(data))
    .finally(() => setLoading(false))
}, [])
```

### **Componentes Reutilizáveis:**
- Button
- Card
- Modal
- Input
- Select
- Table

---

## 🔗 REPOSITÓRIOS

- **Novo (React):** https://github.com/renanbraznutri/tropa-nutri-react
- **Antigo (HTML):** https://github.com/renanbraznutri/tropa-nutri-performance
- **Deploy:** https://tropa-nutri-performance.pages.dev

---

## 🎓 INSTRUÇÕES PARA CLAUDE CODE

### **Para adicionar uma feature:**

```
"Crie um componente PacientesList que:
1. Carregue pacientes do Supabase
2. Mostre em uma tabela (id, nome, email, categoria, status)
3. Tenha filtros por categoria
4. Tenha botão para editar/deletar
5. Use o padrão de hooks do projeto"
```

### **Para refatorar uma página:**

```
"Refatore a página de Repasses para:
1. Mostrar lista de repasses por profissional
2. Agrupar por mês (mes_ref)
3. Calcular total mensal
4. Permitir upload de anexos (Comprovante, Recibo, NF)
5. Exibir arquivos anexados com botões de visualizar/deletar"
```

---

## ✨ IMPORTANTE

- ✅ Supabase já configurado e conectado
- ✅ Todas as tabelas criadas
- ✅ RLS policies aplicadas
- ✅ Storage bucket para anexos criado
- ✅ GitHub repository criado

**Tudo pronto para começar!** 🚀

---

**ÚLTIMA ATUALIZAÇÃO:** 13 de Junho de 2026
