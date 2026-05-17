#  Gerenciador de Produtos

Projeto desenvolvido como atividade prática do Curso Técnico em Análise e Desenvolvimento de Sistemas (ADS).

---

##  Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

##  Sobre o Projeto

O Gerenciador de Produtos é uma aplicação web fullstack para controle de estoque. O sistema permite cadastrar produtos, fornecedores e registrar vendas, tudo por meio de uma interface web moderna.

Desenvolvido com React + Vite no frontend e Python no backend, com persistência de dados em banco SQL.

---

##  Funcionalidades

### Produtos
- [x] Cadastrar produto
- [x] Listar produtos
- [x] Editar produto
- [x] Excluir produto

### Fornecedores
- [x] Cadastrar fornecedor
- [x] Listar fornecedores
- [x] Editar fornecedor
- [x] Excluir fornecedor

### Vendas
- [x] Registrar venda
- [x] Listar vendas
- [x] Editar venda
- [x] Excluir venda

---

## 🛠 Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|------------|
| Frontend | React + Vite |
| Backend | Python |
| Banco de Dados | SQL |
| Controle de Versão | Git + GitHub |

---

##  Como Executar

### Pré-requisitos

- [Node.js] instalado
- [Python 3] instalado
- Banco de dados SQL configurado

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/ArthurMiranda117/Gerenciador-de-Produtos.git
cd Gerenciador-de-Produtos
```

**2. Configure o banco de dados**

Importe o arquivo `db_produtos.sql` no seu banco de dados:
```bash
mysql -u seu_usuario -p nome_do_banco < db_produtos.sql
```

**3. Configure as variáveis de ambiente**

Dentro da pasta `api/`, edite o arquivo `.env` com os dados do seu banco:
```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

**4. Inicie o backend**
```bash
cd api
pip install -r requirements.txt
python api.py
```

**5. Inicie o frontend**

Em outro terminal, na raiz do projeto:
```bash
npm install
npm run dev
```

Acesse em: `http://localhost:5173`

---

##  Estrutura do Projeto

```
GerenciadorProdutos/
├── api/                        # Backend em Python
│   ├── controllers/            # Lógica de cada módulo
│   │   ├── fornecedor_controller.py
│   │   ├── produto_controller.py
│   │   └── venda_controller.py
│   ├── models/                 # Conexão e modelos do banco
│   │   ├── db_connect.py
│   │   ├── fornecedor.py
│   │   ├── produto.py
│   │   └── venda.py
│   ├── api.py                  # Arquivo principal da API
│   └── .env                    # Variáveis de ambiente
├── src/                        # Frontend em React
│   ├── assets/js/              # Componentes reutilizáveis
│   │   ├── ModalAviso.jsx
│   │   └── ModalConfirmacao.jsx
│   ├── pages/                  # Páginas da aplicação
│   │   ├── fornecedor/
│   │   ├── produto/
│   │   └── venda/
│   ├── App.jsx
│   └── main.jsx
├── docs/                       # Página do GitHub Pages
│   └── index.html
├── db_produtos.sql             # Script de criação do banco
├── index.html
└── package.json

[![GitHub](https://img.shields.io/badge/GitHub-ArthurMiranda117-181717?style=flat&logo=github)](https://github.com/ArthurMiranda117)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Acesse%20o%20site-222?style=flat&logo=github)](https://ArthurMiranda117.github.io/Gerenciador-de-Produtos/)

```
