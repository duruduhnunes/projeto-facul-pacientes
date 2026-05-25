import { PacienteEntity } from 'src/entities/pacientes.entity';

export abstract class PacientesRepository {
  abstract save(paciente: PacienteEntity): Promise<PacienteEntity>;
  abstract findAll(
    page: number,
    limit: number,
  ): Promise<{ pacientes: PacienteEntity[]; total: number }>;
  abstract findByEmail(email: string): Promise<PacienteEntity | null>;
  abstract findById(id: string): Promise<PacienteEntity | null>;
  abstract update(
    id: string,
    paciente: Partial<PacienteEntity>,
  ): Promise<PacienteEntity>;
  abstract delete(id: string): Promise<void>;
}
