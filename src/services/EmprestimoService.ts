import { EmprestimoRepository } from "../repositories/EmprestimoRepository.js";
import { LivroRepository } from "../repositories/LivroRepository.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";
import { type Emprestimo } from "../models/Interfaces.js";

export class EmprestimoService {

    private emprestimoRepository: EmprestimoRepository;
    private livroRepository: LivroRepository;
    private clienteRepository: ClienteRepository;

    constructor(
        emprestimoRepository: EmprestimoRepository,
        livroRepository: LivroRepository,
        clienteRepository: ClienteRepository
    ) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroRepository = livroRepository;
        this.clienteRepository = clienteRepository;
    }


    // Valida se o livro e o cliente existem e se há estoque disponível.
    async cadastrarEmprestimo(
        livro_id: number,
        cliente_id: number
    ): Promise<void> {

        const livro =
            await this.livroRepository.buscarPorId(livro_id);

        if (!livro) {
            throw new Error("[ERRO] Livro não encontrado.");
        }

        const cliente =
            await this.clienteRepository.buscarPorId(cliente_id);

        if (!cliente) {
            throw new Error("[ERRO] Cliente não encontrado.");
        }

        if (livro.estoque <= 0) {
            throw new Error("[ERRO] Livro indisponível para empréstimo.");
        }

        const emprestimo: Emprestimo = {
            id: 0,
            livro_id,
            cliente_id,
            data_emprestimo: new Date(),
            data_devolucao: null
        };

        await this.emprestimoRepository.inserir(emprestimo);

        await this.livroRepository.retirar(livro_id, 1);

        console.log("[OK] Empréstimo cadastrado com sucesso.");
    }


    // Registra a devolução e adiciona o livro novamente ao estoque.
    async devolverEmprestimo(id: number): Promise<void> {

        const emprestimo =
            await this.emprestimoRepository.buscarPorId(id);

        if (!emprestimo) {
            throw new Error("[ERRO] Empréstimo não encontrado.");
        }

        if (emprestimo.data_devolucao) {
            throw new Error("[ERRO] Este empréstimo já foi devolvido.");
        }

        const dataDevolucao = new Date();

        await this.emprestimoRepository.devolver(
            id,
            dataDevolucao
        );

        await this.livroRepository.adicionar(
            emprestimo.livro_id,
            1
        );

        console.log("[OK] Empréstimo devolvido com sucesso.");
    }


    // Lista todos os empréstimos cadastrados, ou lista vazia.
    async listarTodosEmprestimos(): Promise<Emprestimo[]> {

        const emprestimos =
            await this.emprestimoRepository.listarTodos();

        if (emprestimos.length === 0) {
            console.log("[INFO] Não há empréstimos cadastrados.");
            return [];
        }

        return emprestimos;
    }
}