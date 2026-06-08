import { Injectable } from '@nestjs/common';
import { NotFoundExceptionComEmail } from 'src/exceptions/cliente.exception';
import { ClientesRepository } from 'src/repository/cliente.repository';

@Injectable()
export class GetByEmailClienteCase {
  constructor(private readonly clienteRepository: ClientesRepository) {}
  async execute(email: string) {
    const cliente = await this.clienteRepository.findByEmail(email);
    if (!cliente) {
      throw new NotFoundExceptionComEmail();
    }
    return { message: 'Cliente encontrado com sucesso', cliente };
  }
}
