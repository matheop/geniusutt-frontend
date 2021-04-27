import {
	emailRegex,
} from "./regex";
import type { ValidationObject } from "./interfaces/index";

// Email
export const isValidEmail = (email: string) => {
	return emailRegex.test(String(email).toLowerCase());
};