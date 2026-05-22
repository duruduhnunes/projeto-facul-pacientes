import { Injectable } from '@nestjs/common';
import { NotFoundExceptionComEmail } from 'src/exceptions/paciente.exception';
import { PacientesRepository } from 'src/repository/paciente.repository';

@Injectable()
export class GetByEmailPacienteCase {
  constructor(private readonly pacienteRepository: PacientesRepository) {}
  async execute(email: string) {
    const paciente = await this.pacienteRepository.findByEmail(email);
    if (!paciente) {
      throw new NotFoundExceptionComEmail();
    }
    return { message: 'Paciente encontrado com sucesso', paciente };
  }
}
