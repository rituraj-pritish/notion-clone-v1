import { FiPlusSquare } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

import { IconButton } from 'atoms';
import api from 'api';
import { CREATE_PAGE } from 'graphql/pages';
import { Page } from 'types/page';
import { GET_PAGES } from 'graphql/pages/queries';

interface Props {
	id: string
	root?: string,
	nestedPages: string[]
}

const AddChildPage = ({ id, root, nestedPages }: Props) => {	
	const { mutateAsync } = useMutation(
		() => api<Page>(CREATE_PAGE, {
			createPageInput: {
				name: 'Untitled',
				hierarchy: {
					root: root ? root : id,
					parent: id
				}
			}
		})
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
