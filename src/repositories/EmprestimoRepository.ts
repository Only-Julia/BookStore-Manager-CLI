import { pool } from "../database/connection.js";
import { type Emprestimo } from "../models/Interfaces.js";

export class EmprestimoRepository {

    async inserir(emprestimo: Emprestimo): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `INSERT INTO emprestimos
                (livro_id, cliente_id, data_emprestimo, data_devolucao)
                VALUES ($1, $2, $3, $4)`,
                [
                    emprestimo.livro_id,
                    emprestimo.cliente_id,
                    emprestimo.data_emprestimo,
                    emprestimo.data_devolucao
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível cadastrar o empréstimo.");
        }
    }


    async buscarPorId(id: number): Promise<Emprestimo | null> {
        try {
            const resultado = await pool.query<Emprestimo>(
                `SELECT * FROM emprestimos
                WHERE id = $1`,
                [id]
            );

            const emprestimo = resultado.rows[0];

            if (emprestimo === undefined) {
                return null;
            }

            return emprestimo;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível consultar o empréstimo.");
        }
    }


    async devolver(id: number, data_devolucao: Date): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `UPDATE emprestimos
                SET data_devolucao = $1
                WHERE id = $2`,
                [
                    data_devolucao,
                    id
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível registrar a devolução.");
        }
    }


    async listarTodos(): Promise<Emprestimo[]> {
        try {
            const resultado = await pool.query<Emprestimo>(
                `SELECT * FROM emprestimos
                ORDER BY id`
            );

            return resultado.rows;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível listar os empréstimos.");
        }
    }
}