import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLSpanElement> {
	hideDot?: boolean;
}
