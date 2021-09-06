/* eslint-disable @typescript-eslint/no-inferrable-types */
import { emailRegex } from "./regex";

// Email
export const isValidEmail = (email: string) => {
	return emailRegex.test(String(email).toLowerCase());
};

export const isEmpty = (arr: string[]) => {
	for (const arg in arr) {
		if (arr[arg].trim() === "" || arr[arg] === null) {
			return true;
		}
	}
	return false;
};
