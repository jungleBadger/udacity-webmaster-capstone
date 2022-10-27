import axios from "axios";
const API_URL: string = "http://localhost:6022";

class AuthService {

	static async login(username: string, rawPassword: string) {
		await axios.post(
			`${API_URL}/auth/login`,
			{
				"username": username,
				"password": rawPassword
			}
		);
		return true;
	}
}

export default AuthService;
