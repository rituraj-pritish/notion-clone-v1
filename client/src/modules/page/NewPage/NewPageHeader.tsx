import React, { useRef } from 'react'
import { CgExpand } from 'react-icons/cg'
import { IoIosStarOutline } from 'react-icons/io'
import { VscSmiley } from 'react-icons/vsc'

import { Button, Flex, IconButton } from '@/atoms'
import ChangeIcon from '@/shared/ChangeIcon'
import { Page } from '@/types/page'

import { SubHeader } from './NewPage.styles'

const NewPageHeader = (props: Page) => {
	const iconRef = useRef<React.ElementRef<typeof ChangeIcon>>(null)
	return (
		<>
			<Flex>
				<Button
					variant='secondary'
					size='small'
					ghost
					leftIcon={CgExpand}
					tooltip='Navigate to this page'
				>
					Open as Page
				</Button>
				<Flex flexGrow={1} />
				<Button
					variant='secondary'
					size='small'
					ghost
					tooltip='Share or publish to the web'
				>
					Share
				</Button>
				<IconButton tooltip='Pin this page in your sidebar'>
					<IoIosStarOutline />
				</IconButton>
			</Flex>
			<SubHeader>
				<Button
					size='small'
					ghost
					variant='secondary'
					leftIcon={VscSmiley}
					onClick={iconRef.current?.setRandomEmoji}
				>
					Add icon
				</Button>
			</SubHeader>
			<ChangeIcon {...props} ref={iconRef} />
		</>
	)
}

export default NewPageHeader
