import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { CgExpand } from 'react-icons/cg'
import { IoIosStarOutline } from 'react-icons/io'
import { VscSmiley } from 'react-icons/vsc'

import { Button, Flex, IconButton } from '@/atoms'
import ChangeIcon from '@/shared/ChangeIcon'
import { Page } from '@/types/page'

import { SubHeader } from './Page.styles'

const NewPageHeader = (props: Page) => {
	const router = useRouter()
	const { pageId } = router.query

	const isOnSameRoute = pageId === props.id
	const iconRef = useRef<React.ElementRef<typeof ChangeIcon>>(null)
	return (
		<>
			<Flex>
				{!isOnSameRoute && (
					<Button
						variant='secondary'
						size='small'
						ghost
						leftIcon={CgExpand}
						tooltip='Navigate to this page'
						onClick={() => router.push(`/${props.id}`)}
					>
						Open as Page
					</Button>
				)}
				<Flex flexGrow={1} />
				{/* <Button
					variant='secondary'
					size='small'
					ghost
					tooltip='Share or publish to the web'
				>
					Share
				</Button> */}
				<IconButton tooltip='Pin this page in your sidebar'>
					<IoIosStarOutline />
				</IconButton>
			</Flex>
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
				style={{ height: props.icon ? 'fit-content' : 0, padding: '0 140px' }}
			>
				<ChangeIcon {...props} iconSize='large' ref={iconRef} />
			</div>
		</>
	)
}

export default NewPageHeader
