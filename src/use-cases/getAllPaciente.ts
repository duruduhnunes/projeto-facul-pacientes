import { Injectable } from '@nestjs/common';
import { PacienteEntity } from 'src/entities/pacientes.entity';
import { PacientesRepository } from 'src/repository/paciente.repository';

export interface GetAllPacienteResponse {
  pacientes: PacienteEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class GetAllPacienteCase {
  constructor(private readonly pacientesRepository: PacientesRepository) {}

  async execute(page = 1, limit = 10): Promise<GetAllPacienteResponse> {
    const { pacientes, total } = await this.pacientesRepository.findAll(
      page,
      limit,
    );
    return {
      pacientes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
