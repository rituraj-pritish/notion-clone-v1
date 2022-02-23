import React from 'react'

import { Box, Flex, Modal, Spinner } from '@/atoms'
import Page from '@/modules/page/Page'
import PageOptions from '@/modules/page/Page/PageOptions'
import { Page as PageType } from '@/types/page'

import OpenAsPageButton from '../Page/OpenAsPageButton'

interface Props {
	page?: PageType
	isVisible: boolean
}

const PageModal = ({ page, isVisible }: Props) => {
	return (
		<Modal
			visible={isVisible}
			styles={{ width: '970px', left: '50%', transform: 'translateX(-50%)' }}
		>
			<Modal.ModalContent>
				<Box p={2}>
					{!page ? (
						<Spinner />
					) : (
						<>
							<Flex>
								<OpenAsPageButton {...page} />
								<Flex flexGrow={1} />
								<PageOptions />
							</Flex>
							<Page {...page} />
						</>
					)}
				</Box>
			</Modal.ModalContent>
		</Modal>
	)
}

export default PageModal
