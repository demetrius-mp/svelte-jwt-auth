const base = 'http://127.0.0.1:8000';

export interface IUserLoginData {
	username: string;
	password: string;
}

export async function getAccessToken({ username, password }: IUserLoginData): Promise<string> {
	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		Accept: 'application/json'
	};
	const body = new URLSearchParams(`username=${username}&password=${password}`);
	const response = await fetch(`${base}/auth/login`, {
		method: 'POST',
		headers,
		body
	});

	if (!response.ok) {
		return null;
	}

	const data = await response.json();

	return data.access_token as string;
}

export async function getUser(token: string) {
	const response = await fetch(`${base}/auth/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	const data = await response.json();
	data.accessToken = token;

	return data;
}

export async function getTodos(token: string) {
	const response = await fetch(`${base}/todos`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	const data = await response.json();

	return data;
}

export async function post(endpoint: string, data: object) {
	const r = await fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return await r.json();
}
