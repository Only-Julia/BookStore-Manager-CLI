import { RelatorioController } from "../controllers/RelatorioController.js";
import readline from "readline";

export async function menuRelatorio(
    relatorioController: RelatorioController,
    rl: readline.Interface
): Promise<void> {

    let opcao: string;

    do {
        console.log("\n===== MENU RELATÓRIOS =====");
        console.log("1 - Livros com estoque disponível");
        console.log("2 - Livros emprestados");
        console.log("3 - Livros cadastrados por autor");
        console.log("4 - Consultar empréstimos");
        console.log("5 - Quantidade total de empréstimos por livro");
        console.log("6 - Clientes com empréstimo ativo");
        console.log("0 - Voltar");

        opcao = await new Promise((resolve) => {
            rl.question("Escolha uma opção: ", resolve);
        });

        switch (opcao) {

            case "1":
                await relatorioController.livrosComEstoqueDisponivel();
                break;

            case "2":
                await relatorioController.livrosEmprestados();
                break;

            case "3":
                await relatorioController.livrosCadastradosPorAutor();
                break;

            case "4":
                await relatorioController.consultarEmprestimos();
                break;

            case "5":
                await relatorioController.quantidadeEmprestimosPorLivro();
                break;

            case "6":
                await relatorioController.clientesComEmprestimoAtivo();
                break;

            case "0":
                console.log("[INFO] Voltando ao menu principal...");
                break;

            default:
                console.log("[ERRO] Opção inválida.");
        }

    } while (opcao !== "0");
}