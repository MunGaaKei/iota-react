export type TPosition = "top" | "right" | "left" | "bottom";

export type TRelativeOptions = {
	refWindow?: boolean;
	gap?: number;
	offset?: number;
	position?: TPosition;
	align?: "start" | "center" | "end";
};
