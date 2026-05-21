import { Injectable } from '@nestjs/common';
import { NotFoundExceptionComId } from 'src/exceptions/paciente.exception';
import { PacientesRepository } from 'src/repository/paciente.repository';

@Injectable()
export class DeletePacientesCase {
  constructor(private readonly pacientesRepository: PacientesRepository) {}
  async execute(id: string): Promise<void> {
    const paciente = await this.pacientesRepository.findById(id);
    if (!paciente) {
      throw new NotFoundExceptionComId();
    }
    await this.pacientesRepository.delete(id);
  }
}
