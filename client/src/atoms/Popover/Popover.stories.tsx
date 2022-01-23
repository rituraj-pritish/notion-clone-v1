import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from '@/atoms'

import Popover from './index'

export default {
	title: 'Atoms/popover',
	component: Popover
} as ComponentMeta<typeof Popover>

export const popover: ComponentStory<typeof Popover> = () => {
	return (
		<>
			<Popover
				trigger={
					<Button variant='secondary' size='small'>
						Trigger
					</Button>
				}
				title={<div>abcd</div>}
			>
				<>
					<div>1</div>
				</>
			</Popover>
		</>
	)
}
