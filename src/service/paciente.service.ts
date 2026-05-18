import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UpdatePacienteDto } from 'src/dto/update-paciente.dto';

@Injectable()
export class pacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async createPaciente(nome: string, email: string, telefone: string) {
    if (!nome || !email || !telefone) {
      throw new BadRequestException(
        'Todos os campos são obrigatórios, ex: nome, email e telefone',
      );
    }

    const emailExists = await this.prisma.pacientes.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new BadRequestException(
        'Email já cadastrado, por favor utilize outro email',
      );
    }

    const paciente = await this.prisma.pacientes.create({
      data: {
        nome,
        email,
        telefone,
      },
    });

    return {
      message: 'Paciente criado com sucesso',
      paciente,
    };
  }

  async getAllPacientes() {
    return this.prisma.pacientes.findMany();
  }

  async getPacienteById(id: string) {
    const paciente = await this.prisma.pacientes.findUnique({
      where: { id },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return paciente;
  }

  async getPacienteByEmail(email: string) {
    const paciente = await this.prisma.pacientes.findUnique({
      where: { email },
    });

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado com esse email');
    }

    return paciente;
  }

  async updatePaciente(id: string, body: UpdatePacienteDto) {
    const pacienteExists = await this.prisma.pacientes.findUnique({
      where: {
        id,
      },
    });

    if (!pacienteExists) {
      throw new NotFoundException(
        'Paciente não encontrado, por favor, verifique o id e tente novamente',
      );
    }

    if (body.email) {
      const emailExists = await this.prisma.pacientes.findUnique({
        where: {
          email: body.email,
        },
      });

      if (emailExists && emailExists.id !== id) {
        throw new BadRequestException(
          'Email já cadastrado, por favor utilize outro email',
        );
      }
    }

    const pacienteUpdated = await this.prisma.pacientes.update({
      where: {
        id,
      },
      data: body,
    });

    return {
      message: 'Paciente atualizado com sucesso',
      paciente: pacienteUpdated,
    };
  }

  async deletePaciente(id: string) {
    const pacienteExists = await this.prisma.pacientes.findUnique({
      where: {
        id,
      },
    });
  
    if (!pacienteExists) {
      throw new NotFoundException('Paciente não encontrado');
    }
  
    await this.prisma.pacientes.delete({
      where: {
        id,
      },
    });
  
    return {
      message: 'Paciente deletado com sucesso',
    };
  }
}