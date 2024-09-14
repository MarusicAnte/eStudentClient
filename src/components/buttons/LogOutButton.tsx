import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Services/authorization/authService";
import { useUserContext } from "../context/UserContext";


const LogOutButton: React.FC = () => {

    const { setUser } = useUserContext();

    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        setUser(null);
        navigate('/');
    }

    return (
        <button
            onClick={handleLogOut}
            className='mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-black font-medium rounded'
        >
            Log Out
        </button>
    );
}

export default LogOutButton;