import axios from "axios";
const API_URL: string = "http://localhost:6022";

class AuthService {

	static async login(username: string, rawPassword: string): Promise<any> {
		return await axios.post(
			`${API_URL}/auth/login`,
			{
				"username": username,
				"password": rawPassword
			}
		);
	}

	static async signup(username: string, rawPassword: string): Promise<any> {
		return await axios.post(
			`${API_URL}/auth/create`,
			{
				"username": username,
				"password": rawPassword
			}
		);
	}

	static async refreshJWT(jwt: string): Promise<any> {
		return await axios.get(
			`${API_URL}/auth/refresh`,
			{
				"headers": {
					"Authorization": `Bearer ${jwt}`
				}
			}
		);
	}
}

export default AuthService;
