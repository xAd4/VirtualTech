const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  logger.info(`Método: ${req.method} - URL: ${req.originalUrl}`);
  next();
};

module.exports = requestLogger;
