import React from "react";
import {Link} from "react-router-dom";
import {logOut} from "../redux/slices/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {

    const dispatcher = useAppDispatch();
    const {user} = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">My Website</h1>
            <nav>
                <ul className="flex gap-4">
                    {user ?
                        <>
                            <li>
                                <Link to="/profile" className="text-gray-600 hover:text-blue-500">
                                    {user.email}
                                </Link>
                            </li>

                            <li>
                                <a href="#" onClick={(e)=> {
                                    e.preventDefault();
                                    dispatcher(logOut());
                                    navigate("/");
                                }} className="text-gray-600 hover:text-blue-500">
                                    Вихід
                                </a>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <Link to="/register" className="text-gray-600 hover:text-blue-500">
                                    Реєстрація
                                </Link>
                            </li>

                            <li>
                                <Link to="/login" className="text-gray-600 hover:text-blue-500">
                                    Вхід
                                </Link>
                            </li>
                        </>
                    }

                </ul>
            </nav>
        </header>
    );
};

export default Header;