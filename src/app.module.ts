import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PacienteModule } from './module/paciente.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PacienteModule,
  ],
})
export class AppModule {}
