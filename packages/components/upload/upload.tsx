import { DriveFolderUploadTwotone } from "@ricons/material";
import { useReactive } from "ahooks";
import classNames from "classnames";
import { ChangeEvent, forwardRef, useEffect } from "react";
import Button from "../button";
import Icon from "../icon";
import InputContainer from "../input/container";
import File from "./file";
import "./index.scss";
import { IUpload } from "./type";

const Upload = forwardRef<HTMLInputElement, IUpload>(
	(props, ref): JSX.Element => {
		const {
			label,
			labelInline,
			name,
			value,
			placeholder,
			status,
			message,
			className,
			style,
			children,
			renderButton,
			renderItem,
			onChange,
			...restProps
		} = props;

		const state = useReactive({
			value,
			status,
			message,
		});

		const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(e.target.files || []);

			Object.assign(state, {
				status: "normal",
				message: "",
				value: files,
			});

			onChange?.(files, e);
		};

		useEffect(() => {
			Object.assign(state, {
				status,
				message,
			});
		}, [status, message]);

		useEffect(() => {
			state.value = value;
		}, [value]);

		const { status: sts, message: msg, value: files } = state;
		const inputProps = {
			ref,
			name,
			// value: files,
			onChange: handleChange,
			...restProps,
		};

		console.log(files);

		return (
			<InputContainer
				label={label}
				labelInline={labelInline}
				className={classNames("i-input-label-file", className)}
				style={style}
			>
				<input
					{...inputProps}
					type='file'
					className='i-input-file-hidden'
					onChange={handleChange}
				/>

				<div className='i-upload-inner'>
					<div
						className='i-upload-list'
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();
						}}
					>
						{files?.map((file: File, i: number) => (
							<File key={i} file={file} />
						))}
					</div>

					{children ?? (
						<Button className='i-upload-btn'>
							<Icon icon={<DriveFolderUploadTwotone />}></Icon>{" "}
							Upload
						</Button>
					)}

					{msg && <span className='i-input-message'>{msg}</span>}
				</div>
			</InputContainer>
		);
	}
);

export default Upload;
