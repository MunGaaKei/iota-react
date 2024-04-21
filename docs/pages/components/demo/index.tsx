import { Button, Flex, Icon, Message } from "@p";
import { CopyAllTwotone } from "@ricons/material";
import Scrollbars from "react-custom-scrollbars-2";
import CodeView from "../code";
import "./index.css";

export default function Demo(props) {
	const { source, className, inline } = props;
	const { demo, code, lang } = source;

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
			<div className='demo-code'>
				<div className='demo-code-actions'>
					<Button secondary square size='small' onClick={handleCopy}>
						<Icon icon={<CopyAllTwotone />} />
					</Button>
				</div>
				<Scrollbars
					autoHide
					autoHeight
					autoHeightMax={400}
					className='flex-1'
				>
					<CodeView lang={lang}>{code}</CodeView>
				</Scrollbars>
			</div>
		</Flex>
	);
}
