import { session } from "$app/stores";

export const logout = (): void => {
	session.set(null);
	localStorage.clear();
};
