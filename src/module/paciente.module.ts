import { Module } from '@nestjs/common';
import { PacienteController } from 'src/controller/paciente.controller';
import { PacientesRepository } from 'src/repository/paciente.repository';
import { PacientePrismaRepository } from 'src/repository/prisma.repository';
import { CreatePacienteCase } from 'src/use-cases/createPaciente';
import { DeletePacientesCase } from 'src/use-cases/deletePaciente';
import { GetAllPacienteCase } from 'src/use-cases/getAllPaciente';
import { GetByEmailPacienteCase } from 'src/use-cases/getByEmailPaciente';
import { GetByIdPacienteCase } from 'src/use-cases/getByIdPaciente';
import { UpdatePacienteCase } from 'src/use-cases/updatePaciente';

@Module({
  controllers: [PacienteController],
  providers: [
    {
      provide: PacientesRepository,
      useClass: PacientePrismaRepository,
    },
    CreatePacienteCase,
    GetAllPacienteCase,
    DeletePacientesCase,
    UpdatePacienteCase,
    GetByIdPacienteCase,
    GetByEmailPacienteCase,
  ],
  exports: [
    CreatePacienteCase,
    GetAllPacienteCase,
    DeletePacientesCase,
    UpdatePacienteCase,
    GetByIdPacienteCase,
    GetByEmailPacienteCase,
  ],
})
export class PacienteModule {}
