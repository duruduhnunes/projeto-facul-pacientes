import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePacienteCase } from 'src/use-cases/createPaciente';
import { CreatePacienteDto } from 'src/dto/create-paciente.dto';
import { GetAllPacienteCase } from 'src/use-cases/getAllPaciente';
import { UpdatePacienteCase } from 'src/use-cases/updatePaciente';
import { DeletePacientesCase } from 'src/use-cases/deletePaciente';
import { GetByIdPacienteCase } from 'src/use-cases/getByIdPaciente';

@Controller('/pacientes')
export class PacienteController {
  constructor(
    private readonly createPacienteCase: CreatePacienteCase,
    private readonly getAllPacienteCase: GetAllPacienteCase,
    private readonly updatePacienteCase: UpdatePacienteCase,
    private readonly deletePacienteCase: DeletePacientesCase,
    private readonly getByIdPacienteCase: GetByIdPacienteCase,
  ) {}

  @Post()
  async createPaciente(@Body() paciente: CreatePacienteDto) {
    return this.createPacienteCase.execute(paciente);
  }

  @Get()
  async getAllPacientes() {
    return this.getAllPacienteCase.execute();
  }

  @Put(':id')
  async updatePaciente(
    @Body() paciente: CreatePacienteDto,
    @Param('id') id: string,
  ) {
    return this.updatePacienteCase.execute(
      id,
      paciente.nome,
      paciente.email,
      paciente.telefone,
    );
  }

  @Delete(':id')
  async deletePaciente(@Param('id') id: string) {
    return this.deletePacienteCase.execute(id);
  }

  @Get(':id')
  async getPacienteById(@Param('id') id: string) {
    return this.getByIdPacienteCase.execute(id);
  }
}
