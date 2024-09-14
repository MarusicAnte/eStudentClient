import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../inputs/LoginInput';
import LoginButton from '../buttons/LogInButton';
import { login } from '../../Services/authorization/authService';
import { useState } from 'react';
import axios from 'axios';
import { decodeToken } from '../../Services/token/tokenService';
import { fetchUserById } from '../../Services/user/userService';
import { useUserContext } from '../context/UserContext';



const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const { setUser } = useUserContext();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            localStorage.setItem('token', data.token);

            const decodedToken = decodeToken(data.token);

            if (decodedToken !== undefined) {
                const userId = Number.parseInt(decodedToken.UserId);

                fetchUserById(userId).then((user) => {
                    setUser(user);
                    navigate('/home');
                }).catch(() => {
                    localStorage.removeItem("token");
                });
            }

        }
        catch (err) {
            setError((err as Error).message);
        }
    }

    return (
        <form onSubmit={handleLogin} className='w-2/3 flex h-1/2 flex-col'>
            <LoginInput
                name="Email address"
                type="email"
                placeholder='Email...'
                onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInput
                name="Password"
                type="password"
                placeholder='Password...'
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 mb-4'>Invalid email or password !</p>}

            <LoginButton type="submit" />
        </form>
    );
}

export default LoginForm;
