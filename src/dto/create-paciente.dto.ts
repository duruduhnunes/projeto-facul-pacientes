import { ApiProperty } from '@nestjs/swagger';

export class CreatePacienteDto {
  @ApiProperty({ description: 'Nome do paciente', example: 'João Silva' })
  nome: string;
  @ApiProperty({ description: 'Email do paciente', example: 'joao@email.com' })
  email: string;
  @ApiProperty({ description: 'Telefone do paciente', example: '11999999999' })
  telefone: string;
}
