import { LivroService } from "../services/LivroService.js";
import { type Livro } from "../models/Interfaces.js";
import readline from "readline";

export class LivroController {

    constructor(
        private livroService: LivroService,
        private rl: readline.Interface
    ) {}


    private perguntar(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, resolve);
        });
    }


    // Cadastra um novo livro
    async cadastrarLivro(): Promise<void> {

        const titulo = await this.perguntar("Título do livro: ");

        const anoPublicacao = await this.perguntar(
            "Ano de publicação (Enter para deixar vazio): "
        );

        const genero = await this.perguntar("Gênero: ");

        const autorId = await this.perguntar("ID do autor: ");

        const estoque = await this.perguntar("Estoque inicial: ");

        const livro: Livro = {
            id: 0,
            titulo,
            ano_publicacao: anoPublicacao
                ? Number(anoPublicacao)
                : null,
            genero,
            autor_id: Number(autorId),
            estoque: Number(estoque)
        };

        try {
            await this.livroService.cadastrarLivro(livro);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Lista todos os livros cadastrados
    async listarLivros(): Promise<void> {

        try {
            const livros =
                await this.livroService.listarTodosLivros();

            if (livros.length === 0) {
                return;
            }

            console.log("\n===== LIVROS =====");

            livros.forEach((livro) => {
                console.log(`ID: ${livro.id}`);
                console.log(`Título: ${livro.titulo}`);
                console.log(`Ano de publicação: ${livro.ano_publicacao ?? "-"}`);
                console.log(`Gênero: ${livro.genero}`);
                console.log(`ID do autor: ${livro.autor_id}`);
                console.log(`Estoque: ${livro.estoque}`);
                console.log("--------------------");
            });

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Busca um livro pelo ID
    async buscarLivroPorId(): Promise<void> {

        const entrada = await this.perguntar(
            "Digite o ID do livro: "
        );

        const id = Number(entrada);

        try {
            const livro =
                await this.livroService.buscarLivroPorId(id);

            if (!livro) {
                return;
            }

            console.log("\n===== LIVRO =====");
            console.log(`ID: ${livro.id}`);
            console.log(`Título: ${livro.titulo}`);
            console.log(`Ano de publicação: ${livro.ano_publicacao ?? "-"}`);
            console.log(`Gênero: ${livro.genero}`);
            console.log(`ID do autor: ${livro.autor_id}`);
            console.log(`Estoque: ${livro.estoque}`);

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Busca um livro pelo título
    async buscarLivroPorNome(): Promise<void> {

        const nome = await this.perguntar(
            "Digite o título do livro: "
        );

        try {
            const livro =
                await this.livroService.buscarLivroPorNome(nome);

            if (!livro) {
                return;
            }

            console.log("\n===== LIVRO =====");
            console.log(`ID: ${livro.id}`);
            console.log(`Título: ${livro.titulo}`);
            console.log(`Ano de publicação: ${livro.ano_publicacao ?? "-"}`);
            console.log(`Gênero: ${livro.genero}`);
            console.log(`ID do autor: ${livro.autor_id}`);
            console.log(`Estoque: ${livro.estoque}`);

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Atualiza os dados de um livro
    async atualizarLivro(): Promise<void> {

        const entradaId = await this.perguntar(
            "Digite o ID do livro: "
        );

        const id = Number(entradaId);

        try {
            const livro =
                await this.livroService.buscarLivroPorId(id);

            if (!livro) {
                return;
            }

            console.log("\n===== ATUALIZAR LIVRO =====");

            const titulo = await this.perguntar(
                `Título (${livro.titulo}) - Enter para manter: `
            );

            const anoPublicacao = await this.perguntar(
                `Ano de publicação (${livro.ano_publicacao ?? "-"}) - Enter para manter: `
            );

            const genero = await this.perguntar(
                `Gênero (${livro.genero}) - Enter para manter: `
            );

            const autorId = await this.perguntar(
                `ID do autor (${livro.autor_id}) - Enter para manter: `
            );

            const estoque = await this.perguntar(
                `Estoque (${livro.estoque}) - Enter para manter: `
            );

            const novoTitulo = titulo || livro.titulo;

            const novoAnoPublicacao = anoPublicacao
                ? Number(anoPublicacao)
                : livro.ano_publicacao ?? null;

            const novoGenero = genero || livro.genero;

            const novoAutorId = autorId
                ? Number(autorId)
                : livro.autor_id;

            const novoEstoque = estoque
                ? Number(estoque)
                : livro.estoque;

            await this.livroService.atualizarLivro(
                id,
                novoTitulo,
                novoAnoPublicacao,
                novoGenero,
                novoAutorId,
                novoEstoque
            );

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Adiciona unidades ao estoque de um livro
    async adicionarLivro(): Promise<void> {

        const entradaId = await this.perguntar(
            "Digite o ID do livro: "
        );

        const id = Number(entradaId);

        const entradaQuantidade = await this.perguntar(
            "Quantidade a adicionar ao estoque: "
        );

        const quantidade = Number(entradaQuantidade);

        try {
            await this.livroService.adicionarLivro(id, quantidade);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Remove um livro pelo ID
    async removerLivro(): Promise<void> {

        const entrada = await this.perguntar(
            "Digite o ID do livro: "
        );

        const id = Number(entrada);

        try {
            await this.livroService.removerLivro(id);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
}