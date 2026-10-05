import { pool } from "../database/connection.js";
import { type Livro } from "../models/Interfaces.js";

export class LivroRepository {

    async inserir(livro: Livro): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `INSERT INTO livros (titulo, ano_publicacao, genero, autor_id, estoque)
                VALUES ($1, $2, $3, $4, $5)`,
                [
                    livro.titulo,
                    livro.ano_publicacao,
                    livro.genero,
                    livro.autor_id,
                    livro.estoque
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error(" [ERRO] Não foi possível cadastrar o livro.");
        }
    }


    async listarTodos(): Promise<Livro[]> {
        try {
            const resultado = await pool.query<Livro>(
                `SELECT * FROM livros
                ORDER BY id`
            );

            return resultado.rows;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível listar os livros.");
        }
    }


    async buscarPorId(id: number): Promise<Livro | null> {
        try {
            const resultado = await pool.query<Livro>(
                `SELECT * FROM livros
                WHERE id = $1`,
                [id]
            );

            const livro = resultado.rows[0];

            if (livro === undefined) {
                return null;
            }

            return livro;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível consultar o livro.");
        }
    }


    async buscarPorNome(nome: string): Promise<Livro | null> {
        try {
            const resultado = await pool.query<Livro>(
                `SELECT * FROM livros
                WHERE LOWER(titulo) = LOWER($1)`,
                [nome]
            );

            const livro = resultado.rows[0];

            if (livro === undefined) {
                return null;
            }

            return livro;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível consultar o livro.");
        }
    }


    async atualizar(livro: Livro): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `UPDATE livros
                SET titulo = $1,
                ano_publicacao = $2,
                genero = $3,
                autor_id = $4,
                estoque = $5
                WHERE id = $6`,
                [
                    livro.titulo,
                    livro.ano_publicacao,
                    livro.genero,
                    livro.autor_id,
                    livro.estoque,
                    livro.id
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível atualizar o livro.");
        }
    }


    async remover(id: number): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `DELETE FROM livros
                WHERE id = $1`,
                [id]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível remover o livro.");
        }
    }


    async adicionar(id: number, quantidade: number): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `UPDATE livros
                SET estoque = estoque + $1
                WHERE id = $2`,
                [
                    quantidade,
                    id
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível adicionar ao estoque.");
        }
    }

    async retirar(id: number, quantidade: number): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `UPDATE livros
                SET estoque = estoque - $1
                WHERE id = $2`,
                [
                    quantidade,
                    id
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível retirar do estoque.");
        }
    }
}