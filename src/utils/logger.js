const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;

// Formato personalizado para los logs
const myFormat = printf(({ level, message, timestamp, stack }) => {
  // Si el error tiene stack, lo mostramos, de lo contrario el mensaje.
  return `${timestamp} ${level}: ${stack || message}`;
});

// Configuración del logger
const logger = createLogger({
  level: "info", // Nivel mínimo a registrar
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // Captura el stacktrace en caso de errores
    myFormat
  ),
  transports: [
    // Transport para errores: se guardan en un archivo
    new transports.File({ filename: "logs/error.log", level: "error" }),
    // Transport para logs combinados (todos los niveles)
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

// En desarrollo mostramos en la consola
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

module.exports = logger;
