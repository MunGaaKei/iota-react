import { Icon, List, Tag } from "@p";
import { TOption } from "@p/type";
import { InboxTwotone, SearchRound } from "@ricons/material";
import { ISelectOptions } from "./type";

export const Options = (props: ISelectOptions) => {
	const {
		value: val,
		options,
		filter,
		filterPlaceholder,
		multiple,
		empty = (
			<div className='i-select-options-empty'>
				<Icon icon={<InboxTwotone />} size='2.5em' />
			</div>
		),
		onSelect,
		onFilter,
	} = props;

	return (
		<div className='i-select-options'>
			{filter && (
				<div className='i-select-filter'>
					<Icon
						icon={<SearchRound />}
						className='color-8 ml-8 my-auto'
						size='1.2em'
					/>
					<input
						type='text'
						className='i-input'
						placeholder={filterPlaceholder}
						onChange={onFilter}
					/>
				</div>
			)}

			{options.length === 0 && empty}

			{options.map((option, i) => {
				const { label, value, disabled } = option;
				const isActive = multiple
					? val?.includes(value)
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
	value: any[] = [],
	max = 3
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

export const displayValue = (config) => {
	const { options, value, maxDisplay, multiple, onSelect } = config;

	if (multiple) {
		return activeOptions(options, value, maxDisplay).map((opt, i) => {
			if (typeof opt === "number") return <Tag key={i}>+{opt}</Tag>;

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
		});
	}

	return options.find((opt) => opt.value === value)?.label;
};
