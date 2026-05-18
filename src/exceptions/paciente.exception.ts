import { HttpException, HttpStatus } from '@nestjs/common';

export class PacienteNaoEncontradoException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Paciente não encontrado',
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class EmailJaCadastradoException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email já cadastrado, por favor utilize outro email',
        error: 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class CamposObrigatoriosException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Todos os campos são obrigatórios, ex: nome, email e telefone',
        error: 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class NotFoundExceptionComId extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Paciente não encontrado com esse id',
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class NotFoundExceptionComEmail extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Paciente não encontrado com esse email',
        error: 'Not Found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
