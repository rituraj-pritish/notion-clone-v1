import { ComponentMeta, ComponentStory } from '@storybook/react';
import ChangeIcon from './index';

export default {
	title: 'Page/Change Icon',
	component: ChangeIcon
} as ComponentMeta<typeof ChangeIcon>;

export const changeIcon: ComponentStory<typeof ChangeIcon> = () => {
	return (
		<ChangeIcon pageId=''/>
	);
};

