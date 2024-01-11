import { renderNode } from "@p/js/utils";
import { useReactive } from "ahooks";
import Modal from "./modal";
import { Props } from "./type";

export default function useModal(props: Props) {
	const { visible, onClose } = props;
	const state = useReactive({
		visible: false,
	});

	const handleOpen = () => {
		const unMount = renderNode(
			<Modal {...props} visible={state.visible} onClose={handleClose} />
		);
	};

	const handleClose = () => {
		onClose?.();
		// unMount?.();
	};

	return {
		open: handleOpen,
		close: handleClose,
		update: () => {},
	};
}
