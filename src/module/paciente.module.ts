import { Module } from '@nestjs/common';
import { pacientesController } from 'src/controller/app.controller';
import { pacientesService } from 'src/service/paciente.service';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  controllers: [pacientesController],
  providers: [pacientesService, PrismaService],
  exports: [pacientesService],
})
export class PacienteModule {}
