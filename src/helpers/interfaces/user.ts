export interface User {
	_id?: string;
	name: string;
	email: string;
	role: "Admin" | "Modo";
	password?: string;
}

const user: User = {
	name: "",
	email: "",
	role: null,
};

export const emptyUser: User = JSON.parse(JSON.stringify(user));
