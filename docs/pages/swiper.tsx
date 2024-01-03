import { Swiper } from "@p";
import { CSSProperties } from "react";

export default function Page() {
	const itemStyle = {
		backgroundImage:
			"linear-gradient(135deg, rgb(245, 247, 250) 0%, rgb(195, 207, 226) 100%)",
		fontSize: "4em",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 110,
		width: "100%",
		textAlign: "center",
		borderRadius: "var(--radius)",
	} as CSSProperties;

	return (
		<>
			<Swiper display={2} style={{ width: 600 }} gap={10}>
				<Swiper.Item>
					<div style={itemStyle}>1</div>
				</Swiper.Item>
				<Swiper.Item>
					<div style={itemStyle}>2</div>
				</Swiper.Item>
				<Swiper.Item>
					<div style={itemStyle}>3</div>
				</Swiper.Item>
				<Swiper.Item>
					<div style={itemStyle}>4</div>
				</Swiper.Item>
				<Swiper.Item>
					<div style={itemStyle}>5</div>
				</Swiper.Item>
				<Swiper.Item>
					<div style={itemStyle}>6</div>
				</Swiper.Item>
				<Swiper.Item>
					<div style={itemStyle}>7</div>
				</Swiper.Item>
			</Swiper>
		</>
	);
}
