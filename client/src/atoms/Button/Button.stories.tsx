import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BsImageFill } from 'react-icons/bs';
import Button from './index';

export default {
	title: 'button',
	component: Button
} as ComponentMeta<typeof Button>;

export const button: ComponentStory<typeof Button> = () => {
	return (
		<>
			<Button variant='primary'>Primary</Button>
			<Button>Secondary</Button>
			<Button ghost>Ghost</Button>
			<br/>
			<div style={{ display: 'flex' }}>
				<Button rightIcon='😄' size='small'>Small Emoji</Button>
				<Button size='small'>Small</Button>
				<Button leftIcon='😄' size='small'>Small Emoji</Button>
			</div>
			<div style={{ display: 'flex' }}>
				<Button rightIcon={BsImageFill} size='small'>Small Icon</Button>
				<Button size='small'>Small</Button>
				<Button leftIcon={BsImageFill} size='small'>Small Icon</Button>
			</div>
			<br/>
			<Button leftIcon='😄' size='small'>Emoji</Button>
			<Button size='small' tooltip='Tooltip'>With Tooltip</Button>
		</>
	);
};

