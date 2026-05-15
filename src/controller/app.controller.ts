import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    return this.pacientesService.getPacienteByEmail(email);
  }

  @Get(':id')
  async getPacienteById(@Param('id') id: string) {
    return this.pacientesService.getPacienteById(id);
  }

  @Put(':id')
  async updatedPaciente(
    @Param('id') id: string,
    @Body() body: UpdatePacienteDto,
  ) {
    return this.pacientesService.updatePaciente(id, body);
  }
  
  @Delete(':id')
  async deletePaciente(@Param('id') id: string) {
    return this.pacientesService.deletePaciente(id);
  }
  }