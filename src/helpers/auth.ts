import { session } from "$app/stores";

export const logout = (): void => {
	document.cookie = "token=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
	document.cookie = "user=; Expires=Thu, 01 Jan 1970 00:00:00 UTC";
	session.set({ user: null, token: null, expiryDate: null });
};
