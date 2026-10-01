export interface Autor {
    id: number;
    nome: string;
    nacionalidade?: string;
    nascimento?: Date;
}

export interface Livro {
    id: number;
    titulo: string;
    ano_publicacao?: number;
    genero?: string;
    autor_id: number;
    estoque: number;
}

export interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone?: string;
}

export interface Emprestimo {
    id: number;
    livro_id: number;
    cliente_id: number;
    data_emprestimo: Date;
    data_devolucao?: Date;
}