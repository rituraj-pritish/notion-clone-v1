import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'atoms';
import Popover from './index';

export default {
	title: 'Atoms/popover',
	component: Popover
} as ComponentMeta<typeof Popover>;

export const popover: ComponentStory<typeof Popover> = () => {
	return (
		<>
			<Popover trigger={<Button>Trigger</Button>}  title={'abcd'}>
				{(close: () => void) => (
					<>
						<Button>1</Button>
					</>
				)}
			</Popover>
		</>
	);
};

