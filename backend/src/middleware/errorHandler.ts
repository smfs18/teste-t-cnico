import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError'; 


const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};


const sendErrorProd = (err: any, res: Response) => {

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
  }
  

  console.error('ERROR :', err); 
  res.status(500).json({
    status: 'error',
    message: 'Algo deu muito errado!',
  });
};

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction 
): void => {

  if (res.headersSent) {
    return next(error);
  }

  let customError = { ...error };
  customError.message = error.message;
  customError.statusCode = error.statusCode || 500;
  
 
  if (error.name === 'SequelizeValidationError') {
    const message = error.errors.map((e: any) => e.message).join('. ');
    customError = new AppError(message, 400);
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    const field = Object.keys(error.fields)[0];
    const message = `O valor para o campo ${field} já está em uso.`;
    customError = new AppError(message, 409); 
  }
  if (error.name === 'JsonWebTokenError') customError = new AppError('Token inválido ou malformado.', 401);
  if (error.name === 'TokenExpiredError') customError = new AppError('Seu token expirou. Faça login novamente.', 401);


  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(customError, res);
  } else {
    sendErrorProd(customError, res);
  }
};