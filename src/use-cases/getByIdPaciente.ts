import { Injectable } from '@nestjs/common';
import { NotFoundExceptionComId } from 'src/exceptions/paciente.exception';
import { PacientesRepository } from 'src/repository/paciente.repository';

@Injectable()
export class GetByIdPacienteCase {
  constructor(private readonly pacienteRepository: PacientesRepository) {}

  async execute(id: string) {
    const paciente = await this.pacienteRepository.findById(id);
    if (!paciente) {
      throw new NotFoundExceptionComId();
    }
    return paciente;
  }
}
