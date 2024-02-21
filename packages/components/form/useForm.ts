import { uniqueId } from "lodash";
import { useRef } from "react";
import { Tvalidator } from "./type";

export class IFormHandler {
	readonly id?: string;
	data: { [key: string]: any } = {};
	rules?: { [key: string]: Tvalidator } = {};

	constructor() {
		this.id = uniqueId();
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
			this.data[name] = undefined;
			PubSub.publish(`${this.id}:set:${name}`, "");
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

export default function useForm(form?: IFormHandler) {
	const formRef = useRef<IFormHandler>();

	if (!formRef.current) {
		formRef.current = form ?? new IFormHandler();
	}

	return formRef.current;
}
