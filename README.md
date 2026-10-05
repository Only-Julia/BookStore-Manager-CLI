# Bookstore

## Descrição do projeto

O **Bookstore Manager CLI** é uma aplicação de back-end desenvolvida em Node.js com TypeScript e PostgreSQL para o gerenciamento de uma livraria.

A aplicação funciona diretamente pelo terminal, permitindo realizar o cadastro e gerenciamento de autores, livros e clientes, controle de empréstimos e devoluções.

O sistema também possui uma área de relatórios, utilizando consultas SQL para apresentar informações sobre estoque, livros emprestados, autores, clientes e histórico de empréstimos.

O projeto foi desenvolvido utilizando uma arquitetura em camadas, separando as responsabilidades entre menus, controllers, services e repositories.

## Objetivo

O objetivo do projeto é desenvolver uma aplicação Back-End utilizando PostgreSQL para praticar o uso de bancos de dados relacionais, aprendendo a criar, consultar, inserir, atualizar e remover dados através de comandos SQL, além de trabalhar com relacionamentos entre tabelas e consultas mais elaboradas.

A aplicação permite:

- Cadastrar, consultar, atualizar e remover autores, livros e clientes;
- Registrar empréstimos e devoluções;
- Gerar relatórios através de consultas SQL;
- Aplica regras de negócio e validações;
- Utilizar uma arquitetura organizada em camadas;
- Utilizar um menu interativo no terminal para acessar as funcionalidades do sistema;

## Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- `pg`
- `dotenv`
- TSX
- Git
- GitHub

## Requisitos para execução

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- PostgreSQL
- Git

Também é necessário possuir um servidor PostgreSQL em execução.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Only-Julia/BookStore-Manager-CLI
```

Acesse a pasta do projeto:

```bash
cd BookStore-Manager-CLI
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com os dados de acesso ao PostgreSQL.

## Configuração do banco de dados

Para armazenar as informações da aplicação, foi utilizado o PostgreSQL. O banco criado para o projeto se chama bookstore e possui tabelas relacionadas entre si para representar as principais entidades do sistema:

As tabelas utilizadas são:

- autores
- livros
- clientes
- emprestimos

As tabelas possuem relacionamentos através de chaves primárias e estrangeiras.

### Variáveis de ambiente

A conexão com o PostgreSQL é configurada através de um arquivo .env, localizado na raiz do projeto.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore
```

Os dados de acesso devem ser preenchidos de acordo com a configuração do PostgreSQL utilizado no ambiente de execução.
O arquivo .env contém informações de acesso ao banco e, por isso, deve permanecer fora do versionamento.

### Criação do banco

O projeto possui um script responsável pela criação do banco de dados:

```bash
npm run db:create
```

Após a criação do banco, as tabelas podem ser criadas através do comando:

```bash
npm run db:migrate
```

Para apagar e recriar as tabelas:

```bash
npm run db:reset
```


## Execução

Para executar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

Após iniciar, será exibido o menu principal no terminal:

```text
===== MENU PRINCIPAL =====

1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
5 - Relatórios
0 - Sair

Escolha uma opção:
```

O usuário pode selecionar uma das opções para acessar as funcionalidades do sistema.

## Arquitetura do projeto

Para manter o código organizado, o projeto foi dividido em camadas, cada uma cuidando de uma responsabilidade diferente.

A comunicação entre essas camadas acontece da seguinte forma:

```text
Menu
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

### Menus

Os menus são responsáveis pela navegação do sistema através do terminal.

Eles apresentam as opções disponíveis e direcionam o usuário para os Controllers correspondentes.

### Controllers

Recebem os dados informados pelo usuário no terminal, encaminham as solicitações para os Services e mostram os resultados ou possíveis mensagens de erro.

### Services

Os Services são responsáveis por controlar as regras e validações da aplicação.

Eles verificam os dados recebidos e, quando tudo está correto, permitem que as operações sejam realizadas no banco de dados.

### Repositories

Os Repositories fazem a comunicação entre a aplicação e o banco de dados PostgreSQL.

Eles executam os comandos SQL necessários para consultar, inserir, atualizar e remover dados.

### Models

A pasta models contém as interfaces utilizadas para representar os dados das entidades e as classes de erro personalizadas utilizadas pela aplicação.

### Database

A pasta database reúne os arquivos responsáveis pela configuração e pelo gerenciamento do banco de dados da aplicação.

## Funcionalidades implementadas

### Autores

Permite cadastrar, listar, consultar, atualizar e remover autores, verificando nomes duplicados.

### Livros

Permite cadastrar, listar, consultar, atualizar e remover livros, além de controlar o estoque e vinculá-los a autores existentes.

### Clientes

O sistema permite:

Permite cadastrar, listar, consultar, atualizar e remover clientes, verificando dados obrigatórios e nomes duplicados.

### Empréstimos

Permite realizar empréstimos e registrar devoluções, verificando a existência do livro e do cliente e a disponibilidade de estoque. O estoque é atualizado automaticamente conforme o empréstimo e a devolução.

