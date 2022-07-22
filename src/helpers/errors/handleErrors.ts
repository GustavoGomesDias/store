import { BadRequestErr } from './BadRequestError';

export interface HttpError {
  error: string
  statusCode: number
}

export const handleErrors = (err: Error): HttpError => {
  if (err instanceof BadRequestErr) {
    return {
      error: err.message,
      statusCode: err.statusCode,
    };
  }

  return {
    error: 'Erro de servidor, tente novamente mais tarde.',
    statusCode: 500,
  };
};
