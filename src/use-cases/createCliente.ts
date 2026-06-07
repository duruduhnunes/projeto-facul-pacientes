import { Injectable } from '@nestjs/common';
import { ClienteEntity } from 'src/entities/clientes.entity';
import {
  CamposObrigatoriosException,
  EmailJaCadastradoException,
} from 'src/exceptions/cliente.exception';
import { ClientesRepository } from 'src/repository/cliente.repository';

export interface CreateClienteRequest {
  nome: string;
  email: string;
  telefone: string;
}

export interface CreateClienteResponse {
  cliente: ClienteEntity;
}

@Injectable()
export class CreateClienteCase {
  constructor(private readonly clientesRepository: ClientesRepository) {}

  async execute({
    email,
    nome,
    telefone,
  }: CreateClienteRequest): Promise<CreateClienteResponse> {
    if (!email || !nome || !telefone) {
      throw new CamposObrigatoriosException();
    }

    const emailExists = await this.clientesRepository.findByEmail(email);
    if (emailExists) {
      throw new EmailJaCadastradoException();
    }

    const _cliente = ClienteEntity.create(email, nome, telefone);
    const cliente = await this.clientesRepository.save(_cliente);
    return { cliente };
  }
}
