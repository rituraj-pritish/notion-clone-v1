import { ComponentMeta, ComponentStory } from '@storybook/react';
import Modal from './index';

export default {
	title: 'Atoms/modal',
	component: Modal
} as ComponentMeta<typeof Modal>;

export const modal: ComponentStory<typeof Modal> = () => {
	return (
		<Modal trigger={<div>Trigger</div>}>
      Content
		</Modal>
	);
};

