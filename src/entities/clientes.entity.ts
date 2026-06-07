import { randomUUID } from 'node:crypto';

export class ClienteEntity {
  constructor(id: string, nome: string, email: string, telefone: string) {
    this.id = id || randomUUID();
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
  }
  id: string;
  nome: string;
  email: string;
  telefone: string;

  static create(email: string, nome: string, telefone: string): ClienteEntity {
    return new ClienteEntity(randomUUID(), nome, email, telefone);
  }
}