### Relatórios

O sistema possui seis relatórios para consulta das informações:

1. **Livros disponíveis:** mostra livros com estoque disponível, incluindo título, autor, gênero e quantidade.

2. **Livros emprestados:** apresenta os livros atualmente emprestados e seus respectivos clientes e datas.

3. **Livros por autor:** relaciona cada autor aos seus livros, com gênero e ano de publicação.

4. **Histórico de empréstimos:** exibe os registros de empréstimos e devoluções, com informações do livro e do cliente.

5. **Empréstimos por livro:** mostra quantas vezes cada livro já foi emprestado.

6. **Clientes com empréstimo ativo:** apresenta os clientes que possuem livros ainda não devolvidos.


## Consultas SQL utilizadas

O projeto utiliza comandos e recursos do PostgreSQL.

Entre eles:

```sql
SELECT
INSERT
UPDATE
DELETE
INNER JOIN
LEFT JOIN
WHERE
GROUP BY
ORDER BY
COUNT()
```

## Estrutura de pastas

A estrutura principal do projeto é:

```text
BookStore-Manager-CLI/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── AutorController.ts
│   │   ├── ClienteController.ts
│   │   ├── EmprestimoController.ts
│   │   ├── LivroController.ts
│   │   └── RelatorioController.ts
│   │
│   ├── database/
│   │   ├── connection.ts
│   │   ├── criarBanco.ts
│   │   ├── migrate.ts
│   │   └── schema.ts
│   │
│   ├── menus/
│   │   ├── menuAutor.ts
│   │   ├── menuCliente.ts
│   │   ├── menuEmprestimo.ts
│   │   ├── menuLivro.ts
│   │   ├── menuPrincipal.ts
│   │   └── menuRelatorio.ts
│   │
│   ├── models/
│   │   ├── CustomErrors.ts
│   │   └── Interfaces.ts
│   │
│   ├── repositories/
│   │   ├── AutorRepository.ts
│   │   ├── ClienteRepository.ts
│   │   ├── EmprestimoRepository.ts
│   │   ├── LivroRepository.ts
│   │   └── RelatorioRepository.ts
│   │
│   ├── services/
│   │   ├── AutorService.ts
│   │   ├── ClienteService.ts
│   │   ├── EmprestimoService.ts
│   │   ├── LivroService.ts
│   │   └── RelatorioService.ts
│   │
│   └── main.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Exemplos de utilização

Ao executar a aplicação, o usuário encontra o menu principal:

```text
===== MENU PRINCIPAL =====

1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
5 - Relatórios
0 - Sair

Escolha uma opção:
```

Ao selecionar uma opção, o usuário é direcionado para o menu correspondente.

### Exemplo de cadastro de autor

```text
Escolha uma opção: 1

===== MENU AUTORES =====

1 - Cadastrar autor
2 - Listar autores
3 - Consultar autor por ID
4 - Atualizar autor
5 - Remover autor
0 - Voltar

Escolha uma opção: 1

Digite o nome do autor: Machado de Assis
Digite a nacionalidade: Brasileiro
Digite a data de nascimento: 1839-06-21
```

Após o cadastro:

```text
[OK] Autor cadastrado com sucesso.
```

### Exemplo de empréstimo

```text
===== MENU EMPRÉSTIMOS =====

1 - Cadastrar empréstimo
2 - Listar empréstimos
3 - Devolver empréstimo
0 - Voltar

Escolha uma opção: 1

Digite o ID do livro: 1
Digite o ID do cliente: 1
```

Após o cadastro:

```text
[OK] Empréstimo cadastrado com sucesso.
```

O estoque do livro é reduzido automaticamente.

### Exemplo de livro indisponível

Caso um livro não possua estoque:

```text
[ERRO] Livro indisponível para empréstimo.
```

### Exemplo de devolução

```text
Escolha uma opção: 3

Digite o ID do empréstimo: 1
```

Saída:

```text
[OK] Empréstimo devolvido com sucesso.
```

A data de devolução é registrada e o estoque do livro é aumentado novamente.

### Exemplo de relatório

Ao acessar a opção de relatórios:

```text
===== MENU RELATÓRIOS =====

1 - Livros com estoque disponível
2 - Livros emprestados
3 - Livros cadastrados por autor
4 - Consultar empréstimos
5 - Quantidade total de empréstimos por livro
6 - Clientes com empréstimo ativo
0 - Voltar

Escolha uma opção:
```

Ao consultar o estoque:

```text
===== LIVROS COM ESTOQUE DISPONÍVEL =====

Título: Dom Casmurro
Autor: Machado de Assis
Gênero: Romance
Estoque: 3
--------------------
```

## Link do Kanban

O projeto foi organizado utilizando um quadro Kanban para acompanhar as tarefas de desenvolvimento. Link do Kanban:

https://github.com/users/Only-Julia/projects/2/
