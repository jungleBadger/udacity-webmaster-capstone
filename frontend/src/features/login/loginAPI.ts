// A mock function to mimic making an async request for data

import AuthService from "../../services/auth-service";

export function login(username: string, password: string) {
	return AuthService.login(username, password)
}
