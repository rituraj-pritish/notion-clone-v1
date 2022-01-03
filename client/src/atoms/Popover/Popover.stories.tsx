import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'atoms';
import Popover from './index';

export default {
	title: 'popover',
	component: Popover
} as ComponentMeta<typeof Popover>;

export const popover: ComponentStory<typeof Popover> = () => {
	return (
		<>
			<Popover trigger={<Button>Trigger</Button>}>
				{(close: () => void) => (
					<>
						<Button>1</Button>
						<Popover trigger={<Button onClick={close}>2</Button>}>
							<>content</>
						</Popover>
					</>
				)}
			</Popover>
		</>
	);
};

