import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from '..';
import Modal from './index';

export default {
	title: 'Atoms/modal',
	component: Modal
} as ComponentMeta<typeof Modal>;

export const modal: ComponentStory<typeof Modal> = () => {
	return (
		<>
			<Modal trigger={<div>Normal</div>}>
      Content
			</Modal>
			<Flex mt={6}>
				<Modal
					trigger={<div>Popover like</div>}
					showOverlay={false}
					useAsPopover
				>
				Content
				</Modal>
			</Flex>
		</>
	);
};

