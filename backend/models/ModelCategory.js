const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    type: {
        type: String, // Ejemplo: 'Ingreso', 'Gasto Fijo'
        required: true,
    },
    name: {
        type: String, // Ejemplo: 'Salario', 'Renta'
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("Category", CategorySchema);
