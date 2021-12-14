import { ComponentMeta, ComponentStory } from '@storybook/react';

import ButtonComponent from './index';

export default {
	title: 'Button',
	component: ButtonComponent
} as ComponentMeta<typeof ButtonComponent>;

export const Button: ComponentStory<typeof ButtonComponent> = () => {
	return (
		<>
			<ButtonComponent variant='primary'>Primary</ButtonComponent>
			<ButtonComponent>Secondary</ButtonComponent>
			<br/>
			<ButtonComponent size='small'>Small</ButtonComponent>
		</>
	);
};

