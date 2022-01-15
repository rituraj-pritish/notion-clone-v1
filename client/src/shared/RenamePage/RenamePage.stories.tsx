import { ComponentMeta, ComponentStory } from '@storybook/react';
import RenamePage from './index';

export default {
	title: 'Page/Rename Page',
	component: RenamePage
} as ComponentMeta<typeof RenamePage>;

export const renamePage: ComponentStory<typeof RenamePage> = () => {
	return (
		<RenamePage
			name='Name'
			id='1'
			trigger={(
				<div>Name</div>
			)}
		/>
	);
};

