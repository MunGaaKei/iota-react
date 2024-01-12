import { useReactive } from "ahooks";
import { forwardRef, useImperativeHandle } from "react";
import Modal from "./modal";
import { Props, PropsHookModal, RefHookModal } from "./type";

const HookModal = forwardRef<RefHookModal, PropsHookModal>((props, ref) => {
	const state = useReactive<PropsHookModal>({});

	useImperativeHandle(ref, () => ({
		update: (config: Props = {}) => {
			Object.assign(state, config);
		},
	}));

	return <Modal {...props} {...state} />;
});

export default HookModal;
