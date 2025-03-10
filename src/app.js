const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middlewares/errorHandler");
const requestLogger = require("./middlewares/requestLogger");
const connectDB = require("./database/db");

// Variables de entorno
dotenv.config();

// Inicialización de RestServer
const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Demasiadas solicitudes, por favor inténtalo más tarde.",
});

// Aplicando el limitador a todas las rutas
app.use(limiter);

// Rutas
/*
app.use("/users", UserRoutes);
app.use("/login", authRoutes);
*/

// Ruta de prueba
/*
app.get("/error", (req, res) => {
  throw new Error("Error forzado para demostrar el logging");
});
*/

app.use(errorHandler);

// Puerto
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server ${PORT} running`);
});

// Conexión a la base de datos
connectDB();
