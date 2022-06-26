import IUserService from "../interfaces/IUserService";
import { IResponse, ResponseStatus, StatusCode } from "../interfaces/models/IResponse";

class userService implements IUserService {

    async login(username: string, password: string): Promise<IResponse> {
        try {
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
        } catch (error) {
            console.log('error', error);

            return new Promise<IResponse>(() => ({
                status: ResponseStatus.INTERNAL_ERROR,
                message: 'Internal Application Error',
                statusCode: StatusCode.FAILURE,
                data: error
            })
            );
        }
    }

    async logout(): Promise<IResponse> {
        const logoutFetch = await fetch('http://localhost:3001/api/auth/logout', {
            method: 'POST',
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