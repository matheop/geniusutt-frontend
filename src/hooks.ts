import cookie from "cookie";
import type { Handle, GetSession } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(
		event.request.headers.get("cookie") || ""
	);

	const token = cookies?.token;

	let user;
	if (cookies.user) user = JSON.parse(cookies.user);

	if (token && user) {
		event.locals = { token, user };
	}
	// payload
	const response = await resolve(event);

	return response;
};

export const getSession: GetSession = async (event) => {
	if (event.locals.token && event.locals.user) {
		return { token: event.locals.token, user: event.locals.user };
	}
	return {};
};
