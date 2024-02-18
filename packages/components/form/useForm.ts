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
			const invalidMessage = invalidFn?.(data[field]);
			if (invalidMessage) {
				PubSub.publish(`${id}:invalid:${field}`, {
					message: invalidMessage,
					status: "error",
				});
				return false;
			}

			return true;
		}

		let isAllValid = true;

		Object.keys(data).map((field) => {
			const invalidFn = rules[field];
			const invalidMessage = invalidFn?.(data[field]);

			if (invalidMessage) {
				PubSub.publish(`${id}:invalid:${field}`, {
					message: invalidMessage,
					status: "error",
				});
				isAllValid = false;
			}
		});

		return isAllValid ? data : false;
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
