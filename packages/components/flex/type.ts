import { BaseElement } from "@p/type";

export interface IFlex extends BaseElement {
	as?: keyof JSX.IntrinsicElements;
	align?: string;
	justify?: string;
	gap?: string | number;
	direction?: any;
	wrap?: any;
	columns?: string | number;
}
