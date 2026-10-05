import { EmprestimoService } from "../services/EmprestimoService.js";
import { type Emprestimo } from "../models/Interfaces.js";
import readline from "readline";

export class EmprestimoController {

    constructor(
        private emprestimoService: EmprestimoService,
        private rl: readline.Interface
    ) {}


    private perguntar(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, resolve);
        });
    }


    // Cadastra um novo empréstimo
    async cadastrarEmprestimo(): Promise<void> {

        const entradaLivro = await this.perguntar(
            "Digite o ID do livro: "
        );

        const entradaCliente = await this.perguntar(
            "Digite o ID do cliente: "
        );

        const livro_id = Number(entradaLivro);
        const cliente_id = Number(entradaCliente);

        try {
            await this.emprestimoService.cadastrarEmprestimo(
                livro_id,
                cliente_id
            );
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Lista todos os empréstimos cadastrados
    async listarEmprestimos(): Promise<void> {

        try {
            const emprestimos =
                await this.emprestimoService.listarTodosEmprestimos();

            if (emprestimos.length === 0) {
                return;
            }

            console.log("\n===== EMPRÉSTIMOS =====");

            emprestimos.forEach((emprestimo) => {
                console.log(`ID: ${emprestimo.id}`);
                console.log(`Livro ID: ${emprestimo.livro_id}`);
                console.log(`Cliente ID: ${emprestimo.cliente_id}`);
                console.log(
                    `Data do empréstimo: ${
                        emprestimo.data_emprestimo.toLocaleDateString("pt-BR")
                    }`
                );
                console.log(
                    `Data da devolução: ${
                        emprestimo.data_devolucao
                            ? emprestimo.data_devolucao.toLocaleDateString("pt-BR")
                            : "-"
                    }`
                );
                console.log("--------------------");
            });

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Registra a devolução de um empréstimo
    async devolverEmprestimo(): Promise<void> {

        const entrada = await this.perguntar(
            "Digite o ID do empréstimo: "
        );

        const id = Number(entrada);

        try {
            await this.emprestimoService.devolverEmprestimo(id);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
}