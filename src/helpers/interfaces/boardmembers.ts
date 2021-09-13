export interface BoardMember {
	_id?: string;
	name: string;
	position: string;
	shortDesc: string;
	longDesc: string;
	imgUrl: string;
	linkedin?: string;
}

const member: BoardMember = {
	name: "",
	position: "",
	shortDesc: "",
	longDesc: "",
	imgUrl: "",
	linkedin: "",
};

export const emptyMember: BoardMember = JSON.parse(
	JSON.stringify(member)
);
