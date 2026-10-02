import { pool } from "../database/connection.js";
import { type Autor } from "../models/Interfaces.js";

export class AutorRepository {

    async inserir(autor: Autor): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `INSERT INTO autores (nome, nacionalidade, nascimento)
                VALUES ($1, $2, $3)`,
                [
                    autor.nome,
                    autor.nacionalidade,
                    autor.nascimento
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error(" [ERRO] Não foi possível cadastrar o autor.");
        }
    }


    async listarTodos(): Promise<Autor[]> {
        try {
            const resultado = await pool.query<Autor>(
                `SELECT * FROM autores
                ORDER BY id`
            );

            return resultado.rows;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível listar os autores.");
        }
    }


    async buscarPorId(id: number): Promise<Autor | null> {
        try {
            const resultado = await pool.query<Autor>(
                `SELECT * FROM autores
                WHERE id = $1`,
                [id]
            );

            const autor = resultado.rows[0];

            if (autor === undefined) {
                return null;
            }

            return autor;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível consultar o autor.");
        }
    }


    async buscarPorNome(nome: string): Promise<Autor | null> {
        try {
            const resultado = await pool.query<Autor>(
                `SELECT * FROM autores
                WHERE LOWER(nome) = LOWER($1)`,
                [nome]
            );

            const autor = resultado.rows[0];

            if (autor === undefined) {
                return null;
            }

           return autor;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível consultar o autor.");
        }
    }   


    async atualizar(autor: Autor): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `UPDATE autores
                SET nome = $1,
                nacionalidade = $2,
                nascimento = $3
                WHERE id = $4`,
                [
                    autor.nome,
                    autor.nacionalidade,
                    autor.nascimento,
                    autor.id
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível atualizar o autor.");
        }
    }


    async remover(id: number): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `DELETE FROM autores
                WHERE id = $1`,
                [id]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível remover o autor.");
        }
    }
}