const logger = require('./logger');

const requestLogger = (req, _, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message,
    });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }

  logger.error(error.message);

  next(error);
};

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
};
