import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { pacientesService } from 'src/service/paciente.service';

@Controller()
export class pacientesController {
  constructor(private readonly pacientesService: pacientesService) {}

  @Post('/pacientes')
  async createPaciente(@Body() body: any) {
    const { nome, email, telefone } = body;
    const paciente = await this.pacientesService.createPaciente(
      nome,
      email,
      telefone,
    );
    return {
      message: 'Paciente criado com sucesso',
      paciente,
    };
  }

  @Get('/pacientes')
  async getAllPacientes() {
    return this.pacientesService.getAllPacientes();
  }

  @Get('/pacientes/name/:nome')
  async getPacienteByNome(@Param('nome') nome: string) {
    const pacientes = await this.pacientesService.getPacienteByNome(nome);
    if (!pacientes.length) {
      throw new NotFoundException('Nenhum paciente encontrado com esse nome');
    }
    return pacientes;
  }

  @Get('/pacientes/email/:email')
  async getPacienteByEmail(@Param('email') email: string) {
    const paciente = await this.pacientesService.getPacienteByEmail(email);
    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado com esse email');
    }
    return paciente;
  }
}
