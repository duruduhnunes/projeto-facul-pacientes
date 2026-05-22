import { Injectable } from '@nestjs/common';
import {
  EmailJaCadastradoException,
  NotFoundExceptionComId,
} from 'src/exceptions/paciente.exception';
import { PacientesRepository } from 'src/repository/paciente.repository';

@Injectable()
export class UpdatePacienteCase {
  constructor(private readonly pacientesRepository: PacientesRepository) {}

  async execute(id: string, body: { nome?: string; email?: string; telefone?: string }) {
    const paciente = await this.pacientesRepository.findById(id);
    if (!paciente) {
      throw new NotFoundExceptionComId();
    }

    if (body.email) {
      const emailExists = await this.pacientesRepository.findByEmail(body.email);
      if (emailExists && emailExists.id !== id) {
        throw new EmailJaCadastradoException();
      }
    }

    const pacienteAtualizado = await this.pacientesRepository.update(id, body);
    return { message: 'Paciente atualizado com sucesso', paciente: pacienteAtualizado };
  }
}
