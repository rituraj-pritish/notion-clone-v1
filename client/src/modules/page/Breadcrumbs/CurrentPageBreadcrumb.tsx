import React from 'react'

import { Button, Popover } from '@/atoms'
import RenamePage from '@/shared/RenamePage'
import { Ancestry } from '@/types/page'

const CurrentPageBreadcrumb = (props: Ancestry) => {
	const { title, icon, id } = props

	const renamePageProps = {
		id,
		icon,
		properties: {
			title
		}
	}

	return (
		<Popover>
			<Popover.Trigger>
				<Button
					variant='secondary'
					size='small'
					ghost
					leftIcon={icon && 'emoji' in icon ? icon.emoji : undefined}
				>
					{title}
				</Button>
			</Popover.Trigger>
			<Popover.Content>
				<RenamePage {...renamePageProps} />
			</Popover.Content>
		</Popover>
	)
}

export default CurrentPageBreadcrumb
