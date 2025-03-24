import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { getUser, logOut } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
    const user = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        navigate("/login");
    };

    if (!user) {
        return <div className="text-center text-red-500">Користувач не авторизований</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-bold mb-4">Профіль користувача</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Ролі:</strong> {user.roles.join(", ")}</p>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
                Вийти
            </button>
        </div>
    );
};

export default ProfilePage;
