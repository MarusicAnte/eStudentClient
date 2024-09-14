import axios from "axios";

const API_LOGIN_URL = "https://localhost:7065/api/auth/login";
const API_LOGOUT_URL = "https://localhost:7065/api/auth/logout";


export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(API_LOGIN_URL, { email, password });
        if (response.status === 200) {
            console.log("Response data: ", response.data);
            return response.data;
        }
    } catch (error) {
        console.error('Login error: ', error);
        throw new Error('An error occurred during login');
    }
};


export const logout = async () => {
    try {
        const response = await axios.post(API_LOGOUT_URL);
        if (response.status === 200)
            localStorage.removeItem('token');
    } catch (error) {
        console.error('Logout error: ', error);
        throw new Error('An error occurred during logout');
    }
}
