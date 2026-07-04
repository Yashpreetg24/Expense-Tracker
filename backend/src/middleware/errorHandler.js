const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
};

const globalErrorHandler = (err, req, res, next) => {
  console.error('Global Error Handler:', err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errorType = 'Server Error';

  // Prisma Errors
  if (err.code === 'P2002') {
    statusCode = 400;
    message = 'Duplicate field value entered';
    errorType = 'Prisma Error';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
    errorType = 'Prisma Error';
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    errorType = 'JWT Error';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token has expired';
    errorType = 'JWT Error';
  }

  res.status(statusCode).json({
    error: errorType,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
