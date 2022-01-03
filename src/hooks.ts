import cookie from 'cookie';
import { getUser } from '$lib/api';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies.jwt;
	if (!jwt) {
		request.locals.user = null;
	} else {
		request.locals.user = await getUser(jwt);
	}

	const response = await resolve(request);

	return response;
}

export async function getSession(request: ServerRequest) {
	return { user: request.locals.user } || {};
}
