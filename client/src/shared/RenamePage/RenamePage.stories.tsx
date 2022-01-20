import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from '@/atoms';
import RenamePage from './index';
import { PRIVATE_PAGES } from '@/tests/mocks/mockData/pages.mock';

export default {
	title: 'Page/Rename Page',
	component: RenamePage
} as ComponentMeta<typeof RenamePage>;

const PAGE = PRIVATE_PAGES[0];

export const renamePage: ComponentStory<typeof RenamePage> = () => {
	return (
		<div>
			<RenamePage {...PAGE} onEnter={() => null} />
			<Modal useAsPopover visible>
				<RenamePage {...PAGE} onEnter={() => null} />
			</Modal>
		</div>
	);
};
