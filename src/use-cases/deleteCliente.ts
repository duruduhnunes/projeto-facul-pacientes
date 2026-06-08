import { Injectable } from '@nestjs/common';
import { NotFoundExceptionComId } from 'src/exceptions/cliente.exception';
import { ClientesRepository } from 'src/repository/cliente.repository';

@Injectable()
export class DeleteClientesCase {
  constructor(private readonly clientesRepository: ClientesRepository) {}
  async execute(id: string): Promise<{ message: string }> {
    const cliente = await this.clientesRepository.findById(id);
    if (!cliente) {
      throw new NotFoundExceptionComId();
    }
    await this.clientesRepository.delete(id);
    return {
      message: 'Cliente deletado com sucesso',
    };
  }
}
