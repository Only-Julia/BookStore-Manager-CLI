import { AutorService } from "../services/AutorService.js";
import { type Autor } from "../models/Interfaces.js";
import readline from "readline";

export class AutorController {

    constructor(
        private autorService: AutorService,
        private rl: readline.Interface
    ) {}


    private perguntar(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, resolve);
        });
    }


    // Cadastra um novo autor
    async cadastrarAutor(): Promise<void> {

        const nome = await this.perguntar("Nome do autor: ");

        const nacionalidade =
            await this.perguntar("Nacionalidade: ");

        const nascimento =
            await this.perguntar(
                "Data de nascimento (AAAA-MM-DD): "
            );

        const autor: Autor = {
            id: 0,
            nome,
            nacionalidade: nacionalidade || null,
            nascimento: nascimento
                ? new Date(nascimento)
                : null
        };

        try {
            await this.autorService.cadastrarAutor(autor);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Lista todos os autores cadastrados
    async listarAutores(): Promise<void> {

        try {
            const autores =
                await this.autorService.listarTodosAutores();

            if (autores.length === 0) {
                return;
            }

            console.log("\n===== AUTORES =====");

            autores.forEach((autor) => {
                console.log(`ID: ${autor.id}`);
                console.log(`Nome: ${autor.nome}`);
                console.log(`Nacionalidade: ${autor.nacionalidade ?? "-"}`);
                console.log(
                    `Nascimento: ${
                        autor.nascimento
                            ? autor.nascimento.toLocaleDateString("pt-BR")
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


    // Busca um autor pelo ID
    async buscarAutorPorId(): Promise<void> {

        const entrada = await this.perguntar(
            "Digite o ID do autor: "
        );

        const id = Number(entrada);

        try {
            const autor =
                await this.autorService.buscarAutorPorId(id);

            if (!autor) {
                return;
            }

            console.log("\n===== AUTOR =====");
            console.log(`ID: ${autor.id}`);
            console.log(`Nome: ${autor.nome}`);
            console.log(`Nacionalidade: ${autor.nacionalidade ?? "-"}`);
            console.log(
                `Nascimento: ${
                    autor.nascimento
                        ? autor.nascimento.toLocaleDateString("pt-BR")
                        : "-"
                }`
            );

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Atualiza os dados de um autor
    async atualizarAutor(): Promise<void> {

        const entradaId = await this.perguntar(
            "Digite o ID do autor: "
        );

        const id = Number(entradaId);

        try {
            const autor =
                await this.autorService.buscarAutorPorId(id);

            if (!autor) {
                return;
            }

            console.log("\n===== ATUALIZAR AUTOR =====");

            const nome = await this.perguntar(
                `Nome (${autor.nome}) - Enter para manter: `
            );

            const nacionalidade = await this.perguntar(
                `Nacionalidade (${autor.nacionalidade ?? "-"}) - Enter para manter: `
            );

            const nascimento = await this.perguntar(
                `Nascimento (${
                    autor.nascimento
                        ? autor.nascimento.toISOString().split("T")[0]
                        : "-"
                }) - Enter para manter: `
            );

            const novoNome = nome || autor.nome;

            const novaNacionalidade =
                nacionalidade || autor.nacionalidade;

            const novoNascimento =
                nascimento
                    ? new Date(nascimento)
                    : autor.nascimento;

            await this.autorService.atualizarAutor(
                id,
                novoNome,
                novaNacionalidade ?? "",
                novoNascimento
            );

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Remove um autor pelo ID
    async removerAutor(): Promise<void> {

        const entrada = await this.perguntar(
            "Digite o ID do autor: "
        );

        const id = Number(entrada);

        try {
            await this.autorService.removerAutor(id);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
}