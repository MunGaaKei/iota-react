import { ReactNode } from "react";

export type TypeMenuItem = {
	title: string | ReactNode;
	type?: string;
	icon?: ReactNode;
	expanded?: boolean;
};

export interface Props {
	items: TypeMenuItem[];
	depth?: number;
	selectable?: boolean;
	round?: boolean;
	ripple?: boolean;
}
