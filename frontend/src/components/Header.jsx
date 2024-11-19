import React, { useEffect, useState } from "react";

const Header = () => {
    const [summary, setSummary] = useState({
        ingresos: 0,
        gastos: 0,
        deudas: 0,
        disponible: 0,
    });

    useEffect(() => {
        const fetchSummary = () => {
            fetch("http://localhost:5000/api/transactions/summary")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Error al obtener los datos del resumen");
                    }
                    return res.json();
                })
                .then((data) => setSummary(data))
                .catch((err) => console.error(err));
        };

        // Llamada inicial al cargar el componente
        fetchSummary();

        // Configurar actualizaciones periódicas cada 5 segundos
        const interval = setInterval(fetchSummary, 1000);

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
            {/* Resúmenes Centrados */}
            <div className="flex space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-gray-700 text-sm font-bold">Ingresos:</p>
                    <p className="text-blue-600 text-lg font-semibold">
                        ${summary.ingresos.toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-gray-700 text-sm font-bold">Gastos:</p>
                    <p className="text-red-600 text-lg font-semibold">
                        ${summary.gastos.toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-gray-700 text-sm font-bold">Deudas:</p>
                    <p className="text-yellow-600 text-lg font-semibold">
                        ${summary.deudas.toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-gray-700 text-sm font-bold">Disponible:</p>
                    <p className="text-green-600 text-lg font-semibold">
                        ${summary.disponible.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Perfil */}
            <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Cristian Villavicencio</span>
            </div>
        </header>
    );
};

export default Header;
