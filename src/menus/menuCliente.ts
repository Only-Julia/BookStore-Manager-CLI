import { ClienteController } from "../controllers/ClienteController.js";
import readline from "readline";

export async function menuCliente(
    clienteController: ClienteController,
    rl: readline.Interface
): Promise<void> {

    let opcao: string;

    do {
        console.log("\n===== MENU CLIENTES =====");
        console.log("1 - Cadastrar cliente");
        console.log("2 - Listar clientes");
        console.log("3 - Consultar cliente por ID");
        console.log("4 - Atualizar cliente");
        console.log("5 - Remover cliente");
        console.log("0 - Voltar");

        opcao = await new Promise((resolve) => {
            rl.question("Escolha uma opção: ", resolve);
        });

        switch (opcao) {

            case "1":
                await clienteController.cadastrarCliente();
                break;

            case "2":
                await clienteController.listarClientes();
                break;

            case "3":
                await clienteController.buscarClientePorId();
                break;

            case "4":
                await clienteController.atualizarCliente();
                break;

            case "5":
                await clienteController.removerCliente();
                break;

            case "0":
                console.log("[INFO] Voltando ao menu principal...");
                break;

            default:
                console.log("[ERRO] Opção inválida.");
        }

    } while (opcao !== "0");
}