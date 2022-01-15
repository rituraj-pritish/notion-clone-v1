import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BsImageFill } from 'react-icons/bs';
import Button from './index';

export default {
	title: 'Atoms/button',
	component: Button
} as ComponentMeta<typeof Button>;

export const button: ComponentStory<typeof Button> = () => {
	return (
		<>
			<Button size='small' variant='primary'>Primary</Button>
			<Button size='small' variant='primary'>Secondary</Button>
			<Button
				size='small'
				variant='primary'
				ghost
			>Ghost
			</Button>
			<br/>
			<div style={{ display: 'flex' }}>
				<Button
					variant='secondary'
					rightIcon='😄'
					size='small'
				>Small Emoji
				</Button>
				<Button variant='secondary' size='small'>Small</Button>
				<Button
					variant='secondary'
					leftIcon='😄'
					size='small'
				>Small Emoji
				</Button>
			</div>
			<div style={{ display: 'flex' }}>
				<Button
					variant='secondary'
					rightIcon={BsImageFill}
					size='small'
				>Small Icon
				</Button>
				<Button variant='secondary' size='small'>Small</Button>
				<Button
					variant='secondary'
					leftIcon={BsImageFill}
					size='small'
				>Small Icon
				</Button>
			</div>
			<br/>
			<Button
				variant='secondary'
				leftIcon='😄'
				size='small'
			>Emoji
			</Button>
			<Button
				variant='secondary'
				size='small'
				tooltip='Tooltip'
			>With Tooltip
			</Button>
		</>
	);
};

