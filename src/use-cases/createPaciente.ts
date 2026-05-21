import { Injectable } from '@nestjs/common';
import { PacienteEntity } from 'src/entities/pacientes.entity';
import {
  CamposObrigatoriosException,
  EmailJaCadastradoException,
} from 'src/exceptions/paciente.exception';
import { PacientesRepository } from 'src/repository/paciente.repository';

export interface CreatePacienteRequest {
  nome: string;
  email: string;
  telefone: string;
}

export interface CreatePacienteResponse {
  paciente: PacienteEntity;
}

@Injectable()
export class CreatePacienteCase {
  constructor(private readonly pacientesRepository: PacientesRepository) {}

  async execute({
    email,
    nome,
    telefone,
  }: CreatePacienteRequest): Promise<CreatePacienteResponse> {
    if (!email || !nome || !telefone) {
      throw new CamposObrigatoriosException();
    }

    const emailExists = await this.pacientesRepository.findByEmail(email);
    if (emailExists) {
      throw new EmailJaCadastradoException();
    }

    const _paciente = PacienteEntity.create(email, nome, telefone);
    const paciente = await this.pacientesRepository.save(_paciente);
    return { paciente };
  }
}
