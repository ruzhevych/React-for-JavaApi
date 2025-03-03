import React from "react";

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-white text-gray-800 h-full shadow-lg border-r-amber-100">
            <ul className="space-y-2 p-2 px-4">
                <li>
                    <a href="/" className="block p-2 hover:bg-gray-200 rounded">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/categories" className="block p-2 hover:bg-gray-200 rounded">
                        Категорії
                    </a>
                </li>
                <li>
                    <a href="/products" className="block p-2 hover:bg-gray-200 rounded">
                        Продукти
                    </a>
                </li>
                <li>
                    <a href="/about" className="block p-2 hover:bg-gray-200 rounded">
                        About
                    </a>
                </li>
                <li>
                    <a href="/contact" className="block p-2 hover:bg-gray-200 rounded">
                        Contact
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;