const {
  ValidationError: MongooseValidationError,
  CastError: MongooseCastError,
} = require('mongoose').Error;

class AppError extends Error {
  constructor(error, statusCode) {
    super(error instanceof Error ? error.message : error);

    this.validationErrors = {};

    if (error instanceof MongooseValidationError) {
      const { errors } = error;
      for (let error in errors) {
        this.validationErrors[error] = errors[error].message;
      }
      this.message = 'Validation error(s) occurred';
    }

    if (error instanceof MongooseCastError) {
      this.validationErrors[error.path] = error.message;
    }

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // useful to determine if error was operational or programatic
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
