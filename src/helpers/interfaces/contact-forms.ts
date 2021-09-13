export interface ContactForm {
	_id?: string;
	lastname: string;
	firstname: string;
	email: string;
	organization: string;
	subjet: string;
	message: string;
	date: string; // TODO: Date
	contacted: boolean;
}
