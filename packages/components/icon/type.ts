import { MenuFilled } from "@ricons/material";
import { MouseEvent } from "react";

export interface Props {
	icon: typeof MenuFilled;
	size?: string;
	className?: string;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
}
