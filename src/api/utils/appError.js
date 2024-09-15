const { ValidationError: MongooseValidationError } = require('mongoose').Error;

class AppError extends Error {
  constructor(error, statusCode) {
    // super(error instanceof Error ? error.message : error);
    super(error);

    if (error instanceof MongooseValidationError) {
      const { errors } = error;
      this.validationErrors = {};
      for (let error in errors) {
        this.validationErrors[error] = errors[error].message;
      }
      this.message = 'Validation error occurred';
    }

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // useful to determine if error was operational or programatic
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
