import { Injectable } from '@nestjs/common';
import { PacienteEntity } from 'src/entities/pacientes.entity';
import { PacientesRepository } from 'src/repository/paciente.repository';

export interface GetAllPacienteResponse {
  pacientes: PacienteEntity[];
}
@Injectable()
export class GetAllPacienteCase {
  constructor(private readonly pacientesRepository: PacientesRepository) {}

  async execute(): Promise<GetAllPacienteResponse> {
    const pacientes = await this.pacientesRepository.findAll();
    return { pacientes };
  }
}
