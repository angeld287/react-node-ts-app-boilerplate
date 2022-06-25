import IUserService from "../interfaces/IUserService";
import { IResponse } from "../interfaces/models/IResponse";

class userService implements IUserService {

    async login(username: string, password: string): Promise<IResponse> {
        const userFetch = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        return await userFetch.json();
    }

    async logout(): Promise<IResponse> {
        const logoutFetch = await fetch('http://localhost:3001/api/auth/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return await logoutFetch.json();
    }

    async getSession(): Promise<IResponse> {
        const sessionFetch = await fetch('http://localhost:3001/api/auth/getsession', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return await sessionFetch.json();
    }
}

export default userService