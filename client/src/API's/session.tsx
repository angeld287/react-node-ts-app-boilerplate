import { IUser } from "../interfaces/IUser";

export const login = async (username: string, password: string): Promise<IUser> => {

    const userFetch = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const content = await userFetch.json();
    return content
}