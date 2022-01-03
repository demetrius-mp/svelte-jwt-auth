import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import * as cookie from 'cookie';
import * as api from '$lib/api';

export async function post(req: ServerRequest) {
	const requestBody = req.body as any;
	const accessToken = await api.getAccessToken({
		username: requestBody.username,
		password: requestBody.password
	});

	if (!accessToken) {
		return { status: 401 };
	}

	const body = await api.getUser(accessToken);

	const headers = {
		'Set-Cookie': cookie.serialize('jwt', accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'strict',
			path: '/'
		})
	};

	return {
		headers,
		body
	};
}
