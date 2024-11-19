import React, { useEffect, useState } from "react";

const Income = () => {
    const [income, setIncome] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/transactions")
            .then((res) => res.json())
            .then((data) => setIncome(data.filter((tx) => tx.type === "Ingreso")))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Ingresos</h2>
            <ul>
                {income.map((tx) => (
                    <li key={tx._id} className="mb-2 p-4 bg-white shadow rounded">
                        <p>
                            <strong>Categoría:</strong> {tx.category}
                        </p>
                        <p>
                            <strong>Monto:</strong> ${tx.amount}
                        </p>
                        <p>
                            <strong>Descripción:</strong> {tx.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Income;
