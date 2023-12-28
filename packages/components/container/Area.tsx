import { PropsArea } from "./type";

export default function Area({ children, name }: PropsArea) {
	if (!children) return <></>;

	return name === "header" ? (
		<header className='i-header bg-blur'>{children}</header>
	) : (
		<footer className='i-footer bg-blur'>{children}</footer>
	);
}
