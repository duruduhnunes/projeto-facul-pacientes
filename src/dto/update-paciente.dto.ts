import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdatePacienteDto {
  @ApiProperty({ required: false, description: 'Nome do paciente' })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  nome?: string;

  @ApiProperty({ required: false, description: 'Email do paciente' })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @ApiProperty({ required: false, description: 'Telefone do paciente' })
  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string' })
  telefone?: string;
}
