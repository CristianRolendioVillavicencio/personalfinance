import React, { useEffect, useState } from 'react';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/transactions')
            .then((res) => res.json())
            .then((data) => setExpenses(data.filter((tx) => tx.type === 'Gasto Fijo' || tx.type === 'Gasto Variable')))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Gastos</h2>
            <ul>
                {expenses.map((tx) => (
                    <li key={tx._id} className="mb-2 p-4 bg-white shadow rounded">
                        <p><strong>Categoría:</strong> {tx.category}</p>
                        <p><strong>Monto:</strong> ${tx.amount}</p>
                        <p><strong>Descripción:</strong> {tx.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Expenses;
