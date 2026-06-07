import { Injectable } from '@nestjs/common';
import { NotFoundExceptionComId } from 'src/exceptions/cliente.exception';
import { ClientesRepository } from 'src/repository/cliente.repository';

@Injectable()
export class GetByIdClienteCase {
  constructor(private readonly clienteRepository: ClientesRepository) {}

  async execute(id: string) {
    const cliente = await this.clienteRepository.findById(id);
    if (!cliente) {
      throw new NotFoundExceptionComId();
    }
    return { message: 'Cliente encontrado com sucesso', cliente };
  }
}
