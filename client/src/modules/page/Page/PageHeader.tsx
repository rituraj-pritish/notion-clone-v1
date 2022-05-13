import React, { useRef } from 'react'
import { VscSmiley } from 'react-icons/vsc'

import { Button } from '@/atoms'
import ChangeIcon from '@/shared/ChangeIcon'
import { Page } from '@/types/page'

import { SubHeader } from './Page.styles'

const NewPageHeader = (props: Page) => {
	const iconRef = useRef<React.ElementRef<typeof ChangeIcon>>(null)
	return (
		<>
			<SubHeader>
				{!props.icon && (
					<Button
						size='small'
						ghost
						variant='secondary'
						leftIcon={VscSmiley}
						onClick={iconRef.current?.setRandomEmoji}
					>
						Add icon
					</Button>
				)}
			</SubHeader>
			<div
				style={{ 
					height: props.icon ? 'fit-content' : 0, 
					padding: '0 140px', 
					paddingLeft: '164px' 
				}}
			>
				<ChangeIcon {...props} iconSize='large' ref={iconRef} />
			</div>
		</>
	)
}

export default NewPageHeader
