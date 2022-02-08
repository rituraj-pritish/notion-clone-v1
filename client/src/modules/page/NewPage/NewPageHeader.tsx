import { CgExpand } from 'react-icons/cg'
import { IoIosStarOutline } from 'react-icons/io'
import { VscSmiley } from 'react-icons/vsc'
import { Button, Flex, IconButton } from '@/atoms'
import { SubHeader } from './NewPage.styles'

const NewPageHeader = () => {
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
				<Button size='small' ghost variant='secondary' leftIcon={VscSmiley}>
					Add icon
				</Button>
			</SubHeader>
		</>
	)
}

export default NewPageHeader
