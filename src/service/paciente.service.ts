import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { error } from 'node:console';

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
    return paciente;
  }
}
