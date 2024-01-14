import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Helpericon from "../utils/helpericon";
import "./index.scss";
import { Props, PropsContent } from "./type";
import useModal from "./useModal";

function DefaultContent(props: PropsContent) {
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

function Modal(props: Props) {
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
		children,
		style,
		className,
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

	if (!show) return <></>;

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
