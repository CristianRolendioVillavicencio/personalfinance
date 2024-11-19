import React, { useState, useEffect } from "react";

const Reports = () => {
    const [transactions, setTransactions] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [filters, setFilters] = useState({
        period: "mensual",
        type: "all",
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/transactions")
            .then((res) => res.json())
            .then((data) => setTransactions(data))
            .catch((err) => console.error(err));
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filterTransactions = () => {
        let filteredData = transactions;

        // Filtrar por tipo
        if (filters.type !== "all") {
            filteredData = filteredData.filter((tx) => tx.type === filters.type);
        }

        // Filtrar por periodo
        const now = new Date();
        if (filters.period === "semanal") {
            filteredData = filteredData.filter((tx) => {
                const txDate = new Date(tx.date);
                return txDate > new Date(now.setDate(now.getDate() - 7));
            });
        } else if (filters.period === "mensual") {
            filteredData = filteredData.filter((tx) => {
                const txDate = new Date(tx.date);
                return txDate.getMonth() === now.getMonth();
            });
        }

        setFiltered(filteredData);
    };

    useEffect(() => {
        filterTransactions();
    }, [filters, transactions]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Reportes</h2>
            <div className="mb-4">
                <select
                    name="period"
                    value={filters.period}
                    onChange={handleFilterChange}
                    className="p-2 border rounded"
                >
                    <option value="semanal">Semanal</option>
                    <option value="mensual">Mensual</option>
                    <option value="quincenal">Quincenal</option>
                </select>
                <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="p-2 border rounded ml-4"
                >
                    <option value="all">Todos</option>
                    <option value="Ingreso">Ingreso</option>
                    <option value="Gasto Fijo">Gasto Fijo</option>
                    <option value="Gasto Variable">Gasto Variable</option>
                    <option value="Deuda">Deuda</option>
                </select>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Tipo</th>
                        <th className="border border-gray-300 px-4 py-2">Categoría</th>
                        <th className="border border-gray-300 px-4 py-2">Monto</th>
                        <th className="border border-gray-300 px-4 py-2">Descripción</th>
                        <th className="border border-gray-300 px-4 py-2">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((tx) => (
                        <tr key={tx._id}>
                            <td className="border border-gray-300 px-4 py-2">{tx.type}</td>
                            <td className="border border-gray-300 px-4 py-2">{tx.category}</td>
                            <td className="border border-gray-300 px-4 py-2">${tx.amount}</td>
                            <td className="border border-gray-300 px-4 py-2">{tx.description}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {new Date(tx.date).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
