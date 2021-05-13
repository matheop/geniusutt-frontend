export interface Event {
	name: string;
	desc: string;
	imgUrl: string;
	videoUrl?: string;
	place: string;
	date: string; // TODO: Date
	schedule: string;
	tags?: string[];
	eventUrl: string; // Facebook event
	upcoming: boolean;
}
