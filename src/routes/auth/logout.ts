import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import cookie from 'cookie';

export async function get(req: ServerRequest) {
	req.locals.user = null;

	const headers = {
		'Set-Cookie': cookie.serialize('jwt', '', {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'strict',
			path: '/'
		}),
		location: '/'
	};

	return {
		status: 302,
		headers
	};
}
