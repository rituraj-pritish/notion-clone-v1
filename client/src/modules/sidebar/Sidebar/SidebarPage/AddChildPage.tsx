import { AiOutlinePlus } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';

import { IconButton } from  '@/atoms';
import { Page } from 'types/page';
import { GET_PAGES } from  '@/graphql/pages/queries';
import { createPage } from  '@/api/endpoints';

interface Props {
	id: string
	root?: string,
	nestedPages: string[]
}

const AddChildPage = ({ id, root, nestedPages }: Props) => {	
	const { mutateAsync } = useMutation(
		() => createPage({
			name: 'Untitled',
			hierarchy: {
				root: root ? root : id,
				parent: id,
				children: []
			}
		})
	);

	return (
		<IconButton
			size='small'
			tooltip='Quickly add a page inside'
			onClick={() => mutateAsync()}
			bordered
		>
			<AiOutlinePlus/>
		</IconButton>
	);
};

export default AddChildPage;
