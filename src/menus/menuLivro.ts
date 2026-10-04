import { LivroController } from "../controllers/LivroController.js";
import readline from "readline";

export async function menuLivro(
    livroController: LivroController,
    rl: readline.Interface
): Promise<void> {

    let opcao: string;

    do {
        console.log("\n===== MENU LIVROS =====");
        console.log("1 - Cadastrar livro");
        console.log("2 - Listar livros");
        console.log("3 - Consultar livro por ID");
        console.log("4 - Consultar livro por título");
        console.log("5 - Atualizar livro");
        console.log("6 - Adicionar ao estoque");
        console.log("7 - Remover livro");
        console.log("0 - Voltar");

        opcao = await new Promise((resolve) => {
            rl.question("Escolha uma opção: ", resolve);
        });

        switch (opcao) {

            case "1":
                await livroController.cadastrarLivro();
                break;

            case "2":
                await livroController.listarLivros();
                break;

            case "3":
                await livroController.buscarLivroPorId();
                break;

            case "4":
                await livroController.buscarLivroPorNome();
                break;

            case "5":
                await livroController.atualizarLivro();
                break;

            case "6":
                await livroController.adicionarLivro();
                break;

            case "7":
                await livroController.removerLivro();
                break;

            case "0":
                console.log("[INFO] Voltando ao menu principal...");
                break;

            default:
                console.log("[ERRO] Opção inválida.");
        }

    } while (opcao !== "0");
}