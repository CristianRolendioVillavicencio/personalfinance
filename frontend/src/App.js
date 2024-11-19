import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Asegúrate de que esta ruta sea correcta
import Transactions from "./pages/Transactions";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Loans from "./pages/Loans";
import Reports from "./pages/Reports";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Transactions />} />
                    <Route path="income" element={<Income />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="loans" element={<Loans />} />
                    <Route path="reports" element={<Reports />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
