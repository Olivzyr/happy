import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

// Tratando os erros de inserção de informação
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'Validation fails', errors });
  }

  // Vamos visualizar o error detalhado no console log
  console.error(error);

  // Error que o usuário vai visualizar ao realizar a requisição
  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;