import React, { useState } from "react";

const TransactionForm = ({ addTransaction }) => {
    const [formData, setFormData] = useState({
        type: "Income",
        category: "",
        amount: "",
        note: "",
        date: new Date().toISOString().split("T")[0], // Fecha por defecto: Hoy
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTransaction(formData);
        setFormData({
            type: "Income",
            category: "",
            amount: "",
            note: "",
            date: new Date().toISOString().split("T")[0],
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="border p-2 rounded"
                    required
                />
            </div>
            <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border p-2 rounded w-full"
                required
            />
            <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Note (optional)"
                className="border p-2 rounded w-full"
            />
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border p-2 rounded w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Transaction
            </button>
        </form>
    );
};

export default TransactionForm;
