export type Value = string | boolean | number;

export interface Rule {
	isValid: (...args: Value[]) => boolean;
	msg: string;
}
export interface ValidationProperty {
	rules: Rule[];
	required?: boolean;
	displayAll?: boolean;
}

export interface ValidationErrors {
	[key: string]: string[];
}

export interface ValidationMap {
	[key: string]: ValidationProperty;
}
