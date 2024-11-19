import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]); // Estado para almacenar transacciones

    // Obtener transacciones del backend al cargar la página
    useEffect(() => {
        fetch("http://localhost:5000/api/transactions") // Endpoint para obtener todas las transacciones
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener las transacciones");
                }
                return res.json();
            })
            .then((data) => setTransactions(data)) // Guardar las transacciones en el estado
            .catch((err) => console.error("Error fetching transactions:", err));
    }, []); // Solo se ejecuta al cargar la página

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Pasar las transacciones al Header para cálculos automáticos */}
            <Header transactions={transactions} />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-center mb-6">Financial Dashboard</h1>

                {/* Mostrar historial de transacciones */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Historial de Transacciones</h2>
                    <table className="table-auto w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Tipo</th>
                                <th className="px-4 py-2 border">Categoría</th>
                                <th className="px-4 py-2 border">Monto</th>
                                <th className="px-4 py-2 border">Nota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{transaction.type}</td>
                                    <td className="px-4 py-2 border">{transaction.category || "N/A"}</td>
                                    <td className="px-4 py-2 border">${transaction.amount.toFixed(2)}</td>
                                    <td className="px-4 py-2 border">{transaction.note || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
