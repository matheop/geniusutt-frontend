export interface Event {
	_id?: string;
	name: string;
	date: string; // TODO: Date
	schedule: string;
	place: string;
	desc: string;
	imgUrl: string;
	videoUrl?: string;
	tags?: string[];
	eventUrl: string; // Facebook event
	upcoming: boolean;
}
