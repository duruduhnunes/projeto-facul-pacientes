import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  @ApiProperty({ required: false, description: 'Nome do cliente' })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  nome?: string;

  @ApiProperty({ required: false, description: 'Email do cliente' })
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @ApiProperty({ required: false, description: 'Telefone do cliente' })
  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string' })
  telefone?: string;
}
