import classNames from "classnames";
import "./index.scss";
import { ILoading } from "./type";

const Loading = (props: ILoading): JSX.Element => {
	const { icon, text, size, style = {}, className, ...rest } = props;

	return (
		<div
			className={classNames("i-loading-container", className)}
			style={{ fontSize: size, ...style }}
			{...rest}
		>
			{icon || (
				<svg
					width='24'
					height='24'
					stroke='#000'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'
					className='i-loading-icon'
				>
					<circle
						cx='12'
						cy='12'
						r='9.5'
						fill='none'
						strokeWidth='3'
						strokeLinecap='round'
						strokeDasharray={40}
						strokeDashoffset={0}
					/>
				</svg>
			)}

			{text}
		</div>
	);
};

export default Loading;
