import { AutorRepository } from "../repositories/AutorRepository.js";
import { type Autor } from "../models/Interfaces.js";

export class AutorService {

    private autorRepository: AutorRepository;

    constructor(autorRepository: AutorRepository) {
        this.autorRepository = autorRepository;
    }

    async cadastrarAutor(autor: Autor): Promise<void> {

        if (!autor.nome) {
            throw new Error("Nome do autor é obrigatório.");
        }

        const autorExistente = await this.autorRepository.buscarPorNome(
            autor.nome
        );

        if (autorExistente) {
            throw new Error("Autor já existe.");
        }

        await this.autorRepository.inserir(autor);

        console.log("[OK] Autor cadastrado com sucesso.");
    }


    async atualizarAutor(id: number, nome: string, pais: string): Promise<void> {

    const autorExistente = await this.autorRepository.buscarPorId(id);

    if (!autorExistente) {
        throw new Error("Autor não encontrado.");
    }

    if (!nome) {
        throw new Error("Nome do autor é obrigatório.");
    }

    const autorComMesmoNome = await this.autorRepository.buscarPorNome(nome);

    if (autorComMesmoNome && autorComMesmoNome.id !== id) {
        throw new Error("Já existe outro autor com esse nome.");
    }

    await this.autorRepository.atualizar({
        id,
        nome,
        nacionalidade: pais,
        nascimento: autorExistente.nascimento
    });

    console.log("[OK] Autor atualizado com sucesso.");
}

    async buscarPorId(id: number): Promise<Autor | null> {

        const autor = await this.autorRepository.buscarPorId(id);

        if (!autor) {
            console.log("[AVISO] Autor não encontrado.");
            return null;
        }

        console.log("[OK] Autor encontrado.");

        return autor;
    }

    async listarTodos(): Promise<Autor[]> {

        const autores = await this.autorRepository.listarTodos();

        if (autores.length === 0) {
            console.log("[AVISO] Não há autores cadastrados.");
            return [];
        }

        return autores;
    }

    async remover(id: number): Promise<void> {

        const autorExistente = await this.autorRepository.buscarPorId(id);

        if (!autorExistente) {
            throw new Error("Autor não encontrado.");
        }

        await this.autorRepository.remover(id);

        console.log("[OK] Autor removido com sucesso.");
    }
}