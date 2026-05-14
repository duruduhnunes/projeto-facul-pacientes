import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { pacientesService } from 'src/service/paciente.service';
import { CreatePacienteDto } from 'src/dto/create-paciente.dto';
import { UpdatePacienteDto } from 'src/dto/update-paciente.dto';

@Controller('/pacientes')
export class pacientesController {
  constructor(private readonly pacientesService: pacientesService) {}

  @Post()
  async createPaciente(@Body() body: CreatePacienteDto) {
    const { nome, email, telefone } = body;
    return this.pacientesService.createPaciente(nome, email, telefone);
  }

  @Get()
  async getAllPacientes() {
    return this.pacientesService.getAllPacientes();
  }

  @Get('email/:email')
  async getPacienteByEmail(@Param('email') email: string) {
    const paciente = await this.pacientesService.getPacienteByEmail(email);
    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado com esse email');
    }
    return paciente;
  }

  @Get(':id')
  async getPacienteById(@Param('id') id: string) {
    const paciente = await this.pacientesService.getPacienteById(id);
    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }
    return paciente;
  }

  @Put(':id')
  async updatedPaciente(
    @Param('id') id: string,
    @Body() body: UpdatePacienteDto,
  ) {
    await this.pacientesService.updatePaciente(id, body);
    return {
      message: 'Paciente atualizado com sucesso',
    };
  }
}
