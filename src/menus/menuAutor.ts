import { AutorController } from "../controllers/AutorController.js";
import readline from "readline";

export async function menuAutor(
    autorController: AutorController,
    rl: readline.Interface
): Promise<void> {

    let opcao: string;

    do {
        console.log("\n===== MENU AUTORES =====");
        console.log("1 - Cadastrar autor");
        console.log("2 - Listar autores");
        console.log("3 - Consultar autor por ID");
        console.log("4 - Atualizar autor");
        console.log("5 - Remover autor");
        console.log("0 - Voltar");

        opcao = await new Promise((resolve) => {
            rl.question("Escolha uma opção: ", resolve);
        });

        switch (opcao) {

            case "1":
                await autorController.cadastrarAutor();
                break;

            case "2":
                await autorController.listarAutores();
                break;

            case "3":
                await autorController.buscarAutorPorId();
                break;

            case "4":
                await autorController.atualizarAutor();
                break;

            case "5":
                await autorController.removerAutor();
                break;

            case "0":
                console.log("[INFO] Voltando ao menu principal...");
                break;

            default:
                console.log("[ERRO] Opção inválida.");
        }

    } while (opcao !== "0");
}