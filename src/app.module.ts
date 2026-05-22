import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PacienteModule } from './module/paciente.module';
import { PrismaModule } from './module/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PacienteModule,
    PrismaModule,
  ],
})
export class AppModule {}
