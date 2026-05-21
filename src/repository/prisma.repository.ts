import { Injectable } from '@nestjs/common';
import { PacientesRepository } from './paciente.repository';
import { PrismaService } from 'src/service/prisma.service';
import { PacienteEntity } from 'src/entities/pacientes.entity';

@Injectable()
export class PacientePrismaRepository extends PacientesRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async save(paciente: PacienteEntity): Promise<PacienteEntity> {
    const createdPaciente = await this.prisma.pacientes.create({
      data: {
        email: paciente.email,
        nome: paciente.nome,
        telefone: paciente.telefone,
      },
    });
    return createdPaciente;
  }

  async findAll(): Promise<PacienteEntity[]> {
    return this.prisma.pacientes.findMany();
  }

  async findByEmail(email: string): Promise<PacienteEntity | null> {
    return this.prisma.pacientes.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<PacienteEntity | null> {
    return this.prisma.pacientes.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    paciente: Partial<PacienteEntity>,
  ): Promise<PacienteEntity> {
    return this.prisma.pacientes.update({
      where: { id },
      data: paciente,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pacientes.delete({
      where: { id },
    });
  }
}
