import 'dotenv/config';
import pg from 'pg';
import { DatabaseError } from "../models/CustomErrors.js";

const {Pool} = pg;

function env(nome: string, padrao: string):string{
    const valor = process.env[nome];
    return valor === undefined || valor.trim() == '' ? padrao : valor;
}


function criarPool(): pg.Pool {
    return new Pool({
        host: env('DB_HOST', 'localhost'),
        port: parseInt(env('DB_PORT', '5432')),
        user: env ('DB_USER', 'postgres'),
        password: env('DB_PASSWORD', 'postgres'),
        database: env('DB_NAME', 'bookstore'),
        max: 10,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 5_000,
    });
}


export const pool = criarPool();

pool.on('error', (err: Error) => {
    console.error(' [ERRO] Erro inesperado no cliente do banco de dados', err);
});


export async function testarConexao(): Promise<void> {
    try {
        const resultado = await pool.query('SELECT NOW() AS agora');
        const linha = resultado.rows[0];

        if(linha === undefined){
            throw new Error('[ERRO] O banco respondeu mas não retornou dados.');
        }
    }
    catch(erro) {
        const detalhe = erro instanceof Error ? erro.message : String(erro);
        throw new DatabaseError(
            `[ERRO] Não foi possível conectar ao PostgreSQL. Verifique o arquivo .env e se o banco está no ar. Detalhe: ${detalhe}`
        );
    }
}

export async function fecharConexao(): Promise<void> {
    await pool.end();
}