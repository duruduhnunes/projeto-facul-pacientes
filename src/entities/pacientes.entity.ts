import { randomUUID } from 'node:crypto';

export class PacienteEntity {
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

  static create(email: string, nome: string, telefone: string): PacienteEntity {
    return new PacienteEntity(randomUUID(), nome, email, telefone);
  }

  static get(
    id: string,
    email: string,
    nome: string,
    telefone: string,
  ): PacienteEntity {
    return new PacienteEntity(id, nome, email, telefone);
  }

  static findByEmail(
    id: string,
    email: string,
    nome: string,
    telefone: string,
  ): PacienteEntity {
    return new PacienteEntity(id, nome, email, telefone);
  }
  static findById(
    id: string,
    email: string,
    nome: string,
    telefone: string,
  ): PacienteEntity {
    return new PacienteEntity(id, nome, email, telefone);
  }

  static update(
    id: string,
    email: string,
    nome: string,
    telefone: string,
  ): PacienteEntity {
    return new PacienteEntity(id, nome, email, telefone);
  }
  static delete(
    id: string,
    email: string,
    nome: string,
    telefone: string,
  ): PacienteEntity {
    return new PacienteEntity(id, nome, email, telefone);
  }
}
