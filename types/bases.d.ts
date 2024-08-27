export type DesireRouteFace = {
	route: string;
	method?: string | undefined;
	handle: Function;
	upload?: boolean | undefined;
	option?: Object | undefined;
};

export type DesireRouteFold = {
	route: string;
	path: string;
	option?: Object | undefined;
};
