import { menuAutor } from "./menuAutor.js";
import readline from "readline";
import { AutorController } from "../controllers/AutorController.js";

export async function menuPrincipal(
    autorController: AutorController,
    rl: readline.Interface
): Promise<void> {

    let opcao: string;

    do {
        console.log("\n===== MENU PRINCIPAL =====");
        console.log("1 - Autores");
        console.log("2 - Livros");
        console.log("3 - Clientes");
        console.log("4 - Empréstimos");
        console.log("5 - Relatórios");
        console.log("0 - Sair");

        opcao = await new Promise((resolve) => {
            rl.question("Escolha uma opção: ", resolve);
        });

        switch (opcao) {

            case "1":
                await menuAutor(autorController, rl);
                break;

            case "2":
                console.log("[INFO] Menu de livros ainda não implementado.");
                break;

            case "3":
                console.log("[INFO] Menu de clientes ainda não implementado.");
                break;

            case "4":
                console.log("[INFO] Menu de empréstimos ainda não implementado.");
                break;

            case "5":
                console.log("[INFO] Menu de relatórios ainda não implementado.");
                break;

            case "0":
                console.log("[INFO] Encerrando o sistema...");
                break;

            default:
                console.log("[ERRO] Opção inválida.");
        }

    } while (opcao !== "0");
}