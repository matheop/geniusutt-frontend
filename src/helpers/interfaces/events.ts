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

const event: Event = {
	name: "",
	date: "",
	schedule: "",
	place: "",
	desc: "",
	imgUrl: "",
	eventUrl: "",
	upcoming: null,
};

export const emptyEvent: Event = JSON.parse(JSON.stringify(event));
