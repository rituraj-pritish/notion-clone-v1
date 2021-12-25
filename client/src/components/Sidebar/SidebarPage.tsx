import { useRouter } from 'next/router';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { BsTriangleFill } from 'react-icons/bs';
import { FiFileText, FiPlusSquare } from 'react-icons/fi';

import { Flex, IconButton, Space } from 'atoms';
import { PageOptions } from './SideBar.styles';
import SidebarItem from './SidebarItem';

interface Props {
	id: string
	name: string
	emoji?: string
}

const SidebarPage = ({
	id,
	emoji,
	name
}: Props) => {
	const router = useRouter();
	const { pageId } = router.query;

	const isActive = id === pageId;

	return (
		<SidebarItem 
			isActive={isActive} 
			onClick={() => router.push(`/${id}`)}
		>
			<Flex
				justifyContent='space-between'
				px={12}
				py={1}
			>
				<Flex alignItems='center'>
					<Space size={4}>
						<IconButton size='small'>
							<BsTriangleFill style={{ transform: 'rotate(90deg)' }} size={12}/>
						</IconButton>
						<IconButton size='small' tooltip='Change icon'>
							{emoji || <FiFileText/>}
						</IconButton>
						<div>{name}</div>
					</Space>
				</Flex>
				<PageOptions>
					<Space size={4}>
						<IconButton size='small' tooltip='Delete, duplicate and more...'>
							<AiOutlineEllipsis/>
						</IconButton>
						<IconButton size='small' tooltip='Quickly add a page inside'>
							<FiPlusSquare/>
						</IconButton>
					</Space>
				</PageOptions>
			</Flex>
		</SidebarItem>
	);
};

export default SidebarPage;
