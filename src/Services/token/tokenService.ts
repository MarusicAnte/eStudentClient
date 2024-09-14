import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    UserId: string;
    role: string;
    jti: string;
    exp: number;
    iss: string;
    aud: string;
}

export const decodeToken = (token: string) => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded;
    } catch (error) {
        return undefined;
    }
}

