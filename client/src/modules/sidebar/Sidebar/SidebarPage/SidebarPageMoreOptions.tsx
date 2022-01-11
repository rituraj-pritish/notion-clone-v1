import { AiOutlineEllipsis } from 'react-icons/ai';

import { IconButton, Popover } from 'atoms';
import { useMutation, useQueryClient } from 'react-query';
import api from 'api';
import { DELETE_PAGE } from 'graphql/pages';
import { Page } from 'types/page';

interface Props {
	pageId: string,
	parent: string
}

const SidebarPageMoreOptions = ({
	pageId,
	parent
}: Props) => {
	const queryClient = useQueryClient();
	const queryKey = parent ? [parent, 'children'] : 'rootPages'; 

	const {
		mutateAsync: deletePage
	} = useMutation(
		() => api(DELETE_PAGE, { id: pageId }),
		{
			onSuccess: () => {
				queryClient.setQueryData<Page[]>(
					queryKey,
					(prevPages) => prevPages!.filter(({ id }) => id !== pageId)	 
				);
			}
		}
	);

	const onDelete = async () => {
		await deletePage();
	};

	return (
		<Popover
			trigger={(
				<IconButton size='small' tooltip='Delete, duplicate and more...'>
					<AiOutlineEllipsis/>
				</IconButton>
			)}
		>
			<div onClick={onDelete}>Delete</div>
		</Popover>
	);
};

export default SidebarPageMoreOptions;
