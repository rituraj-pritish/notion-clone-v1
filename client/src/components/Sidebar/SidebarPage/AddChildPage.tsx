import { FiPlusSquare } from 'react-icons/fi';
import { useMutation } from 'react-query';

import { IconButton } from 'atoms';
import api from 'api';
import { CREATE_PAGE } from 'graphql/pages';

interface Props {
	id: string
	root?: string
}

const AddChildPage = ({ id, root }: Props) => {
	const { mutateAsync } = useMutation(
		() => api(CREATE_PAGE, {
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
