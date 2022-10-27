export default {
	setAPIkey(token: string): object {
		return token ? {"Authorization": `Bearer ${token}`} : {};
	}
}