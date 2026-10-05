import { EmprestimoController } from "../controllers/EmprestimoController.js";
import readline from "readline";

export async function menuEmprestimo(
    emprestimoController: EmprestimoController,
    rl: readline.Interface
): Promise<void> {

    let opcao: string;

    do {
        console.log("\n===== MENU EMPRÉSTIMOS =====");
        console.log("1 - Cadastrar empréstimo");
        console.log("2 - Listar empréstimos");
        console.log("3 - Devolver empréstimo");
        console.log("0 - Voltar");

        opcao = await new Promise((resolve) => {
            rl.question("Escolha uma opção: ", resolve);
        });

        switch (opcao) {

            case "1":
                await emprestimoController.cadastrarEmprestimo();
                break;

            case "2":
                await emprestimoController.listarEmprestimos();
                break;

            case "3":
                await emprestimoController.devolverEmprestimo();
                break;

            case "0":
                console.log("[INFO] Voltando ao menu principal...");
                break;

            default:
                console.log("[ERRO] Opção inválida.");
        }

    } while (opcao !== "0");
}