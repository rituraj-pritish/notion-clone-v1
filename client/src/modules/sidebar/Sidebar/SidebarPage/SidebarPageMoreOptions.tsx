import { useMutation, useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5';
import { BsPencilSquare } from 'react-icons/bs';

import api from 'api';
import { DELETE_PAGE } from 'graphql/pages';
import { Page } from 'types/page';
import { Menu, MenuItem } from 'components';
import RenamePage from 'shared/RenamePage';

const SidebarPageMoreOptions = ({
	id,
	hierarchy,
	name,
	icon
}: Page) => {
	const queryClient = useQueryClient();
	const queryKey = hierarchy.parent ? [hierarchy.parent, 'children'] : 'rootPages'; 

	const {
		mutateAsync: deletePage
	} = useMutation(
		() => api(DELETE_PAGE, { id }),
		{
			onSuccess: () => {
				queryClient.setQueryData<Page[]>(
					queryKey,
					(prevPages) => prevPages!.filter(({ id: pId }) => pId !== id)	 
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
		</Menu>
	);
};

export default SidebarPageMoreOptions;
