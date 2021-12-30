import { AiOutlineEllipsis } from 'react-icons/ai';

import { IconButton } from 'atoms';

const SidebarPageMoreOptions = () => {
	return (
		<IconButton size='small' tooltip='Delete, duplicate and more...'>
			<AiOutlineEllipsis/>
		</IconButton>
	);
};

export default SidebarPageMoreOptions;
