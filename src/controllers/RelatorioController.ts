import { RelatorioService } from "../services/RelatorioService.js";
import readline from "readline";

export class RelatorioController {

    constructor(
        private relatorioService: RelatorioService,
        private rl: readline.Interface
    ) {}


    // Relatório de livros com estoque disponível
    async livrosComEstoqueDisponivel(): Promise<void> {

        try {
            const livros =
                await this.relatorioService.livrosComEstoqueDisponivel();

            if (livros.length === 0) {
                return;
            }

            console.log("\n===== LIVROS COM ESTOQUE DISPONÍVEL =====");

            livros.forEach((livro) => {
                console.log(`Título: ${livro.titulo}`);
                console.log(`Autor: ${livro.autor}`);
                console.log(`Gênero: ${livro.genero}`);
                console.log(`Estoque: ${livro.estoque}`);
                console.log("--------------------");
            });

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Relatório de livros emprestados
    async livrosEmprestados(): Promise<void> {

        try {
            const livros =
                await this.relatorioService.livrosEmprestados();

            if (livros.length === 0) {
                return;
            }

            console.log("\n===== LIVROS EMPRESTADOS =====");

            livros.forEach((livro) => {
                console.log(`Título: ${livro.titulo}`);
                console.log(`Cliente: ${livro.cliente}`);
                console.log(
                    `Data do empréstimo: ${
                        livro.data_emprestimo.toLocaleDateString("pt-BR")
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


    // Relatório de livros cadastrados por autor
    async livrosCadastradosPorAutor(): Promise<void> {

        try {
            const livros =
                await this.relatorioService.livrosCadastradosPorAutor();

            if (livros.length === 0) {
                return;
            }

            console.log("\n===== LIVROS CADASTRADOS POR AUTOR =====");

            livros.forEach((livro) => {
                console.log(`Autor: ${livro.autor}`);
                console.log(`Título: ${livro.titulo ?? "-"}`);
                console.log(`Gênero: ${livro.genero ?? "-"}`);
                console.log(
                    `Ano de publicação: ${livro.ano_publicacao ?? "-"}`
                );
                console.log("--------------------");
            });

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Relatório de consulta de empréstimos
    async consultarEmprestimos(): Promise<void> {

        try {
            const emprestimos =
                await this.relatorioService.consultarEmprestimos();

            if (emprestimos.length === 0) {
                return;
            }

            console.log("\n===== CONSULTAR EMPRÉSTIMOS =====");

            emprestimos.forEach((emprestimo) => {
                console.log(`Título: ${emprestimo.titulo}`);
                console.log(`Gênero: ${emprestimo.genero}`);
                console.log(`Cliente: ${emprestimo.cliente}`);
                console.log(
                    `Contato: ${emprestimo.contato ?? "-"}`
                );
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


    // Relatório de quantidade total de empréstimos por livro
    async quantidadeEmprestimosPorLivro(): Promise<void> {

        try {
            const livros =
                await this.relatorioService.quantidadeEmprestimosPorLivro();

            if (livros.length === 0) {
                return;
            }

            console.log("\n===== QUANTIDADE TOTAL DE EMPRÉSTIMOS POR LIVRO =====");

            livros.forEach((livro) => {
                console.log(`Título: ${livro.titulo}`);
                console.log(`Autor: ${livro.autor}`);
                console.log(
                    `Total de empréstimos: ${livro.quantidade_emprestimos}`
                );
                console.log("--------------------");
            });

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Relatório de clientes com empréstimo ativo
    async clientesComEmprestimoAtivo(): Promise<void> {

        try {
            const clientes =
                await this.relatorioService.clientesComEmprestimoAtivo();

            if (clientes.length === 0) {
                return;
            }

            console.log("\n===== CLIENTES COM EMPRÉSTIMO ATIVO =====");

            clientes.forEach((cliente) => {
                console.log(`Cliente: ${cliente.cliente}`);
                console.log(`Contato: ${cliente.contato ?? "-"}`);
                console.log(`Livro: ${cliente.titulo}`);
                console.log(
                    `Data do empréstimo: ${
                        cliente.data_emprestimo.toLocaleDateString("pt-BR")
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
}