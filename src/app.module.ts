import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './module/cliente.module';
import { PrismaModule } from './module/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClienteModule,
    PrismaModule,
  ],
})
export class AppModule {}
