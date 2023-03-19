import { ReactNode, HTMLAttributes } from 'react';
import './button.scss';

export type TypeButton = {
	tag?: 'button' | 'a';
	to?: string;
	href?: string;
	outline?: boolean;
	flat?: boolean;
	loading?: boolean;
	type?: 'submit' | 'reset' | 'button';
	ripple?: boolean;
	disabled?: boolean;
	size?: 'small' | 'large' | 'normal' | 'thin';
	block?: boolean;
	round?: boolean;
	children: ReactNode;
} & HTMLAttributes<HTMLElement>;

const classNames = ({
	outline,
	flat,
	loading,
	disabled,
	size = 'normal',
	block,
	round
}: TypeButton): string => {
	const names = ['r-btn'];
	outline && names.push('r-btn-outline');
	flat && names.push('r-btn-flat');
	disabled && names.push('disabled');
	block && names.push('r-btn-block');
	loading && names.push('r-btn-loading');
	round && names.push('round');
	size !== 'normal' && names.push(`r-btn-${size}`);
	return names.join(' ');
};

const Button = (props: TypeButton): JSX.Element => {
	const { tag = 'a', children, loading, flat, size, href, ...rest } = props;
	const Component = href ? 'a' : tag;

	console.log(loading);

	return (
		<Component
			className={classNames(props)}
			{...rest}
		>
			{loading && <span className="r-loading-icon"></span>}

			<span className="r-btn-content">{children}</span>
		</Component>
	);
};

export default Button;
