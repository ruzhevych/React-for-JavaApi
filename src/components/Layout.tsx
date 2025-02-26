import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Header на всю ширину з тінню та z-index */}
            <header className="relative z-10 shadow-md">
                <Header />
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar під Header */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
