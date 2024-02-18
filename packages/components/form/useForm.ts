import { uniqueId } from "lodash";
import { useRef } from "react";

export class IFormHandler {
	readonly id?: string;
	data: { [key: string]: any } = {};
	rules?: { [key: string]: (val?: any) => boolean | string } = {};

	get(field?: string) {
		return field ? this.data[field] : this.data;
	}

	set(field: any, value?: any) {
		const id = this.id;
		if (typeof field === "string") {
			this.data[field] = value;
			PubSub.publish(`${id}:set:${field}`, value);
			return;
		}

		Object.keys(field).map((name) => {
			this.data[name] = field[name];
			PubSub.publish(`${id}:set:${name}`, field[name]);
		});
	}

	clear() {
		Object.keys(this.data).map((name) => {
			this.data[name] = undefined;
			PubSub.publish(`${this.id}:set:${name}`, "");
		});
	}

	async validate(field?: string) {
		return {};
	}

	getInstance() {
		const id = uniqueId();
		const { rules, get, set, clear, validate } = this;

		return {
			id,
			rules,
			get,
			set,
			clear,
			validate,
		};
	}
}

export default function useForm(form?: IFormHandler) {
	const formRef = useRef<IFormHandler>();

	if (!formRef.current) {
		if (form) {
			formRef.current = form;
		} else {
			formRef.current = new IFormHandler().getInstance() as IFormHandler;
		}
	}
	return formRef.current;
}
