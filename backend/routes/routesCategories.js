const express = require("express");
const router = express.Router();
const Category = require("../models/ModelCategory");

// Obtener todas las categorías
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener categorías por tipo
router.get("/:type", async (req, res) => {
    try {
        const type = req.params.type;
        const categories = await Category.find({ type });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva categoría
router.post("/", async (req, res) => {
    try {
        const { type, name } = req.body;
        const newCategory = new Category({ type, name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
