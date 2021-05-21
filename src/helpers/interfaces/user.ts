export interface User {
	_id: string;
	name: string;
	email: string;
	role: "Admin" | "Modo";
	password?: string;
}
