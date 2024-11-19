const express = require("express");
const router = express.Router();

// Ruta de prueba
router.get("/", (req, res) => {
    res.send("API funcionando correctamente.");
});

// Ruta para devolver datos (puedes adaptarla según tus necesidades)
router.get("/data", (req, res) => {
    res.json({ message: "Datos desde el backend" });
});

module.exports = router;
