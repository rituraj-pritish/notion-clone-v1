import { AiOutlinePlus } from 'react-icons/ai';
import { useMutation } from 'react-query';

import { IconButton } from  '@/atoms';
import { Page } from 'types/page';
import { createPage } from  '@/api/endpoints';

interface Props {
	id: string
	root?: Page['hierarchy']['root'],
	nestedPages: string[]
}

const AddChildPage = ({ id, root }: Props) => {	
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
