import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WiTime3 } from 'react-icons/wi';
import { BsThreeDots } from 'react-icons/bs';
import IconButton from './index';

export default {
	title: 'iconButton',
	component: IconButton
} as ComponentMeta<typeof IconButton>;

export const iconButton: ComponentStory<typeof IconButton> = () => {
	return (
		<>
			<IconButton>
				<WiTime3/>
			</IconButton>
			<IconButton size='small'>
				<WiTime3/>
			</IconButton>
			<IconButton size='small'>
				<BsThreeDots/>
			</IconButton>
			<IconButton size='small'>🤑</IconButton>
			<IconButton>
				<BsThreeDots/>
			</IconButton>
			<IconButton tooltip='Emoji'>🤑</IconButton>
		</>
	);
};

