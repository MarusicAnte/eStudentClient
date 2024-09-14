import axios from 'axios';
import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { decodeToken } from '../../Services/token/tokenService';
import { fetchUserById } from '../../Services/user/userService';
import { Navigate, Outlet } from 'react-router-dom';


interface UserContextType {
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const decodedToken = decodeToken(token);
        console.log("Deocde token: ", decodedToken);

        if (decodedToken === undefined) {
            localStorage.removeItem("token");
            return;
        }

        const userId = Number.parseInt(decodedToken.UserId);
        fetchUserById(userId)
            .then((user) => setUser(user))
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            });
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}


export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};


export const IsLoggedIn = () => {
    const { user } = useUserContext();

    return user ? <Outlet /> : <Navigate to="/" />
}


export const IsNotLoggedIn = () => {
    const { user } = useUserContext();

    return !user ? <Outlet /> : <Navigate to="/" />
}