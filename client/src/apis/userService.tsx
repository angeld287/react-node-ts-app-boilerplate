import { IUser } from "../interfaces/models/IUser";
import IUserService from "../interfaces/IUserService";

class userService implements IUserService {

    async login(username: string, password: string): Promise<IUser> {
        const userFetch = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        return await userFetch.json();
    }

    async logout(): Promise<any> {
        const logoutFetch = await fetch('http://localhost:3001/api/auth/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return await logoutFetch.json();
    }

    async getSession(): Promise<any> {
        const sessionFetch = await fetch('http://localhost:3001/api/auth/getsession', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return await sessionFetch.json();
    }
}

export default userService