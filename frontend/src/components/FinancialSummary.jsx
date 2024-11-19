import React from "react";

const FinancialSummary = ({ transactions }) => {
    const totalIncome = transactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalSavings = totalIncome - totalExpenses;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">Total Income</h2>
                <p className="text-2xl">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">Total Expenses</h2>
                <p className="text-2xl">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">Total Savings</h2>
                <p className="text-2xl">${totalSavings.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default FinancialSummary;
