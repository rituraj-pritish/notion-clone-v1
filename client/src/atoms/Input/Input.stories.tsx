import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '.';

export default {
	title: 'input',
	component: Input
} as ComponentMeta<typeof Input>;

export const input: ComponentStory<typeof Input> = () => {
	return (
		<Input/>
	);
};