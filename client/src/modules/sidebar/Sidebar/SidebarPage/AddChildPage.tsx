import { FiPlusSquare } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

import { IconButton } from 'atoms';
import api from 'api';
import { CREATE_PAGE } from 'graphql/pages';
import { Page } from 'types/page';

interface Props {
	id: string
	root?: string
}

const AddChildPage = ({ id, root }: Props) => {
	const queryClient = useQueryClient();
	
	const { mutateAsync } = useMutation(
		() => api<Page>(CREATE_PAGE, {
			createPageInput: {
				name: 'Untitled',
				hierarchy: {
					root: root ? root : id,
					parent: id
				}
			}
		}),
		{
			onSuccess: (newPage) => {
				queryClient.setQueryData<Page[] | undefined>(
					[id, 'children'],
					prevPages => {
						if(!prevPages) return; 
						return prevPages.concat(newPage);
					}
				);
			}
		}
	);

	return (
		<IconButton
			size='small'
			tooltip='Quickly add a page inside'
			onClick={mutateAsync}
		>
			<FiPlusSquare/>
		</IconButton>
	);
};

export default AddChildPage;
