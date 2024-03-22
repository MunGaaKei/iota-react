import { Button, Flex, Swiper } from "@p";
import { CSSProperties, useRef } from "react";

export default function Page() {
	const itemStyle = {
		backgroundImage:
			"linear-gradient(135deg, var(--color-5) 0%, var(--color-7) 100%)",
		fontSize: "4em",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: 110,
		width: "100%",
		textAlign: "center",
		borderRadius: "var(--radius)",
	} as CSSProperties;
	const ref = useRef<any>();

	return (
		<>
			<Swiper ref={ref} display={2} style={{ width: 600 }} gap={10}>
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

			<Flex className='mt-12' gap={12}>
				<Button onClick={() => ref.current?.swipeTo(2)}>
					Swipe to 3
				</Button>
				<Button onClick={() => ref.current?.swipePrev()}>
					Swipe Prev
				</Button>
				<Button onClick={() => ref.current?.swipeNext()}>
					Swipe Next
				</Button>
			</Flex>
		</>
	);
}
