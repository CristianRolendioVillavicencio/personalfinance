import React from "react";
import Header from "./Header"; // Importa el Header
import { Outlet, NavLink } from "react-router-dom";
import { FaHome, FaMoneyBillWave, FaChartPie, FaCreditCard, FaFileAlt } from "react-icons/fa";

const Layout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white flex flex-col">
                <h2 className="text-xl font-bold text-center py-4 border-b border-gray-700">
                    Control
                </h2>
                <nav className="flex flex-col mt-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `py-2 px-4 flex items-center space-x-2 hover:bg-gray-700 ${
                                isActive ? "bg-gray-700" : ""
                            }`
                        }
                    >
                        <FaHome className="w-5 h-5" />
                        <span>Transacciones</span>
                    </NavLink>
                    <NavLink
                        to="/income"
                        className={({ isActive }) =>
                            `py-2 px-4 flex items-center space-x-2 hover:bg-gray-700 ${
                                isActive ? "bg-gray-700" : ""
                            }`
                        }
                    >
                        <FaMoneyBillWave className="w-5 h-5" />
                        <span>Ingresos</span>
                    </NavLink>
                    <NavLink
                        to="/expenses"
                        className={({ isActive }) =>
                            `py-2 px-4 flex items-center space-x-2 hover:bg-gray-700 ${
                                isActive ? "bg-gray-700" : ""
                            }`
                        }
                    >
                        <FaChartPie className="w-5 h-5" />
                        <span>Gastos</span>
                    </NavLink>
                    <NavLink
                        to="/loans"
                        className={({ isActive }) =>
                            `py-2 px-4 flex items-center space-x-2 hover:bg-gray-700 ${
                                isActive ? "bg-gray-700" : ""
                            }`
                        }
                    >
                        <FaCreditCard className="w-5 h-5" />
                        <span>Préstamos</span>
                    </NavLink>
                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            `py-2 px-4 flex items-center space-x-2 hover:bg-gray-700 ${
                                isActive ? "bg-gray-700" : ""
                            }`
                        }
                    >
                        <FaFileAlt className="w-5 h-5" />
                        <span>Reportes</span>
                    </NavLink>
                </nav>
            </div>

            {/* Main Content */}
            <div className="w-3/4 flex flex-col">
                <Header /> {/* Header actualizado */}
                <main className="p-8 overflow-y-auto">
                    <Outlet /> {/* Aquí se renderizan las páginas según la ruta */}
                </main>
            </div>
        </div>
    );
};

export default Layout;
