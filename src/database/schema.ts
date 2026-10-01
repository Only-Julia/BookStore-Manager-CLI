export const SQL_CRIAR_TABELAS = `

CREATE TABLE IF NOT EXISTS autores (
    id             SERIAL PRIMARY KEY,
    nome           VARCHAR(100) NOT NULL,
    nacionalidade  VARCHAR(50),
    nascimento     DATE
);

CREATE TABLE IF NOT EXISTS livros (
    id               SERIAL PRIMARY KEY,
    titulo           VARCHAR(150) NOT NULL,
    ano_publicacao   INTEGER,
    genero           VARCHAR(50),
    autor_id         INTEGER NOT NULL REFERENCES autores(id),
    estoque          INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0)
);

CREATE TABLE IF NOT EXISTS clientes (
    id        SERIAL PRIMARY KEY,
    nome      VARCHAR(100) NOT NULL,
    email     VARCHAR(150) NOT NULL,
    telefone  VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS emprestimos (
    id                SERIAL PRIMARY KEY,
    livro_id          INTEGER NOT NULL REFERENCES livros(id),
    cliente_id        INTEGER NOT NULL REFERENCES clientes(id),
    data_emprestimo   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    data_devolucao    TIMESTAMPTZ
);

`;



export const SQL_APAGAR_TABELAS = `

DROP TABLE IF EXISTS emprestimos;
DROP TABLE IF EXISTS livros;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS autores;

`;