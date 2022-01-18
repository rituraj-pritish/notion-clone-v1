import { useMutation, useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5';
import { BsPencilSquare, BsStar } from 'react-icons/bs';

import { deletePage as deletePageEndpoint, updatePage } from  '@/api/endpoints';
import { Page } from 'types/page';
import { Menu, MenuItem } from  '@/components';
import { GetWorkspaceResult } from '@/api/endpoints/workspace';
import queryKeys from '@/constants/queryKeys';
import { Modal } from '@/atoms';
import { useState } from 'react';
import RenamePage from '@/shared/RenamePage';

interface Props extends Page {
	isInsideFavoritesGroup?: boolean
}

const SidebarPageMoreOptions = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	const {
		id,
		hierarchy,
		favorite,
		isInsideFavoritesGroup
	} = props;

	const queryClient = useQueryClient();
	const queryKey = hierarchy.parent ? [hierarchy.parent, 'children'] : 'rootPages'; 

	const {
		mutateAsync: deletePage
	} = useMutation(
		() => deletePageEndpoint(id),
		{
			onSuccess: () => {
				queryClient.setQueryData<Page[]>(
					queryKey,
					(prevPages) => prevPages!.filter(({ id: pId }) => pId !== id)	 
				);
			}
		}
	);

	const {
		mutateAsync: toggleFavorite
	} = useMutation(
		() => updatePage({
			id,
			favorite: !favorite
		}),
		{
			onSuccess: () => {
				queryClient.setQueryData<GetWorkspaceResult>(
					queryKeys.ROOT_PAGES, 
					(prevData) => {
						if(!prevData) return {
							private: []
						}; 
						// todo handle update
						return {
							...prevData!,
							favorites: favorite
								? prevData.favorites!.filter(({ id: fId }) => fId !== id)
								: [props, ...prevData.favorites!]
						};
					}
				);	
			}
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
							<MenuItem icon={<IoTrashOutline size={20}/>} onClick={onDelete}>
							Delete
							</MenuItem>
						)}
						<MenuItem
							onClick={() => {
								close();
								setIsModalVisible(true);
							}}
							icon={<BsPencilSquare/>}
						>Rename
						</MenuItem>
						<MenuItem icon={<BsStar/>} onClick={() => toggleFavorite()}>
							{favorite ? 'Remove from' : 'Add to'} Favorites
						</MenuItem>
					</>
				)}
			</Menu>
			<Modal
				onRequestClose={() => setIsModalVisible(false)}
				useAsPopover
				visible={isModalVisible}
			>
				<RenamePage onEnter={() => setIsModalVisible(false)} {...props}/>
			</Modal>
		</>
	);
};

export default SidebarPageMoreOptions;
