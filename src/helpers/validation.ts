import { emailRegex } from "./regex";

// Email
export const isValidEmail = (email: string) => {
	return emailRegex.test(String(email).toLowerCase());
};

export const isEmptyArray = (arr: string[]) => {
	for (const arg in arr) {
		if (arr[arg].trim() === "" || arr[arg] === null) {
			return true;
		}
	}
	return false;
};

export const isEmptyObject = (obj: any) => {
	for (const arg in obj) {
		if (obj[arg] === "" || obj[arg] === null) {
			return true;
		}
	}
	return false;
};
