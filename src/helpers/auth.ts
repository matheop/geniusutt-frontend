import { isAuth } from "$stores/isAuth";

export const logout = (): void => {
	isAuth.set(null);
};
