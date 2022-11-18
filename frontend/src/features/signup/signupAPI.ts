// A mock function to mimic making an async request for data

import AuthService from "../../services/auth-service";

export function signup(username: string, password: string) {
	return AuthService.signup(username, password)
}
