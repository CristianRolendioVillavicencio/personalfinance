const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/api", require("./routes"));

// Manejo de errores para producción
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Algo salió mal." });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

// Middleware para manejar rutas no definidas en el backend
app.use((req, res, next) => {
    if (!req.route) {
        return res.status(404).send({ error: "Ruta no encontrada" });
    }
    next();
});
