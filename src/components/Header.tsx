import React from "react";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">My Website</h1>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Link to="/login" className="text-gray-600 hover:text-blue-500">
                            Вхід
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className="text-gray-600 hover:text-blue-500">
                            Реєстрація
                        </Link>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;