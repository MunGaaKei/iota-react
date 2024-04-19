import { Flex } from "@p";
import classNames from "classnames";
import { Fragment, ReactNode } from "react";

export default function Api(props) {
	const { apis = [], className } = props;

	return (
		<div className={classNames("apis", className)}>
			{apis.map((o) => {
				const { name, type, def, desc, required, event } = o;

				return (
					<div key={name}>
						<Flex align='baseline' gap={20}>
							<h5
								className={classNames({
									blue: event,
								})}
							>
								{name}
							</h5>

							{required && <span className='red'>⁕</span>}

							{def && <code className='bg-pink-0'>{def}</code>}

							<Flex gap={4}>
								{type.map((t: ReactNode, i: number) => {
									return (
										<Fragment key={i}>
											{i === 0 ? null : (
												<span className='color-8'>
													|
												</span>
											)}
											<span className='px-4 round-slight color-6'>
												{t}
											</span>
										</Fragment>
									);
								})}
							</Flex>
						</Flex>
						<p className='mt-8 color-5'>{desc}</p>
					</div>
				);
			})}
		</div>
	);
}
