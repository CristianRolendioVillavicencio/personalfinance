import React, { useEffect, useState } from "react";

const CreditCards = () => {
    const [creditCards, setCreditCards] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/transactions")
            .then((res) => res.json())
            .then((data) =>
                setCreditCards(data.filter((tx) => tx.category === "Tarjeta de Crédito"))
            )
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Tarjetas de Crédito</h2>
            <ul>
                {creditCards.map((card) => (
                    <li key={card._id} className="mb-2 p-4 bg-white shadow rounded">
                        <p>
                            <strong>Categoría:</strong> {card.category}
                        </p>
                        <p>
                            <strong>Monto:</strong> ${card.amount}
                        </p>
                        <p>
                            <strong>Descripción:</strong> {card.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CreditCards;
