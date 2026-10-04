import { pool } from "../database/connection.js";
import { type Cliente } from "../models/Interfaces.js";

export class ClienteRepository {

    async inserir(cliente: Cliente): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `INSERT INTO clientes (nome, email, telefone)
                VALUES ($1, $2, $3)`,
                [
                    cliente.nome,
                    cliente.email,
                    cliente.telefone
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error(" [ERRO] Não foi possível cadastrar o cliente.");
        }
    }


    async listarTodos(): Promise<Cliente[]> {
        try {
            const resultado = await pool.query<Cliente>(
                `SELECT * FROM clientes
                ORDER BY id`
            );

            return resultado.rows;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível listar os clientes.");
        }
    }


    async buscarPorId(id: number): Promise<Cliente | null> {
        try {
            const resultado = await pool.query<Cliente>(
                `SELECT * FROM clientes
                WHERE id = $1`,
                [id]
            );

            const cliente = resultado.rows[0];

            if (cliente === undefined) {
                return null;
            }

            return cliente;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível consultar o cliente.");
        }
    }


    async buscarPorNome(nome: string): Promise<Cliente | null> {
        try {
            const resultado = await pool.query<Cliente>(
                `SELECT * FROM clientes
                WHERE LOWER(nome) = LOWER($1)`,
                [nome]
            );

            const cliente = resultado.rows[0];

            if (cliente === undefined) {
                return null;
            }

            return cliente;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível consultar o cliente.");
        }
    }


    async atualizar(cliente: Cliente): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `UPDATE clientes
                SET nome = $1,
                email = $2,
                telefone = $3
                WHERE id = $4`,
                [
                    cliente.nome,
                    cliente.email,
                    cliente.telefone,
                    cliente.id
                ]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível atualizar o cliente.");
        }
    }


    async remover(id: number): Promise<boolean> {
        try {
            const resultado = await pool.query(
                `DELETE FROM clientes
                WHERE id = $1`,
                [id]
            );

            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw new Error("[ERRO] Não foi possível remover o cliente.");
        }
    }
}