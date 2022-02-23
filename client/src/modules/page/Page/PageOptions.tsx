import React from 'react'
import { IoIosStarOutline } from 'react-icons/io'

import { IconButton } from '@/atoms'

const PageOptions = () => {
	return (
		<>
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
		</>
	)
}

export default PageOptions
