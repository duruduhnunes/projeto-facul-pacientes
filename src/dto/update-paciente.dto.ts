import { ApiProperty } from '@nestjs/swagger';

export class UpdatePacienteDto {
  @ApiProperty({ required: false, description: 'Nome do paciente' })
  nome?: string;
  @ApiProperty({ required: false, description: 'Email do paciente' })
  email?: string;
  @ApiProperty({ required: false, description: 'Telefone do paciente' })
  telefone?: string;
}
