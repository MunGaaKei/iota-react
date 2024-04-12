import { Icon, Tabs } from "@p";
import { CodeRound, GridViewTwotone } from "@ricons/material";
import classNames from "classnames";
import CodeView from "../code";
import "./index.scss";

export default function Demo(props) {
	const { source, className, style } = props;
	const { demo, code, lang } = source;

	return (
		<Tabs
			active={"preview"}
			className={classNames("iota-demo", className)}
			style={style}
			barStyle={{ height: 4 }}
		>
			<Tabs.Item
				title={<Icon icon={<GridViewTwotone />} />}
				key='preview'
			>
				<div className='my-12'>{demo}</div>
			</Tabs.Item>
			<Tabs.Item title={<Icon icon={<CodeRound />} />} key='code'>
				<div
					className='my-12'
					style={{
						maxHeight: 800,
						overflow: "auto",
						borderRadius: "var(--radius)",
					}}
				>
					<CodeView lang={lang}>{code}</CodeView>
				</div>
			</Tabs.Item>
		</Tabs>
	);
}
