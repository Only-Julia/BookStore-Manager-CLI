import { AutorRepository } from "../repositories/AutorRepository.js";
import { type Autor } from "../models/Interfaces.js";

export class AutorService {

    private autorRepository: AutorRepository;

    constructor(autorRepository: AutorRepository) {
        this.autorRepository = autorRepository;
    }

    // Valida se o nome foi informado e se ainda não existe.
    async cadastrarAutor(autor: Autor): Promise<void> {

        if (!autor.nome) {
            throw new Error("[ERRO] Nome do autor é obrigatório.");
        }

        const autorExistente = await this.autorRepository.buscarPorNome(
            autor.nome
        );

        if (autorExistente) {
            throw new Error("[ERRO] Autor já existe.");
        }

        await this.autorRepository.inserir(autor);

        console.log("[OK] Autor cadastrado com sucesso.");
    }

    
    // Valida se o autor existe, se o novo nome foi informado e se não é repetido.
    async atualizarAutor(id: number,nome: string,nacionalidade: string,nascimento: Date | null): Promise<void> {
        const autorExistente =
            await this.autorRepository.buscarPorId(id);

        if (!autorExistente) {
          throw new Error("[ERRO] Autor não encontrado.");
        }

        if (!nome) {
            throw new Error("[ERRO] Nome do autor é obrigatório.");
        }

        const autorRepetido =
          await this.autorRepository.buscarPorNome(nome);

        if (autorRepetido && autorRepetido.id !== id) {
            throw new Error("[ERRO] Já existe outro autor com esse nome.");
        }

        await this.autorRepository.atualizar({
            id,
            nome,
            nacionalidade,
            nascimento
        });

        console.log("[OK] Autor atualizado com sucesso.");
    }


    // Busca um autor pelo ID.
    async buscarAutorPorId(id: number): Promise<Autor | null> {

        const autor = await this.autorRepository.buscarPorId(id);

        if (!autor) {
            console.log("[INFO] Autor não encontrado.");
            return null;
        }

        return autor;
    }


    // Lista todos os autores cadastrados, ou lista vazia.
    async listarTodosAutores(): Promise<Autor[]> {

        const autores = await this.autorRepository.listarTodos();

        if (autores.length === 0) {
            console.log("[INFO] Não há autores cadastrados.");
            return [];
        }

        return autores;
    }


    // Remove um autor pelo ID.
    async removerAutor(id: number): Promise<void> {

        const autorExistente = await this.autorRepository.buscarPorId(id);

        if (!autorExistente) {
            throw new Error("[ERRO] Autor não encontrado.");
        }

        await this.autorRepository.remover(id);

        console.log("[OK] Autor removido com sucesso.");
    }
}
