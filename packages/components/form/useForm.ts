import { uid } from "radash";
import { useRef } from "react";
import { TValidator } from "./type";

export class IFormInstance {
	readonly id?: string;
	data: { [key: string]: any } = {};
	rules?: { [key: string]: TValidator } = {};

	constructor() {
		this.id = uid(8);
		this.data = {};
	}

	get(field?: string) {
		return field ? this.data[field] : this.data;
	}

	set(field: any, value?: any) {
		const id = this.id;
		if (!this.data) return;

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
		if (!this.data) return;

		Object.keys(this.data).map((name) => {
			PubSub.publish(`${this.id}:set:${name}`, undefined);
			this.data[name] = undefined;
		});
	}

	async validate(field?: string) {
		const { id, rules, data } = this;
		if (!rules) return data;

		if (field) {
			const invalidFn = rules[field];
			const invalidMessage = invalidFn?.(data[field], this);

			if (invalidMessage) {
				PubSub.publish(`${id}:invalid:${field}`, {
					message: invalidMessage,
					status: "error",
				});
				return false;
			}

			PubSub.publish(`${id}:invalid:${name}`, {
				message: "",
				status: "normal",
			});
			return true;
		}

		let isAllValid = true;

		Object.keys(data).map((name) => {
			const invalidFn = rules[name];
			const invalidMessage = invalidFn?.(data[name], this);

			if (invalidMessage) {
				PubSub.publish(`${id}:invalid:${name}`, {
					message: invalidMessage,
					status: "error",
				});
				isAllValid = false;
			} else {
				PubSub.publish(`${id}:invalid:${name}`, {
					message: "",
					status: "normal",
				});
			}
		});

		return isAllValid ? data : false;
	}
}

export default function useForm(form?: IFormInstance) {
	const formRef = useRef<IFormInstance>();

	if (!formRef.current) {
		formRef.current = form ?? new IFormInstance();
	}

	return formRef.current;
}
