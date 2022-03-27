import axios from 'axios';
import {CONFIG} from '../../config';

const API_URL = `${CONFIG.sidooh.services.accounts.api.url}/api/users/signin`;

export type LoginRequest = {
    email: string
    password: string
}

export const authAPI = {
    login: async (userData: LoginRequest) => {
        const response = await axios.post(API_URL, userData);

        if (response.data) localStorage.setItem('user', JSON.stringify(response.data));

        return response.data;
    },
    logout: () => localStorage.removeItem('user')
};