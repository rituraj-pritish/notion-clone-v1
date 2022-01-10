import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'atoms';
import Modal from './index';

export default {
	title: 'Atoms/modal',
	component: Modal
} as ComponentMeta<typeof Modal>;

export const modal: ComponentStory<typeof Modal> = () => {
	return (
		<Modal trigger={<Button>Trigger</Button>}>
      Content
		</Modal>
	);
};

