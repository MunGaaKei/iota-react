import { Button, Flex } from "@p";

export const DBasic = {
	demo: (
		<Flex gap={12}>
			<Button>Button</Button>
			<Button secondary>Secondary</Button>
			<Button outline>Outline</Button>
			<Button flat>Flat</Button>
			<Button loading>Loading</Button>
			<Button disabled>Disabled</Button>
		</Flex>
	),
	code: `<Flex gap={12}>
    <Button>Button</Button>
    <Button secondary>Secondary</Button>
    <Button outline>Outline</Button>
    <Button flat>Flat</Button>
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
</Flex>`,
	lang: "htmlbars",
};

export const DColor = {
	demo: (
		<Flex gap={12}>
			<Button className='bg-blue'>Blue</Button>
			<Button className='pink' outline>
				Outline Pink
			</Button>
			<Button className='brown' flat>
				Flat Brown
			</Button>
			<Button className='red bg-yellow'>Mixed Red Yellow</Button>
		</Flex>
	),
	code: `<Button className='bg-blue'>Blue</Button>
<Button className='pink' outline>
    Outline Pink
</Button>
<Button className='brown' flat>
    Flat Brown
</Button>
<Button className='red bg-yellow'>Mixed Red Yellow</Button>`,
	lang: "htmlbars",
};

export const DToggle = {
	demo: (
		<Flex gap={12}>
			<Button.Toggle className='bg-blue' after='Red'>
				Blue
			</Button.Toggle>
		</Flex>
	),
	code: ``,
	lang: "xml",
};
