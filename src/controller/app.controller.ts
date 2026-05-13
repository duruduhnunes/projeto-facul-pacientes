import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { pacientesService } from 'src/service/paciente.service';

@Controller('/pacientes')
export class pacientesController {
  constructor(private readonly pacientesService: pacientesService) {}

  @Post()
  async createPaciente(@Body() body: any) {
    const { nome, email, telefone } = body;
    const paciente = await this.pacientesService.createPaciente(
      nome,
      email,
      telefone,
    );
    return paciente;
  }

  @Put(':id')
  async updatedPaciente(@Param('id') id: string, @Body() body: any) {
    await this.pacientesService.updatePaciente(id, body);
    return {
      message: 'Paciente atualizado com sucesso',
    };
  }
}
