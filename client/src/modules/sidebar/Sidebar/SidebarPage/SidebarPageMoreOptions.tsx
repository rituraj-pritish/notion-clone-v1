import { useMutation, useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5';
import { BsPencilSquare, BsStar } from 'react-icons/bs';

import { deletePage as deletePageEndpoint, updatePage } from  '@/api/endpoints';
import { Page } from 'types/page';
import { Menu, MenuItem } from  '@/components';
import RenamePage from  '@/shared/RenamePage';
import { GetWorkspaceResult } from '@/api/endpoints/workspace';

const SidebarPageMoreOptions = (props: Page) => {
	const {
		id,
		hierarchy,
		name,
		icon,
		favorite
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
						if(!prevData) return;
						return {
							...prevData!,
							favorites: favorite
								? prevData.favorites.filter(({ id: fId }) => fId !== id)
								: [props, ...prevData.favorites]
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
		<Menu tooltip='Delete, duplicate and more...'>
			<RenamePage
				trigger={(
					<MenuItem icon={<BsPencilSquare/>}>Rename</MenuItem>
				)}
				id={id}
				name={name}
				icon={icon}
			/>
			<MenuItem icon={<IoTrashOutline size={20}/>} onClick={onDelete}>Delete</MenuItem>
			<MenuItem icon={<BsStar/>} onClick={() => toggleFavorite()}>
				{favorite ? 'Remove from' : 'Add to'} Favorites
			</MenuItem>
		</Menu>
	);
};

export default SidebarPageMoreOptions;
