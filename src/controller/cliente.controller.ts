import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateClienteCase } from 'src/use-cases/createCliente';
import { CreateClienteDto } from 'src/dto/create-cliente.dto';
import { GetAllClienteCase } from 'src/use-cases/getAllCliente';
import { UpdateClienteCase } from 'src/use-cases/updateCliente';
import { DeleteClientesCase } from 'src/use-cases/deleteCliente';
import { GetByIdClienteCase } from 'src/use-cases/getByIdCliente';
import { GetByEmailClienteCase } from 'src/use-cases/getByEmailCliente';
import { UpdateClienteDto } from 'src/dto/update-cliente.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('/clientes')
export class ClienteController {
  constructor(
    private readonly createClienteCase: CreateClienteCase,
    private readonly getAllClienteCase: GetAllClienteCase,
    private readonly updateClienteCase: UpdateClienteCase,
    private readonly deleteClienteCase: DeleteClientesCase,
    private readonly getByIdClienteCase: GetByIdClienteCase,
    private readonly getByEmailClienteCase: GetByEmailClienteCase,
  ) {}

  @Post()
  async createCliente(@Body() cliente: CreateClienteDto) {
    return this.createClienteCase.execute(cliente);
  }

  @Get()
  async getAllClientes(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.getAllClienteCase.execute(
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
    );
  }

  @Put(':id')
  async updateCliente(
    @Body() cliente: UpdateClienteDto,
    @Param('id') id: string,
  ) {
    return this.updateClienteCase.execute(id, cliente);
  }

  @Delete(':id')
  async deleteCliente(@Param('id') id: string) {
    return this.deleteClienteCase.execute(id);
  }

  @Get('email/:email')
  async getClienteByEmail(@Param('email') email: string) {
    return this.getByEmailClienteCase.execute(email);
  }

  @Get(':id')
  async getClienteById(@Param('id') id: string) {
    return this.getByIdClienteCase.execute(id);
  }
}
