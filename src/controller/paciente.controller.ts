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
import { GetByEmailPacienteCase } from 'src/use-cases/getByEmailPaciente';
import { UpdatePacienteDto } from 'src/dto/update-paciente.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pacientes')
@Controller('/pacientes')
export class PacienteController {
  constructor(
    private readonly createPacienteCase: CreatePacienteCase,
    private readonly getAllPacienteCase: GetAllPacienteCase,
    private readonly updatePacienteCase: UpdatePacienteCase,
    private readonly deletePacienteCase: DeletePacientesCase,
    private readonly getByIdPacienteCase: GetByIdPacienteCase,
    private readonly getByEmailPacienteCase: GetByEmailPacienteCase,
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
    @Body() paciente: UpdatePacienteDto,
    @Param('id') id: string,
  ) {
    return this.updatePacienteCase.execute(id, paciente);
  }

  @Delete(':id')
  async deletePaciente(@Param('id') id: string) {
    return this.deletePacienteCase.execute(id);
  }

  @Get('email/:email')
  async getPacienteByEmail(@Param('email') email: string) {
    return this.getByEmailPacienteCase.execute(email);
  }

  @Get(':id')
  async getPacienteById(@Param('id') id: string) {
    return this.getByIdPacienteCase.execute(id);
  }
}
