import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { error } from 'node:console';
import { UpdatePacienteDto } from 'src/dto/update-paciente.dto';

@Injectable()
export class pacientesService {
  constructor(private readonly prisma: PrismaService) {}

  async createPaciente(nome: string, email: string, telefone: string) {
    if (!nome || !email || !telefone) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Todos os campos são obrigatórios, ex: nome, email e telefone',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }

    const emailExists = await this.prisma.pacientes.findUnique({
      where: {
        email,
      },
    });

    if (emailExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email já cadastrado, por favor utilize outro email',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
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
    const pacienteDontExists = await this.prisma.pacientes.findUnique({
      where: {
        id,
      },
    });

    if (!pacienteDontExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            'Paciente não encontrado, por favor, verifique o id e tente novamente',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }

    if (body.email) {
      const emailExists = await this.prisma.pacientes.findUnique({
        where: {
          email: body.email,
        },
      });

      if (emailExists && emailExists.id !== id) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Email já cadastrado, por favor utilize outro email',
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: error,
          },
        );
      }
    }

    await this.prisma.pacientes.update({
      where: {
        id,
      },
      data: body,
    });
  }
}
