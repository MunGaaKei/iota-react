import PubSub from "pubsub-js";
import {
	Children,
	cloneElement,
	isValidElement,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import Context from "./context";
import { IField } from "./type";

export default function Field(props: IField) {
	const { name, children } = props;
	const [value, setValue] = useState<any>();
	const form = useContext(Context);
	const { id } = form;

	const handleChange = useCallback(
		(v) => {
			if (!name) return;

			form.data[name] = v;
			setValue(v);
		},
		[name]
	);

	const clonedChildren = useMemo(() => {
		return Children.map(children, (node) => {
			if (!isValidElement(node)) return null;

			const { onChange } = node.props as any;

			return cloneElement(node, {
				value,
				onChange: (...args) => {
					handleChange(args[0]);
					onChange?.(...args);
				},
			} as any);
		});
	}, [children, value]);

	useEffect(() => {
		PubSub.subscribe(`${id}:set:${name}`, (evt, v) => setValue(v));

		return () => {
			PubSub.unsubscribe(`${id}:set:${name}`);
		};
	}, [name]);

	if (!name) return children;

	return clonedChildren;
}
