import React, { useState, useEffect } from "react";

const Transactions = ({ updateSummary }) => {
    const [transactions, setTransactions] = useState([]); // Asegura que sea un arreglo
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        type: "",
        category: "",
        amount: "",
        note: "",
    });

    const categoryList = {
        Ingreso: ["Salario", "Bonos", "Inversiones"],
        "Gasto Fijo": ["Renta", "Hipoteca", "Servicios Públicos"],
        "Gasto Variable": ["Supermercado", "Entretenimiento", "Transporte"],
        Deuda: ["Tarjetas de Crédito", "Préstamos", "Hipotecas"],
    };

    // Cargar transacciones desde el backend
    useEffect(() => {
        fetch("http://localhost:5000/api/transactions")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setTransactions(data); // Asegura que solo se asignen arreglos
                } else {
                    console.error("Los datos recibidos no son un arreglo:", data);
                    setTransactions([]); // Si no es un arreglo, inicializa vacío
                }
            })
            .catch((err) => console.error("Error al cargar transacciones:", err));
    }, []);

    // Actualizar categorías según el tipo seleccionado
    useEffect(() => {
        if (formData.type) {
            setCategories(categoryList[formData.type] || []);
        } else {
            setCategories([]);
        }
    }, [formData.type]);

    // Manejo de cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejo de envío del formulario
    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && typeof data === "object") {
                    setTransactions([...transactions, data]);
                    updateSummary(); // Actualiza el resumen financiero
                    setFormData({ type: "", category: "", amount: "", note: "" });
                } else {
                    console.error("La respuesta del servidor no es válida:", data);
                }
            })
            .catch((err) => console.error("Error al agregar transacción:", err));
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Transacciones</h2>

            <form onSubmit={handleFormSubmit} className="mb-6">
                <div className="grid grid-cols-4 gap-4">
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar Tipo</option>
                        {Object.keys(categoryList).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">Seleccionar Categoría</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Monto"
                        className="p-2 border rounded"
                        required
                    />

                    <input
                        type="text"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="Nota"
                        className="p-2 border rounded"
                    />
                </div>

                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
                    Agregar Transacción
                </button>
            </form>

            <h3 className="text-lg font-bold mb-4">Historial de Transacciones</h3>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Tipo</th>
                        <th className="px-4 py-2">Categoría</th>
                        <th className="px-4 py-2">Monto</th>
                        <th className="px-4 py-2">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length > 0 ? (
                        transactions.map((tx, index) => (
                            <tr key={index} className="text-center">
                                <td className="border px-4 py-2">{tx.type || "N/A"}</td>
                                <td className="border px-4 py-2">{tx.category || "N/A"}</td>
                                <td className="border px-4 py-2">${tx.amount?.toFixed(2) || "0.00"}</td>
                                <td className="border px-4 py-2">{tx.note || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center p-4">
                                No hay transacciones disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Transactions;
