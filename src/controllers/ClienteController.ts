import { ClienteService } from "../services/ClienteService.js";
import { type Cliente } from "../models/Interfaces.js";
import readline from "readline";

export class ClienteController {

    constructor(
        private clienteService: ClienteService,
        private rl: readline.Interface
    ) {}


    private perguntar(pergunta: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(pergunta, resolve);
        });
    }


    // Cadastra um novo cliente
    async cadastrarCliente(): Promise<void> {

        const nome = await this.perguntar("Nome do cliente: ");

        const email =
            await this.perguntar("E-mail: ");

        const telefone =
            await this.perguntar("Telefone: ");

        const cliente: Cliente = {
            id: 0,
            nome,
            email,
            telefone: telefone || null
        };

        try {
            await this.clienteService.cadastrarCliente(cliente);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Lista todos os clientes cadastrados
    async listarClientes(): Promise<void> {

        try {
            const clientes =
                await this.clienteService.listarTodosClientes();

            if (clientes.length === 0) {
                return;
            }

            console.log("\n===== CLIENTES =====");

            clientes.forEach((cliente) => {
                console.log(`ID: ${cliente.id}`);
                console.log(`Nome: ${cliente.nome}`);
                console.log(`E-mail: ${cliente.email}`);
                console.log(`Telefone: ${cliente.telefone ?? "-"}`);
                console.log("--------------------");
            });

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Busca um cliente pelo ID
    async buscarClientePorId(): Promise<void> {

        const entrada = await this.perguntar(
            "Digite o ID do cliente: "
        );

        const id = Number(entrada);

        try {
            const cliente =
                await this.clienteService.buscarClientePorId(id);

            if (!cliente) {
                return;
            }

            console.log("\n===== CLIENTE =====");
            console.log(`ID: ${cliente.id}`);
            console.log(`Nome: ${cliente.nome}`);
            console.log(`E-mail: ${cliente.email}`);
            console.log(`Telefone: ${cliente.telefone ?? "-"}`);

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Atualiza os dados de um cliente
    async atualizarCliente(): Promise<void> {

        const entradaId = await this.perguntar(
            "Digite o ID do cliente: "
        );

        const id = Number(entradaId);

        try {
            const cliente =
                await this.clienteService.buscarClientePorId(id);

            if (!cliente) {
                return;
            }

            console.log("\n===== ATUALIZAR CLIENTE =====");

            const nome = await this.perguntar(
                `Nome (${cliente.nome}) - Enter para manter: `
            );

            const email = await this.perguntar(
                `E-mail (${cliente.email}) - Enter para manter: `
            );

            const telefone = await this.perguntar(
                `Telefone (${cliente.telefone ?? "-"}) - Enter para manter: `
            );

            const novoNome = nome || cliente.nome;

            const novoEmail = email || cliente.email;

            const novoTelefone =
                telefone || cliente.telefone;

            await this.clienteService.atualizarCliente(
                id,
                novoNome,
                novoEmail,
                novoTelefone
            );

        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }


    // Remove um cliente pelo ID
    async removerCliente(): Promise<void> {

        const entrada = await this.perguntar(
            "Digite o ID do cliente: "
        );

        const id = Number(entrada);

        try {
            await this.clienteService.removerCliente(id);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
}