import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Helpericon from "../utils/helpericon";
import "./index.css";
import { IModal, IModalContent } from "./type";
import useModal from "./useModal";

function DefaultContent(props: IModalContent) {
	const { title, hideCloseButton, children, onHide } = props;

	return (
		<>
			{
				<header className='i-modal-header'>
					{title}

					<Helpericon
						active={!hideCloseButton}
						className='i-modal-close'
						onClick={onHide}
					/>
				</header>
			}

			<div className='i-modal-content'>{children}</div>

			{<footer className='i-modal-footer'></footer>}
		</>
	);
}

function Modal(props: IModal) {
	const {
		visible,
		title,
		closable = true,
		backdropClosable = true,
		hideCloseButton,
		width,
		height,
		customized,
		fixed,
		shadow = true,
		children,
		style,
		className,
		onToggle,
		onClose,
		...restProps
	} = props;
	const [show, setShow] = useState(visible);
	const [active, setActive] = useState(false);
	const [bounced, setBounced] = useState(false);
	const toggable = useRef(true);

	const handleShow = useCallback(() => {
		if (!toggable.current) return;

		setShow(true);
		toggable.current = false;
		setTimeout(() => {
			setActive(true);
			onToggle?.(true);
			toggable.current = true;
		}, 24);
	}, []);

	const handleHide = useCallback(() => {
		if (!toggable.current) return;
		toggable.current = false;

		if (!closable) {
			setBounced(true);
			setTimeout(() => {
				setBounced(false);
				toggable.current = true;
			}, 400);
			return;
		}

		setActive(false);
		setTimeout(() => {
			setShow(false);
			toggable.current = true;
			onToggle?.(false);
			onClose?.();
		}, 240);
	}, [closable]);

	const handleBackdropClick = useCallback(
		function () {
			backdropClosable && handleHide();
		},
		[closable, backdropClosable]
	);

	useEffect(() => {
		visible ? handleShow() : handleHide();
	}, [visible]);

	if (!show) return null;

	return createPortal(
		<div
			className={classNames(
				"i-backdrop-modal",
				{
					"i-modal-active": active,
					fixed,
				},
				className
			)}
			style={style}
			onClick={handleBackdropClick}
		>
			<div
				className={classNames("i-modal", {
					bounced,
					shadow,
				})}
				style={{
					width,
					height,
				}}
				onClick={(e) => e.stopPropagation()}
				{...restProps}
			>
				{customized ? (
					children
				) : (
					<DefaultContent
						title={title}
						hideCloseButton={hideCloseButton}
						onHide={handleHide}
					>
						{children}
					</DefaultContent>
				)}
			</div>
		</div>,
		document.body
	);
}

Modal.useModal = useModal;

export default Modal;
