import { BaseElement } from "@p/type";

type FlexDirection =
	| "column"
	| "inherit"
	| "initial"
	| "revert"
	| "unset"
	| "column-reverse"
	| "row"
	| "row-reverse";

type FlexWrap = "wrap" | "nowrap";

export interface Props extends BaseElement {
	as?: keyof JSX.IntrinsicElements;
	align?: string;
	justify?: string;
	gap?: string | number;
	direction?: FlexDirection;
	wrap?: FlexWrap;
	columns?: string | number;
}
