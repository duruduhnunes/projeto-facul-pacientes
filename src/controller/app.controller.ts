import { Body, Controller, Post } from '@nestjs/common';
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
}
