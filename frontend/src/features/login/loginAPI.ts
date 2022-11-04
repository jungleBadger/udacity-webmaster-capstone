// A mock function to mimic making an async request for data

import AuthService from "../../services/auth-service";

export async function login(username: string, password: string): Promise<string> {
	return (await AuthService.login(username, password)).data
}

export async function refreshJWT(jwt: string): Promise<string> {
	return (await AuthService.refreshJWT(jwt)).data
}
