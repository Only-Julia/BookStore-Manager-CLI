import { LivroRepository } from "../repositories/LivroRepository.js";
import { AutorRepository } from "../repositories/AutorRepository.js";
import { type Livro } from "../models/Interfaces.js";

export class LivroService {

    private livroRepository: LivroRepository;
    private autorRepository: AutorRepository;

    constructor(
        livroRepository: LivroRepository,
        autorRepository: AutorRepository
    ) {
        this.livroRepository = livroRepository;
        this.autorRepository = autorRepository;
    }

    // Valida se os campos obrigatórios foram informados, se o estoque é válido, se o autor existe e se o livro ainda não está cadastrado.
    async cadastrarLivro(livro: Livro): Promise<void> {

        if (!livro.titulo) {
            throw new Error("[ERRO] Título do livro é obrigatório.");
        }

        if (!livro.genero) {
            throw new Error("[ERRO] Gênero do livro é obrigatório.");
        }

        if (!livro.autor_id) {
            throw new Error("[ERRO] ID do autor é obrigatório.");
        }

        if (livro.estoque < 0) {
            throw new Error("[ERRO] O estoque não pode ser negativo.");
        }

        const autorExistente =
            await this.autorRepository.buscarPorId(livro.autor_id);

        if (!autorExistente) {
            throw new Error("[ERRO] Autor não encontrado.");
        }

        const livroExistente =
            await this.livroRepository.buscarPorNome(livro.titulo);

        if (livroExistente) {
            throw new Error("[ERRO] Livro já existe.");
        }

        await this.livroRepository.inserir(livro);

        console.log("[OK] Livro cadastrado com sucesso.");
    }


    // Adiciona uma quantidade ao estoque de um livro.
    async adicionarLivro(id: number, quantidade: number): Promise<void> {

        const livroExistente =
            await this.livroRepository.buscarPorId(id);

        if (!livroExistente) {
            throw new Error("[ERRO] Livro não encontrado.");
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            throw new Error("[ERRO] A quantidade deve ser um número inteiro maior que zero.");
        }

        await this.livroRepository.adicionar(id, quantidade);

        console.log("[OK] Estoque atualizado com sucesso.");
    }


    // Valida se o livro existe, se o novo título foi informado, se não é repetido, se o autor existe e se o estoque é válido.
    async atualizarLivro(
        id: number,
        titulo: string,
        ano_publicacao: number | null,
        genero: string,
        autor_id: number,
        estoque: number
    ): Promise<void> {

        const livroExistente =
            await this.livroRepository.buscarPorId(id);

        if (!livroExistente) {
            throw new Error("[ERRO] Livro não encontrado.");
        }

        if (!titulo) {
            throw new Error("[ERRO] Título do livro é obrigatório.");
        }

        if (!genero) {
            throw new Error("[ERRO] Gênero do livro é obrigatório.");
        }

        if (!autor_id) {
            throw new Error("[ERRO] ID do autor é obrigatório.");
        }

        if (estoque < 0) {
            throw new Error("[ERRO] O estoque não pode ser negativo.");
        }

        const livroRepetido =
            await this.livroRepository.buscarPorNome(titulo);

        if (livroRepetido && livroRepetido.id !== id) {
            throw new Error("[ERRO] Já existe outro livro com esse título.");
        }

        const autorExistente =
            await this.autorRepository.buscarPorId(autor_id);

        if (!autorExistente) {
            throw new Error("[ERRO] Autor não encontrado.");
        }

        await this.livroRepository.atualizar({
            id,
            titulo,
            ano_publicacao,
            genero,
            autor_id,
            estoque
        });

        console.log("[OK] Livro atualizado com sucesso.");
    }


    // Busca um livro pelo ID.
    async buscarLivroPorId(id: number): Promise<Livro | null> {

        const livro = await this.livroRepository.buscarPorId(id);

        if (!livro) {
            console.log("[INFO] Livro não encontrado.");
            return null;
        }

        return livro;
    }


    // Busca um livro pelo título.
    async buscarLivroPorNome(nome: string): Promise<Livro | null> {

        if (!nome) {
            console.log("[INFO] Título do livro não informado.");
            return null;
        }

        const livro = await this.livroRepository.buscarPorNome(nome);

        if (!livro) {
            console.log("[INFO] Livro não encontrado.");
            return null;
        }

        return livro;
    }


    // Lista todos os livros cadastrados, ou lista vazia.
    async listarTodosLivros(): Promise<Livro[]> {

        const livros = await this.livroRepository.listarTodos();

        if (livros.length === 0) {
            console.log("[INFO] Não há livros cadastrados.");
            return [];
        }

        return livros;
    }


    // Remove um livro pelo ID.
    async removerLivro(id: number): Promise<void> {

        const livroExistente =
            await this.livroRepository.buscarPorId(id);

        if (!livroExistente) {
            throw new Error("[ERRO] Livro não encontrado.");
        }

        await this.livroRepository.remover(id);

        console.log("[OK] Livro removido com sucesso.");
    }
}