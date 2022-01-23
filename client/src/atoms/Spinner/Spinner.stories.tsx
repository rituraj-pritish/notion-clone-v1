import { ComponentMeta, ComponentStory } from '@storybook/react';

import Spinner from './index';

export default {
	title: 'Atoms/spinner',
	component: Spinner
} as ComponentMeta<typeof Spinner>;

export const spinner: ComponentStory<typeof Spinner> = () => {
	return (
		<>
			<Spinner size='small' />
		</>
	);
};
