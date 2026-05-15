import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { pacientesService } from 'src/service/paciente.service';
import { CreatePacienteDto } from 'src/dto/create-paciente.dto';
import { UpdatePacienteDto } from 'src/dto/update-paciente.dto';

@Controller('/pacientes')
export class pacientesController {
  constructor(private readonly pacientesService: pacientesService) {}

  @Post()
  async createPaciente(@Body() body: CreatePacienteDto) {
    const { nome, email, telefone } = body;

    if (!nome || !email || !telefone) {
      throw new BadRequestException(
        'Todos os campos são obrigatórios',
      );
    }

    const paciente = await this.pacientesService.createPaciente(
      nome,
      email,
      telefone,
    );

    if (!paciente) {
      throw new BadRequestException(
        'Email já cadastrado, utilize outro email',
      );
    }

    return {
      message: 'Paciente criado com sucesso',
      paciente,
    };
  }

  @Get()
  async getAllPacientes() {
    return this.pacientesService.getAllPacientes();
  }

  @Get('email/:email')
  async getPacienteByEmail(@Param('email') email: string) {
    const paciente = await this.pacientesService.getPacienteByEmail(email);

    if (!paciente) {
      throw new NotFoundException(
        'Paciente não encontrado com esse email',
      );
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
    const result = await this.pacientesService.updatePaciente(
      id,
      body,
    );

    if (result === 'PACIENTE_NOT_FOUND') {
      throw new NotFoundException(
        'Paciente não encontrado',
      );
    }

    if (result === 'EMAIL_ALREADY_EXISTS') {
      throw new BadRequestException(
        'Email já cadastrado, utilize outro email',
      );
    }

    return {
      message: 'Paciente atualizado com sucesso',
      paciente: result,
    };
  }
}