import { Injectable } from '@nestjs/common';
import {
  EmailJaCadastradoException,
  NotFoundExceptionComId,
} from 'src/exceptions/cliente.exception';
import { ClientesRepository } from 'src/repository/cliente.repository';

@Injectable()
export class UpdateClienteCase {
  constructor(private readonly clientesRepository: ClientesRepository) {}

  async execute(id: string, body: { nome?: string; email?: string; telefone?: string }) {
    const cliente = await this.clientesRepository.findById(id);
    if (!cliente) {
      throw new NotFoundExceptionComId();
    }

    if (body.email) {
      const emailExists = await this.clientesRepository.findByEmail(body.email);
      if (emailExists && emailExists.id !== id) {
        throw new EmailJaCadastradoException();
      }
    }

    const clienteAtualizado = await this.clientesRepository.update(id, body);
    return { message: 'Cliente atualizado com sucesso', cliente: clienteAtualizado };
  }
}
