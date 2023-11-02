export type Position = "top" | "right" | "left" | "bottom";

export type RelativeOptions = {
	refWindow?: boolean;
	gap?: number;
	offset?: number;
	position?: Position;
	align?: "start" | "center" | "end";
};
