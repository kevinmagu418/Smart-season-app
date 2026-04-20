import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.error('[Error]:', err.stack);
  } else {
    console.error('[Error]:', err.message);
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    ...(isProduction ? {} : { stack: err.stack })
  });
};
