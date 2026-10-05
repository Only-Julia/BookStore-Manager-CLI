import { ClienteRepository } from "../repositories/ClienteRepository.js";
import { type Cliente } from "../models/Interfaces.js";

export class ClienteService {

    private clienteRepository: ClienteRepository;

    constructor(clienteRepository: ClienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Valida se o nome e o e-mail foram informados e se o cliente ainda não existe.
    async cadastrarCliente(cliente: Cliente): Promise<void> {

        if (!cliente.nome) {
            throw new Error("[ERRO] Nome do cliente é obrigatório.");
        }

        if (!cliente.email) {
            throw new Error("[ERRO] E-mail do cliente é obrigatório.");
        }

        const clienteExistente =
            await this.clienteRepository.buscarPorNome(cliente.nome);

        if (clienteExistente) {
            throw new Error("[ERRO] Cliente já existe.");
        }

        await this.clienteRepository.inserir(cliente);

        console.log("[OK] Cliente cadastrado com sucesso.");
    }


    // Valida se o cliente existe, se os dados foram informados e se o nome não é repetido.
    async atualizarCliente(
        id: number,
        nome: string,
        email: string,
        telefone: string | null
    ): Promise<void> {

        const clienteExistente =
            await this.clienteRepository.buscarPorId(id);

        if (!clienteExistente) {
            throw new Error("[ERRO] Cliente não encontrado.");
        }

        if (!nome) {
            throw new Error("[ERRO] Nome do cliente é obrigatório.");
        }

        if (!email) {
            throw new Error("[ERRO] E-mail do cliente é obrigatório.");
        }

        const clienteRepetido =
            await this.clienteRepository.buscarPorNome(nome);

        if (clienteRepetido && clienteRepetido.id !== id) {
            throw new Error("[ERRO] Já existe outro cliente com esse nome.");
        }

        await this.clienteRepository.atualizar({
            id,
            nome,
            email,
            telefone
        });

        console.log("[OK] Cliente atualizado com sucesso.");
    }


    // Busca um cliente pelo ID.
    async buscarClientePorId(id: number): Promise<Cliente | null> {

        const cliente = await this.clienteRepository.buscarPorId(id);

        if (!cliente) {
            console.log("[INFO] Cliente não encontrado.");
            return null;
        }

        return cliente;
    }


    // Lista todos os clientes cadastrados, ou lista vazia.
    async listarTodosClientes(): Promise<Cliente[]> {

        const clientes = await this.clienteRepository.listarTodos();

        if (clientes.length === 0) {
            console.log("[INFO] Não há clientes cadastrados.");
            return [];
        }

        return clientes;
    }


    // Remove um cliente pelo ID.
    async removerCliente(id: number): Promise<void> {

        const clienteExistente =
            await this.clienteRepository.buscarPorId(id);

        if (!clienteExistente) {
            throw new Error("[ERRO] Cliente não encontrado.");
        }

        await this.clienteRepository.remover(id);

        console.log("[OK] Cliente removido com sucesso.");
    }
}