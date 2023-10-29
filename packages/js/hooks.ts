import PubSub from "pubsub-js";
import { useEffect } from "react";

export function useFormRegist(props: {
	form?: string;
	name?: string;
	state?: { [key: string]: any };
	initialValue?: { [key: string]: any };
}) {
	const { form, name, state, initialValue } = props;

	if (!form || !name || !state) return;

	useEffect(() => {
		const onSetFieldValue = PubSub.subscribe(
			`${form}:set:${name}`,
			(evt, value) => {
				Object.assign(state, { value });
			}
		);

		const onInvalid = PubSub.subscribe(
			`${form}:invalid:${name}`,
			(evt, status) => {
				Object.assign(state, status);
			}
		);

		PubSub.publish(`${form}:setFormState`, { [name]: initialValue });

		return () => {
			PubSub.unsubscribe(onSetFieldValue);
			PubSub.unsubscribe(onInvalid);
		};
	}, []);

	return (value: any) => {
		PubSub.publish(`${form}:setFormState`, { [name]: value });
	};
}
