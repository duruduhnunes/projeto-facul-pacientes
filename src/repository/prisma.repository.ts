import { Injectable } from '@nestjs/common';
import { ClientesRepository } from './cliente.repository';
import { PrismaService } from 'src/service/prisma.service';
import { ClienteEntity } from 'src/entities/clientes.entity';

@Injectable()
export class ClientePrismaRepository extends ClientesRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async save(cliente: ClienteEntity): Promise<ClienteEntity> {
    const createdCliente = await this.prisma.clientes.create({
      data: {
        email: cliente.email,
        nome: cliente.nome,
        telefone: cliente.telefone,
      },
    });
    return createdCliente;
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ clientes: ClienteEntity[]; total: number }> {
    const skip = (page - 1) * limit;
    const [clientes, total] = await Promise.all([
      this.prisma.clientes.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.clientes.count(),
    ]);
    return { clientes, total };
  }

  async findByEmail(email: string): Promise<ClienteEntity | null> {
    return this.prisma.clientes.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<ClienteEntity | null> {
    return this.prisma.clientes.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    cliente: Partial<ClienteEntity>,
  ): Promise<ClienteEntity> {
    return this.prisma.clientes.update({
      where: { id },
      data: cliente,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.clientes.delete({
      where: { id },
    });
  }
}
