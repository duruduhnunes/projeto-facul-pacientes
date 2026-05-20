import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { pacientesService } from 'src/service/paciente.service';
import { CreatePacienteDto } from 'src/dto/create-paciente.dto';
import { UpdatePacienteDto } from 'src/dto/update-paciente.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Pacientes')
@Controller('/pacientes')
export class pacientesController {
  constructor(private readonly pacientesService: pacientesService) {}

  @ApiOperation({ summary: 'Criar um novo paciente' })
  @Post()
  async createPaciente(@Body() body: CreatePacienteDto) {
    const { nome, email, telefone } = body;
    return this.pacientesService.createPaciente(nome, email, telefone);
  }

  @ApiOperation({ summary: 'Listar todos os pacientes' })
  @Get()
  async getAllPacientes() {
    return this.pacientesService.getAllPacientes();
  }

  @ApiOperation({ summary: 'Obter paciente por email' })
  @Get('email/:email')
  async getPacienteByEmail(@Param('email') email: string) {
    return this.pacientesService.getPacienteByEmail(email);
  }

  @ApiOperation({ summary: 'Obter paciente por ID' })
  @Get(':id')
  async getPacienteById(@Param('id') id: string) {
    return this.pacientesService.getPacienteById(id);
  }

  @ApiOperation({ summary: 'Atualizar paciente por ID' })
  @Put(':id')
  async updatedPaciente(
    @Param('id') id: string,
    @Body() body: UpdatePacienteDto,
  ) {
    return this.pacientesService.updatePaciente(id, body);
  }

  @ApiOperation({ summary: 'Deletar paciente por ID' })
  @Delete(':id')
  async deletePaciente(@Param('id') id: string) {
    return this.pacientesService.deletePaciente(id);
  }
}
