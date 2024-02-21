import classNames from "classnames";
import { uniqueId } from "lodash";
import {
	ReactNode,
	forwardRef,
	isValidElement,
	useEffect,
	useRef,
	useState,
} from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import type { IMessage, IMessageItem } from "./type";

const GlobalConfig = {
	fromStart: true,
	align: "center",
	offset: "12px",
	gap: 12,
	max: 0,
};

const ItemConfig = {
	duration: 3000,
	closable: true,
	active: false,
};

const container = createContainer();
const queue: IMessage[] = [];
const heights: number[] = [];
const handler = {
	callout(item: IMessage) {},
	close() {},
};

createRoot(container).render(<Messages />);

const MessageItem = forwardRef<HTMLDivElement, IMessageItem>(function (
	{ active, content, top, className, onClick },
	ref
) {
	return (
		<div
			ref={ref}
			className={classNames("i-message", className, {
				"i-message-active": active,
			})}
			style={{
				top,
			}}
			onClick={onClick}
		>
			{content}
		</div>
	);
});

function Messages() {
	const [items, setItems] = useState<IMessage[]>(queue);
	const [tops, setTops] = useState<number[]>([]);
	const ref = useRef<HTMLDivElement>(null);
	let offsetTop = 0;

	useEffect(() => {
		Object.assign(handler, {
			callout: function (item: IMessage) {
				const size = queue.push(item);
				setItems([...queue]);

				setTimeout(() => {
					const h = ref.current?.offsetHeight || 0;
					queue[size - 1].active = true;
					setItems([...queue]);
					heights.push(h);
					setTops([...heights]);
				}, 0);

				!!item.duration &&
					setTimeout(this.close.bind(item), item.duration);
			},
			close: function () {
				const item = this as IMessage;
				const index = queue.findIndex((i) => i.id === item.id);
				if (index < 0) return;

				queue[index].active = false;
				setItems([...queue]);

				item.timer = setTimeout(() => {
					const index = queue.findIndex((i) => i.id === item.id);

					queue.splice(index, 1);
					heights.splice(index, 1);
					setTops([...heights]);
					setItems([...queue]);
					item.timer && clearTimeout(item.timer);
				}, 240);
			},
		});
	}, []);

	return (
		<div className='i-messages' style={{ alignItems: GlobalConfig.align }}>
			{items.map((item, i) => {
				if (!item) return <></>;

				const { id, active, content, className } = item;
				offsetTop += tops[i - 1] || 0;
				const top = GlobalConfig.gap * i + offsetTop;

				return (
					<MessageItem
						key={id}
						ref={ref}
						active={active}
						content={content}
						top={top}
						className={className}
						onClick={handler.close.bind(item)}
					/>
				);
			})}
		</div>
	);
}

export function setMessageConfig(config: IMessage) {
	Object.assign(GlobalConfig, config);
}

export default function message(config: IMessage | ReactNode) {
	if (
		["string", "number"].includes(typeof config) ||
		isValidElement(config)
	) {
		config = { content: config as ReactNode };
	}

	Object.assign(config as IMessage, ItemConfig, {
		id: uniqueId("message-"),
	});

	handler.callout(config as IMessage);

	return handler.close.bind(config);
}

function createContainer() {
	const container = document.createElement("div");
	container.dataset.id = "messages";
	document.body.append(container);

	return container;
}
