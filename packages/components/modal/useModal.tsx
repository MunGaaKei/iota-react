import { renderNode } from "@p/js/utils";
import { useRef } from "react";
import HookModal from "./hookModal";
import { Props, RefHookModal } from "./type";

export default function useModal() {
	const ref = useRef<RefHookModal>(null);

	const handleOpen = (props: Props) => {
		const unMount = renderNode(
			<HookModal
				ref={ref}
				visible
				{...props}
				onClose={() => {
					props.onClose?.();
					unMount?.();
				}}
			/>
		);
	};

	const handleUpdate = (props?: Props) => {
		if (!ref.current) return;

		const { update } = ref.current;
		update(props);
	};

	return {
		open: handleOpen,
		update: handleUpdate,
	};
}
