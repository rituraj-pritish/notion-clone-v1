import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from '@/atoms'

import Popover from './index'

export default {
	title: 'Atoms/popover',
	component: Popover
} as ComponentMeta<typeof Popover>

const { Content, Trigger } = Popover

export const popover: ComponentStory<typeof Popover> = () => {
	return (
		<>
			<Popover>
				<Trigger>
					<Button
						variant='secondary'
						size='small'
						onClick={() => console.log('call')}
					>
						Trigger
					</Button>
				</Trigger>
				<Content>
					<div>1</div>
				</Content>
			</Popover>
		</>
	)
}
