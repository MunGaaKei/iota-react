import { Icon, List, Loading } from "@p";
import { TOption, TValue } from "@p/type";
import { ClearRound, UnfoldMoreRound } from "@ricons/material";
import classNames from "classnames";
import { MouseEvent, ReactNode } from "react";

interface IOptions {
	multiple?: boolean;
	value?: TValue;
	options: TOption[];
	onSelect?: (v: TValue, option: TOption) => void;
}

interface IDisplayIcon {
	loading?: boolean;
	clearable?: boolean;
	onClick?: (e: MouseEvent) => void;
}

interface IDisplayValues {
	values?: ReactNode[];
	max?: number;
}

export const Options = (props: IOptions) => {
	const { value: val, options, multiple, onSelect } = props;

	return (
		<div className='i-select-options'>
			{options.map((option, i) => {
				const { label, value, disabled } = option;
				const isActive = multiple
					? (val as TValue[])?.includes(value)
					: val === value;

				return (
					<List.Option
						key={(value as string) || i}
						active={isActive}
						onClick={() => onSelect?.(value, option)}
						disabled={disabled}
					>
						{label}
					</List.Option>
				);
			})}
		</div>
	);
};

export const DisplayIcon = (props: IDisplayIcon) => {
	const { loading, clearable, onClick } = props;
	const state: {
		icon?: ReactNode;
		className?: string;
	} = {};

	switch (true) {
		case clearable:
			state.icon = <ClearRound />;
			state.className = "i-select-clear";
			break;
		case loading:
			state.icon = <Loading />;
			break;
		default:
			state.icon = <UnfoldMoreRound />;
			break;
	}

	return (
		<Icon
			icon={state.icon}
			className={classNames("i-select-spin", state.className)}
			onClick={onClick}
		/>
	);
};

export const DisplayValues = (props: IDisplayValues) => {
	const { values, max } = props;
	const l = values?.length;

	if (!l) return <></>;

	return values.map((v) => {
		return (
			<span key={v as string} className='i-select-value'>
				{v}
			</span>
		);
	});
};

export const activeLabels = (options: TOption[] = [], value: TValue[] = []) =>
	options.flatMap((opt) => (value.includes(opt.value) ? [opt.label] : []));
