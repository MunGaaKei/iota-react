import classNames from "classnames";
import { CSSProperties } from "react";
import "./index.scss";
import { IDescription } from "./type";

const Description = (props: IDescription): JSX.Element => {
	const {
		data,
		colon,
		columns = 3,
		gap = ".5em",
		labelWidth,
		vertical,
		style,
		className,
	} = props;

	return (
		<div
			className={classNames("i-description", className)}
			style={
				{
					["--description-label-width"]: labelWidth,
					gridTemplateColumns: `repeat(${columns}, auto)`,
					gap,
					...style,
				} as CSSProperties
			}
		>
			{data.map((item, i) => {
				const { label, value, style, rowSpan = 1, colSpan = 1 } = item;

				return (
					<div
						key={i}
						className={classNames("i-description-item", {
							"i-description-item-vertical": vertical,
						})}
						style={{
							gridColumn: `span ${colSpan}`,
							gridRow: `span ${rowSpan}`,
							...style,
						}}
					>
						<div className='i-description-label'>
							{label}
							{colon}
						</div>
						<div className='i-description-value'>{value}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Description;
