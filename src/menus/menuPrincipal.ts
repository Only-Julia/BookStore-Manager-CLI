import { menuAutor } from "./menuAutor.js";
import { menuLivro } from "./menuLivro.js";
import { menuCliente } from "./menuCliente.js";
import { menuEmprestimo } from "./menuEmprestimo.js";
import readline from "readline";
import { AutorController } from "../controllers/AutorController.js";
import { LivroController } from "../controllers/LivroController.js";
import { ClienteController } from "../controllers/ClienteController.js";
import { EmprestimoController } from "../controllers/EmprestimoController.js";

export async function menuPrincipal(
    autorController: AutorController,
    livroController: LivroController,
    clienteController: ClienteController,
    emprestimoController: EmprestimoController,
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
                await menuLivro(livroController, rl);
                break;

            case "3":
                await menuCliente(clienteController, rl);
                break;

            case "4":
                await menuEmprestimo(emprestimoController, rl);
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