import { Icon, List, Tag } from "@p";
import { TOption, TValue } from "@p/type";
import { InboxTwotone } from "@ricons/material";
import { ISelectOptions } from "./type";

export const Options = (props: ISelectOptions) => {
	const {
		value: val,
		options,
		filter,
		maxDisplay = 2,
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
					{activeOptions(options, val as TValue[], maxDisplay).map(
						(opt, i) => {
							if (typeof opt === "number")
								return <Tag key={i}>+{opt}</Tag>;

							const { label, value } = opt;

							return (
								<Tag
									key={value as string}
									onClose={(e) => {
										e?.stopPropagation();
										onSelect?.(value, opt);
									}}
								>
									{label}
								</Tag>
							);
						}
					)}
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

export const activeOptions = (
	options: TOption[] = [],
	value: TValue[] = [],
	max = 6
) => {
	const total = options.flatMap((opt) =>
		value.includes(opt.value) ? [opt] : []
	);

	if (max >= total.length) return total;

	const rest = total.length - max;
	const after = total.slice(0, max);
	after.push(rest as any);

	return after;
};
