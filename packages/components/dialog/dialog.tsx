import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Helpericon from "../utils/helpericon";
import "./index.scss";
import { Props, PropsContent } from "./type";

export default function Dialog(props: Props) {
	const {
		visible,
		title,
		closable = true,
		backdropClosable = true,
		hideCloseButton,
		width,
		height,
		customized,
		children,
		onClose,
		...rest
	} = props;
	const [show, setShow] = useState(visible);
	const [active, setActive] = useState(visible);
	const [bounced, setBounced] = useState(false);
	const toggable = useRef(true);

	useEffect(() => {
		visible ? handleShow() : handleHide();
	}, [visible]);

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
	}, []);

	const handleBackdropClick = useCallback(function () {
		backdropClosable && handleHide();
	}, []);

	return createPortal(
		show && (
			<div
				className={classNames("i-backdrop", {
					"i-active": active,
				})}
				onClick={handleBackdropClick}
			>
				<div
					className={classNames("i-dialog", {
						bounced,
					})}
					style={{
						width,
						height,
					}}
					onClick={(e) => e.stopPropagation()}
					{...rest}
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
			</div>
		),
		document.body
	);
}

function DefaultContent(props: PropsContent) {
	const { title, hideCloseButton, children, onHide } = props;

	return (
		<>
			{
				<header className='i-dialog-header'>
					{title}

					<Helpericon
						active={!hideCloseButton}
						className='i-dialog-close'
						onClick={onHide}
					/>
				</header>
			}

			<div className='i-dialog-content'>{children}</div>

			{<footer className='i-dialog-footer'></footer>}
		</>
	);
}
