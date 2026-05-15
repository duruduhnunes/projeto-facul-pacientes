import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UpdatePacienteDto } from 'src/dto/update-paciente.dto';

@Injectable()
export class pacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async createPaciente(nome: string, email: string, telefone: string) {
    const emailExists = await this.prisma.pacientes.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      return null;
    }

    const paciente = await this.prisma.pacientes.create({
      data: {
        nome,
        email,
        telefone,
      },
    });

    return paciente;
  }

  async getAllPacientes() {
    return this.prisma.pacientes.findMany();
  }

  async getPacienteById(id: string) {
    return this.prisma.pacientes.findUnique({
      where: { id },
    });
  }

  async getPacienteByEmail(email: string) {
    return this.prisma.pacientes.findUnique({
      where: { email },
    });
  }

  async updatePaciente(id: string, body: UpdatePacienteDto) {
    const pacienteExists = await this.prisma.pacientes.findUnique({
      where: {
        id,
      },
    });

    if (!pacienteExists) {
      return 'PACIENTE_NOT_FOUND';
    }

    if (body.email) {
      const emailExists = await this.prisma.pacientes.findUnique({
        where: {
          email: body.email,
        },
      });

      if (emailExists && emailExists.id !== id) {
        return 'EMAIL_ALREADY_EXISTS';
      }
    }

    const pacienteUpdated = await this.prisma.pacientes.update({
      where: {
        id,
      },
      data: body,
    });

    return pacienteUpdated;
  }
}