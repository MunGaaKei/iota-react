import { Button, Flex, Icon, Message } from "@p";
import {
	CopyAllTwotone,
	UnfoldLessRound,
	UnfoldMoreRound,
} from "@ricons/material";
import classNames from "classnames";
import { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import CodeView from "../code";
import "./index.css";

export default function Demo(props) {
	const { source, className, inline } = props;
	const { demo, code, lang } = source;
	const [collapsed, setCollapsed] = useState<any>(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code);
		Message({
			content: "复制成功 👌",
			className: "bg-blue",
		});
	};

	return (
		<Flex
			className={className}
			direction={inline ? "row" : "column"}
			gap={12}
		>
			<div className='demo-component'>
				{typeof demo === "function" ? demo() : demo}
			</div>
			<div
				className={classNames("demo-code", {
					"demo-code-collapsed": collapsed,
				})}
			>
				<div className='demo-code-actions'>
					<Button.Toggle
						secondary
						square
						flat
						size='small'
						active={collapsed}
						after={<Icon icon={<UnfoldMoreRound />} />}
						onToggle={setCollapsed}
					>
						<Icon icon={<UnfoldLessRound />} />
					</Button.Toggle>
					<Button
						secondary
						square
						flat
						size='small'
						onClick={handleCopy}
					>
						<Icon icon={<CopyAllTwotone />} />
					</Button>
				</div>
				{collapsed ? (
					<></>
				) : (
					<Scrollbars
						autoHide
						autoHeight
						autoHeightMax={400}
						className='flex-1'
					>
						<CodeView lang={lang}>{code}</CodeView>
					</Scrollbars>
				)}
			</div>
		</Flex>
	);
}
