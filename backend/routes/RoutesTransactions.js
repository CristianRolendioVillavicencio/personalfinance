const express = require("express");
const router = express.Router();
const Transaction = require("../models/ModelTransaction");

// Crear una nueva transacción
router.post("/", async (req, res) => {
    try {
        const { type, category, amount, note, date } = req.body;

        if (!type || !category || !amount) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const newTransaction = new Transaction({ type, category, amount, note, date });
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({ message: "Error al crear transacción: " + error.message });
    }
});
// Obtener todas las transacciones
router.get("/", async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener transacciones: " + error.message });
    }
});
// Actualizar una transacción
router.put("/:id", async (req, res) => {
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una transacción
router.delete("/:id", async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Transacción eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Filtrar transacciones por tipo
router.get("/type/:type", async (req, res) => {
    try {
        const { type } = req.params;
        const transactions = await Transaction.find({ type });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Filtrar transacciones por categoría
router.get("/category/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const transactions = await Transaction.find({ category });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener resumen financiero
router.get("/summary", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        const summary = transactions.reduce(
            (acc, tx) => {
                if (tx.type === "Ingreso") acc.ingresos += tx.amount;
                if (tx.type === "Gasto Fijo" || tx.type === "Gasto Variable")
                    acc.gastos += tx.amount;
                if (tx.type === "Deuda") acc.deudas += tx.amount;

                return acc;
            },
            { ingresos: 0, gastos: 0, deudas: 0 }
        );

        summary.disponible = summary.ingresos - (summary.gastos + summary.deudas);

        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
