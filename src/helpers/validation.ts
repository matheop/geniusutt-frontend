/* eslint-disable @typescript-eslint/no-inferrable-types */
import { emailRegex } from "./regex";

// Email
export const isValidEmail = (email: string) => {
	return emailRegex.test(String(email).toLowerCase());
};

export const isEmpty = (arr: string[]) => {
	let isEmpty: boolean = false;
	for (const arg in arr) {
		if (arg.trim() === "" || arg === null) {
			return (isEmpty = true);
		}
	}
	return isEmpty;
};
