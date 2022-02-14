import cookie from "cookie";
import type { Handle, GetSession } from "@sveltejs/kit";

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || "");

	const token = cookies?.token;

	let user;
	if (cookies.user) user = JSON.parse(cookies.user);

	if (token && user) {
		request.locals = { token, user };
	}
	// payload
	const response = await resolve(request);

	return response;
};

export const getSession: GetSession = async ({ locals }) => {
	if (locals.token && locals.user) {
		return { token: locals.token, user: locals.user };
	}
	return {};
};
