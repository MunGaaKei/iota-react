import classNames from "classnames";
import Loading from "../loading";
import "./index.scss";
import { Props } from "./type";
import View from "./view";

const Image = (props: Props): JSX.Element => {
	const {
		src,
		round,
		size,
		loading,
		style,
		className,
		children,
		...restProps
	} = props;

	return (
		<div
			style={{
				width: size,
				height: size,
				...style,
			}}
			className={classNames("i-image", className, {
				rounded: round,
			})}
		>
			{loading && <Loading />}

			{src && <img src={src} {...restProps} />}

			{children && <span className='i-image-text'>{children}</span>}
		</div>
	);
};

Image.View = View;

export default Image;
