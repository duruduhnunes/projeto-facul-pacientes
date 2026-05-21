import { Injectable } from '@nestjs/common';
import { NotFoundExceptionComEmail } from 'src/exceptions/paciente.exception';
import { PacientesRepository } from 'src/repository/paciente.repository';

@Injectable()
export class GetByEmailPacienteCase {
  constructor(private readonly pacienteRepository: PacientesRepository) {}
  execute(email: string) {
    const emailExists = this.pacienteRepository.findByEmail(email);
    if (!emailExists) {
      throw new NotFoundExceptionComEmail();
    }
    return emailExists;
  }
}
