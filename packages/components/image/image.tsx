import classNames from "classnames";
import Loading from "../loading";
import "./index.scss";
import { Props } from "./type";
import View from "./view";

const Image = (props: Props): JSX.Element => {
	const { src, round, loading, ...restProps } = props;

	return (
		<div
			className={classNames("i-image", {
				rounded: round,
			})}
		>
			{loading && <Loading />}

			<img src={src} {...restProps} />
		</div>
	);
};

Image.View = View;

export default Image;
