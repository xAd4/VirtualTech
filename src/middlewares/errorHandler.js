const logger = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
  // Registra el error con su stack trace
  logger.error(err);

  // Responde con un mensaje genérico sin detalles sensibles
  res.status(500).json({
    message: "Ocurrió un error interno. Por favor, inténtalo más tarde.",
  });
};

module.exports = errorHandler;
