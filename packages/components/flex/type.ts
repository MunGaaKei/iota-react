import { CSSProperties, ReactNode } from "react";

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

export interface Props {
	as?: keyof JSX.IntrinsicElements;
	align?: string;
	justify?: string;
	gap?: string;
	direction?: FlexDirection;
	wrap?: FlexWrap;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
}
