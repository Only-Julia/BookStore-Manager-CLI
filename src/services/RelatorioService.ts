import { RelatorioRepository } from "../repositories/RelatorioRepository.js";

export class RelatorioService {

    private relatorioRepository: RelatorioRepository;

    constructor(relatorioRepository: RelatorioRepository) {
        this.relatorioRepository = relatorioRepository;
    }


    // Consulta os livros que possuem estoque disponível.
    async livrosComEstoqueDisponivel(): Promise<any[]> {

        const livros =
            await this.relatorioRepository.livrosComEstoqueDisponivel();

        if (livros.length === 0) {
            console.log("[INFO] Não há livros com estoque disponível.");
            return [];
        }

        return livros;
    }


    // Consulta os livros que estão emprestados.
    async livrosEmprestados(): Promise<any[]> {

        const livros =
            await this.relatorioRepository.livrosEmprestados();

        if (livros.length === 0) {
            console.log("[INFO] Não há livros emprestados.");
            return [];
        }

        return livros;
    }


    // Consulta os livros cadastrados por autor.
    async livrosCadastradosPorAutor(): Promise<any[]> {

        const livros =
            await this.relatorioRepository.livrosCadastradosPorAutor();

        if (livros.length === 0) {
            console.log("[INFO] Não há livros cadastrados.");
            return [];
        }

        return livros;
    }


    // Consulta todos os empréstimos.
    async consultarEmprestimos(): Promise<any[]> {

        const emprestimos =
            await this.relatorioRepository.consultarEmprestimos();

        if (emprestimos.length === 0) {
            console.log("[INFO] Não há empréstimos cadastrados.");
            return [];
        }

        return emprestimos;
    }


    // Consulta a quantidade total de empréstimos por livro.
    async quantidadeEmprestimosPorLivro(): Promise<any[]> {

        const livros =
            await this.relatorioRepository.quantidadeEmprestimosPorLivro();

        if (livros.length === 0) {
            console.log("[INFO] Não há empréstimos cadastrados.");
            return [];
        }

        return livros;
    }


    // Consulta os clientes que possuem empréstimos ativos.
    async clientesComEmprestimoAtivo(): Promise<any[]> {

        const clientes =
            await this.relatorioRepository.clientesComEmprestimoAtivo();

        if (clientes.length === 0) {
            console.log("[INFO] Não há clientes com empréstimos ativos.");
            return [];
        }

        return clientes;
    }
}