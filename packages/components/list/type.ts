import { HTMLAttributes } from "react";

export interface IList extends HTMLAttributes<HTMLUListElement> {
	virtual?: {};
}

export interface IListItem extends HTMLAttributes<HTMLLIElement> {
	active?: boolean;
	type?: "option" | "default";
	align?: string;
	disabled?: boolean;
}
