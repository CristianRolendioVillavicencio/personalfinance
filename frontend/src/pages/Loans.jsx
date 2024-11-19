import React, { useEffect, useState } from "react";

const Loans = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/transactions")
            .then((res) => res.json())
            .then((data) => setLoans(data.filter((tx) => tx.type === "Deuda")))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Préstamos</h2>
            <ul>
                {loans.map((loan) => (
                    <li key={loan._id} className="mb-2 p-4 bg-white shadow rounded">
                        <p>
                            <strong>Categoría:</strong> {loan.category}
                        </p>
                        <p>
                            <strong>Monto:</strong> ${loan.amount}
                        </p>
                        <p>
                            <strong>Descripción:</strong> {loan.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Loans;
