import { useReactive } from "ahooks";
import { MouseEvent } from "react";
import Button from "../button";
import { IButton } from "../button/type";
import Flex from "../flex";
import Popup from "../popup";
import "./index.css";
import { IPopconfirm } from "./type";

const defaultOk = {
	children: "确定",
};

const defaultCancel = {
	children: "取消",
	secondary: true,
};

const Popconfirm = (props: IPopconfirm): JSX.Element => {
	const {
		trigger = "click",
		visible,
		content,
		okProps,
		cancelProps,
		children,
		align = "end",
		position = "top",
		offset = 12,
		onOk,
		onCancel,
		...restProps
	} = props;

	const state = useReactive({
		loading: false,
		visible,
	});

	const ok: IButton = okProps
		? Object.assign({}, defaultOk, okProps)
		: defaultOk;
	const cancel: IButton = cancelProps
		? Object.assign({}, defaultCancel, cancelProps)
		: defaultCancel;

	const handleVisibleChange = (v: boolean) => {
		state.visible = v;
		restProps.onVisibleChange?.(v);
	};

	const handleOk = async (e: MouseEvent<HTMLElement>) => {
		state.loading = true;
		ok.onClick?.(e);
		await onOk?.();
		state.loading = false;
		state.visible = false;
	};

	const handleCancel = async (e: MouseEvent<HTMLElement>) => {
		cancel.onClick?.(e);
		await onCancel?.();
		state.visible = false;
	};

	const popconfirmContent = (
		<div className='i-popconfirm'>
			{content}

			<Flex gap={12} justify='flex-end' className='mt-8'>
				{cancelProps !== null && (
					<Button {...cancel} onClick={handleCancel} />
				)}
				{okProps !== null && (
					<Button
						loading={state.loading}
						{...ok}
						onClick={handleOk}
					/>
				)}
			</Flex>
		</div>
	);

	return (
		<Popup
			content={popconfirmContent}
			{...restProps}
			trigger={trigger}
			visible={state.visible}
			align={align}
			offset={offset}
			position={position}
			onVisibleChange={handleVisibleChange}
		>
			{children}
		</Popup>
	);
};

export default Popconfirm;
