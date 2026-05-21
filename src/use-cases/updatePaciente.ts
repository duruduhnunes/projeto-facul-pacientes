import { Injectable } from '@nestjs/common';
import {
  EmailJaCadastradoException,
  NotFoundExceptionComId,
} from 'src/exceptions/paciente.exception';
import { PacientesRepository } from 'src/repository/paciente.repository';

@Injectable()
export class UpdatePacienteCase {
  constructor(private readonly pacientesRepository: PacientesRepository) {}

  async execute(id: string, nome: string, email: string, telefone: string) {
    const paciente = await this.pacientesRepository.findById(id);
    if (!paciente) {
      throw new NotFoundExceptionComId();
    }

    const emailExists = await this.pacientesRepository.findByEmail(email);
    if (emailExists && emailExists.id !== id) {
      throw new EmailJaCadastradoException();
    }

    const updatedPaciente = await this.pacientesRepository.update(id, {
      nome,
      email,
      telefone,
    });

    return updatedPaciente;
  }
}
