import { pool } from "../database/connection.js";

export class RelatorioRepository {

    // 1 - Livros com estoque disponível
    async livrosComEstoqueDisponivel(): Promise<any[]> {
        try {
            const resultado = await pool.query(
                `SELECT
                    livros.titulo,
                    autores.nome AS autor,
                    livros.genero,
                    livros.estoque
                FROM livros
                INNER JOIN autores
                    ON autores.id = livros.autor_id
                WHERE livros.estoque > 0
                ORDER BY livros.titulo`
            );

            return resultado.rows;

        } catch (error) {
            throw new Error(
                "[ERRO] Não foi possível consultar os livros com estoque disponível."
            );
        }
    }


    // 2 - Livros emprestados
    async livrosEmprestados(): Promise<any[]> {
        try {
            const resultado = await pool.query(
                `SELECT
                    livros.titulo,
                    clientes.nome AS cliente,
                    emprestimos.data_emprestimo
                FROM emprestimos
                INNER JOIN livros
                    ON livros.id = emprestimos.livro_id
                INNER JOIN clientes
                    ON clientes.id = emprestimos.cliente_id
                WHERE emprestimos.data_devolucao IS NULL
                ORDER BY emprestimos.data_emprestimo`
            );

            return resultado.rows;

        } catch (error) {
            throw new Error(
                "[ERRO] Não foi possível consultar os livros emprestados."
            );
        }
    }


    // 3 - Livros cadastrados por autor
    async livrosCadastradosPorAutor(): Promise<any[]> {
        try {
            const resultado = await pool.query(
                `SELECT
                    autores.nome AS autor,
                    livros.titulo,
                    livros.genero,
                    livros.ano_publicacao
                FROM autores
                LEFT JOIN livros
                    ON livros.autor_id = autores.id
                ORDER BY autores.nome, livros.titulo`
            );

            return resultado.rows;

        } catch (error) {
            throw new Error(
                "[ERRO] Não foi possível consultar os livros cadastrados por autor."
            );
        }
    }


    // 4 - Consultar empréstimos
    async consultarEmprestimos(): Promise<any[]> {
        try {
            const resultado = await pool.query(
                `SELECT
                    livros.titulo,
                    livros.genero,
                    clientes.nome AS cliente,
                    clientes.telefone AS contato,
                    emprestimos.data_emprestimo,
                    emprestimos.data_devolucao
                FROM emprestimos
                INNER JOIN livros
                    ON livros.id = emprestimos.livro_id
                INNER JOIN clientes
                    ON clientes.id = emprestimos.cliente_id
                ORDER BY emprestimos.data_emprestimo DESC`
            );

            return resultado.rows;

        } catch (error) {
            throw new Error(
                "[ERRO] Não foi possível consultar os empréstimos."
            );
        }
    }


    // 5 - Quantidade total de empréstimos por livro
    async quantidadeEmprestimosPorLivro(): Promise<any[]> {
        try {
            const resultado = await pool.query(
                `SELECT
                    livros.titulo,
                    autores.nome AS autor,
                    COUNT(emprestimos.id) AS quantidade_emprestimos
                FROM livros
                INNER JOIN autores
                    ON autores.id = livros.autor_id
                LEFT JOIN emprestimos
                    ON emprestimos.livro_id = livros.id
                GROUP BY livros.id, livros.titulo, autores.nome
                ORDER BY quantidade_emprestimos DESC, livros.titulo`
            );

            return resultado.rows;

        } catch (error) {
            throw new Error(
                "[ERRO] Não foi possível consultar a quantidade de empréstimos por livro."
            );
        }
    }


    // 6 - Clientes com empréstimo ativo
    async clientesComEmprestimoAtivo(): Promise<any[]> {
        try {
            const resultado = await pool.query(
                `SELECT
                    clientes.nome AS cliente,
                    clientes.telefone AS contato,
                    livros.titulo,
                    emprestimos.data_emprestimo
                FROM emprestimos
                INNER JOIN clientes
                    ON clientes.id = emprestimos.cliente_id
                INNER JOIN livros
                    ON livros.id = emprestimos.livro_id
                WHERE emprestimos.data_devolucao IS NULL
                ORDER BY clientes.nome, emprestimos.data_emprestimo`
            );

            return resultado.rows;

        } catch (error) {
            throw new Error(
                "[ERRO] Não foi possível consultar os clientes com empréstimo ativo."
            );
        }
    }
}