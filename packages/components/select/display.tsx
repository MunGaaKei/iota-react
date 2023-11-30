import { Icon, List } from "@p";
import { TOption, TValue } from "@p/type";
import { InboxTwotone } from "@ricons/material";
import { ReactNode } from "react";

interface IOptions {
	multiple?: boolean;
	value?: TValue;
	options: TOption[];
	maxDisplay?: number;
	filter?: boolean;
	empty?: ReactNode;
	onSelect?: (v: TValue, option: TOption) => void;
}

interface IDisplayValues {
	values?: ReactNode[];
	max: number;
}

export const Options = (props: IOptions) => {
	const {
		value: val,
		options,
		filter,
		maxDisplay = 6,
		multiple,
		empty,
		onSelect,
	} = props;

	if (!options.length) {
		return (
			empty || (
				<div className='i-select-options-empty'>
					<Icon icon={<InboxTwotone />} size='2.5em' />
				</div>
			)
		);
	}

	return (
		<div className='i-select-options'>
			{filter && multiple && (
				<div className='i-select-options-header'>
					<DisplayValues
						values={activeLabels(options, val as string[])}
						max={maxDisplay}
					/>
				</div>
			)}
			{options.map((option, i) => {
				const { label, value, disabled } = option;
				const isActive = multiple
					? (val as TValue[])?.includes(value)
					: val === value;

				return (
					<List.Item
						key={(value as string) || i}
						active={isActive}
						type='option'
						onClick={() => onSelect?.(value, option)}
						disabled={disabled}
					>
						{label}
					</List.Item>
				);
			})}
		</div>
	);
};

export const DisplayValues = (props: IDisplayValues) => {
	const { values, max } = props;
	const l = values?.length;

	if (!l) return <></>;

	const displays: ReactNode[] = [];

	for (let i = 0; i < l; i++) {
		if (i >= max) {
			displays.push(`+${l - max}`);
			break;
		}
		displays.push(values[i]);
	}

	return displays.map((v, i) => (
		<span key={v as string} className='i-select-value'>
			{v}
		</span>
	));
};

export const activeLabels = (options: TOption[] = [], value: TValue[] = []) =>
	options.flatMap((opt) => (value.includes(opt.value) ? [opt.label] : []));
