import { Injectable } from '@nestjs/common';
import { ClienteEntity } from 'src/entities/clientes.entity';
import { ClientesRepository } from 'src/repository/cliente.repository';

export interface GetAllClienteResponse {
  clientes: ClienteEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class GetAllClienteCase {
  constructor(private readonly clientesRepository: ClientesRepository) {}

  async execute(page = 1, limit = 10): Promise<GetAllClienteResponse> {
    const { clientes, total } = await this.clientesRepository.findAll(
      page,
      limit,
    );
    return {
      clientes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
