import { session } from "$app/stores";
import cookie from "cookie";
import { SITE_URL } from "env";

export const logout = (): void => {
	document.cookie = cookie.serialize("token", null, {
		maxAge: 1,
	});

	document.cookie = cookie.serialize("user", null, {
		maxAge: 1,
	});
	session.set({ user: null, token: null, expiryDate: null });

	window.location.replace(`${SITE_URL}/admin`);
};
