import moment from 'moment-timezone'
import { useState } from 'react'
import { BsPencilSquare, BsStar } from 'react-icons/bs'
import { IoTrashOutline } from 'react-icons/io5'
import { useMutation } from 'react-query'

import { deletePage as deletePageEndpoint, updatePage } from '@/api/endpoints'
import { Box, Modal, Text, Tooltip } from '@/atoms'
import { Menu } from '@/components'
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate'
import RenamePage from '@/shared/RenamePage'
import { Page } from '@/types/page'

interface Props extends Page {
	isInsideFavoritesGroup?: boolean
}

const SidebarPageMoreOptions = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const {
		id,
		hierarchy,
		favorite,
		isInsideFavoritesGroup,
		lastEdited,
		created
	} = props

	const { mutateAsync: deletePage } = useMutation(
		() => deletePageEndpoint(id),
		{
			onSuccess: ({ archived }) => onPageUpdate(id, hierarchy, { archived })
		}
	)

	const { mutateAsync: toggleFavorite } = useMutation(
		() =>
			updatePage({
				id,
				favorite: !favorite
			}),
		{
			onSuccess: () => onPageUpdate(id, hierarchy, { favorite: !favorite })
		}
	)

	const onDelete = async () => {
		await deletePage()
	}

	return (
		<>
			<Menu
				tooltip='Delete, duplicate and more...'
				placement='auto-end'
				offset={[8, -4]}
			>
				{!isInsideFavoritesGroup ? (
					<Menu.MenuItem icon={<IoTrashOutline size={20} />} onClick={onDelete}>
						Delete
					</Menu.MenuItem>
				) : (
					<></>
				)}
				<Menu.MenuItem
					onClick={() => {
						setIsModalVisible(true)
					}}
					icon={<BsPencilSquare />}
				>
					Rename
				</Menu.MenuItem>
				<Menu.MenuItem icon={<BsStar />} onClick={() => toggleFavorite()}>
					{favorite ? 'Remove from' : 'Add to'} Favorites
				</Menu.MenuItem>
				<Tooltip
					placement='right'
					overlay={
						<>
							<div>Last edited by {lastEdited.user.name}</div>
							<Tooltip.SubText>
								{moment(lastEdited.time).format('DD/MM/yyyy')}
							</Tooltip.SubText>
							<div>Created by {created.user.name}</div>
							<Tooltip.SubText>
								{moment(created.time).format('DD/MM/yyyy')}
							</Tooltip.SubText>
						</>
					}
				>
					<Box px={3} pt={1}>
						<Text size='small'>Last edited by {lastEdited.user.name}</Text>
						<Text size='small'>
							{moment(lastEdited.time).format('DD/MM/yyyy hh:mm A')}
						</Text>
					</Box>
				</Tooltip>
			</Menu>
			<Modal
				onRequestClose={() => setIsModalVisible(false)}
				visible={isModalVisible}
				styles={{
					overflow: 'visible'
				}}
			>
				<Modal.ModalPopover>
					<RenamePage onEnter={() => setIsModalVisible(false)} {...props} />
				</Modal.ModalPopover>
			</Modal>
		</>
	)
}

export default SidebarPageMoreOptions
