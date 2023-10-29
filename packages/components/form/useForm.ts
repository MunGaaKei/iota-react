import { uniqueId } from "lodash";
import PubSub from "pubsub-js";
import { useRef } from "react";

const presetValidators = {
	required: (val?: any) => ([undefined, ""].includes(val) ? "*" : false),
};

export class FormStore {
	readonly name?: string;
	state: { [key: string]: any } = {};
	rules?: { [key: string]: (val?: any) => boolean | string } = {};

	get(field?: string) {
		return field ? this.state[field] : this.state;
	}

	set(field: any, value?: any) {
		const form = this.name;

		if (typeof field === "string") {
			this.state[field] = value;
			PubSub.publish(`${form}:set:${field}`, value);
			return;
		}

		Object.keys(field).map((name) => {
			this.state[name] = field[name];
			PubSub.publish(`${form}:set:${name}`, field[name]);
		});
	}

	clear() {
		Object.keys(this.state).map((name) => {
			this.state[name] = undefined;
			PubSub.publish(`${this.name}:set:${name}`, "");
		});
	}

	setInvalid(name: string, status: { [key: string]: any }) {
		const inputStatus =
			typeof status === "string"
				? { message: status, status: "error" }
				: status;
		PubSub.publish(`${this.name}:invalid:${name}`, inputStatus);
	}

	async validate() {
		const { name, rules, state } = this;
		if (!rules) return state;

		let isAllValid = true;

		Object.keys(state).map((field) => {
			const invalidFn = rules[field];
			const invalidMessage = invalidFn?.(state[field]);

			if (invalidMessage) {
				PubSub.publish(`${name}:invalid:${field}`, {
					message: invalidMessage,
					status: "error",
				});
				isAllValid = false;
			}
		});

		return isAllValid ? state : false;
	}

	init(form: string) {
		PubSub.subscribe(`${form}:setFormState`, (evt: string, data: any) => {
			Object.assign(this.state, data);
		});
	}

	getInstance() {
		const name = uniqueId();
		const { rules, state, get, set, clear, validate, setInvalid } = this;

		this.init(name);

		return {
			name,
			rules,
			state,
			get,
			set,
			clear,
			validate,
			setInvalid,
		};
	}
}

export default function useForm(form?: FormStore) {
	const formRef = useRef<FormStore>();
	if (!formRef.current) {
		if (form) {
			formRef.current = form;
		} else {
			formRef.current = new FormStore().getInstance() as FormStore;
		}
	}
	return formRef.current;
}
