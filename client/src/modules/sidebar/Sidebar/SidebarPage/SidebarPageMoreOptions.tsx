import { useState } from 'react';
import { useMutation } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5';
import { BsPencilSquare, BsStar } from 'react-icons/bs';

import { deletePage as deletePageEndpoint, updatePage } from '@/api/endpoints';
import { Page } from 'types/page';
import { Menu, MenuItem } from '@/components';
import { Modal } from '@/atoms';
import RenamePage from '@/shared/RenamePage';
import onPageUpdate from '@/helpers/queryUpdaters/onPageUpdate';

interface Props extends Page {
	isInsideFavoritesGroup?: boolean;
}

const SidebarPageMoreOptions = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const { id, hierarchy, favorite, isInsideFavoritesGroup } = props;

	const { mutateAsync: deletePage } = useMutation(
		() => deletePageEndpoint(id),
		{
			onSuccess: ({ deletedAt }) =>
				onPageUpdate(id, hierarchy, { deletedAt: deletedAt })
		}
	);

	const { mutateAsync: toggleFavorite } = useMutation(
		() =>
			updatePage({
				id,
				favorite: !favorite
			}),
		{
			onSuccess: () => onPageUpdate(id, hierarchy, { favorite: !favorite })
		}
	);

	const onDelete = async () => {
		await deletePage();
	};

	return (
		<>
			<Menu
				tooltip='Delete, duplicate and more...'
				placement='auto-end'
				offset={[8, -4]}
			>
				{(_, close) => (
					<>
						{!isInsideFavoritesGroup && (
							<MenuItem icon={<IoTrashOutline size={20} />} onClick={onDelete}>
								Delete
							</MenuItem>
						)}
						<MenuItem
							onClick={() => {
								close();
								setIsModalVisible(true);
							}}
							icon={<BsPencilSquare />}
						>
							Rename
						</MenuItem>
						<MenuItem icon={<BsStar />} onClick={() => toggleFavorite()}>
							{favorite ? 'Remove from' : 'Add to'} Favorites
						</MenuItem>
					</>
				)}
			</Menu>
			<Modal
				onRequestClose={() => setIsModalVisible(false)}
				useAsPopover
				visible={isModalVisible}
				style={{
					overflow: 'visible'
				}}
			>
				<RenamePage onEnter={() => setIsModalVisible(false)} {...props} />
			</Modal>
		</>
	);
};

export default SidebarPageMoreOptions;
