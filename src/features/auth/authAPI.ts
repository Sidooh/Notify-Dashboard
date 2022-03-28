import axios from 'axios';
import { CONFIG } from '../../config';

const API_URL = `${CONFIG.sidooh.services.accounts.api.url}/users/signin`;

export type LoginRequest = {
    email: string
    password: string
}

export const authAPI = {
    login: async (userData: LoginRequest) => {
        const {data} = await axios.post(API_URL, userData, {withCredentials: true});

        const userCredentials = {
            token: data.token,
            user: data.token,
        }

        console.log(userCredentials);

        if (data) localStorage.setItem('auth', JSON.stringify(userCredentials));

        return userCredentials;
    },
    logout: () => localStorage.removeItem('auth')
};