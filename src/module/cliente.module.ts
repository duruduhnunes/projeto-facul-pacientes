import { Module } from '@nestjs/common';
import { ClienteController } from 'src/controller/cliente.controller';
import { ClientesRepository } from 'src/repository/cliente.repository';
import { ClientePrismaRepository } from 'src/repository/prisma.repository';
import { CreateClienteCase } from 'src/use-cases/createCliente';
import { DeleteClientesCase } from 'src/use-cases/deleteCliente';
import { GetAllClienteCase } from 'src/use-cases/getAllCliente';
import { GetByEmailClienteCase } from 'src/use-cases/getByEmailCliente';
import { GetByIdClienteCase } from 'src/use-cases/getByIdCliente';
import { UpdateClienteCase } from 'src/use-cases/updateCliente';

@Module({
  controllers: [ClienteController],
  providers: [
    {
      provide: ClientesRepository,
      useClass: ClientePrismaRepository,
    },
    CreateClienteCase,
    GetAllClienteCase,
    DeleteClientesCase,
    UpdateClienteCase,
    GetByIdClienteCase,
    GetByEmailClienteCase,
  ],
  exports: [
    CreateClienteCase,
    GetAllClienteCase,
    DeleteClientesCase,
    UpdateClienteCase,
    GetByIdClienteCase,
    GetByEmailClienteCase,
  ],
})
export class ClienteModule {}
