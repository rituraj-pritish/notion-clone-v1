import ChangeIcon from 'shared/ChangeIcon';
import { Flex, Input, Popover, Space } from 'atoms';

const RenamePage = ({ trigger, name, id, icon }) => {
	return (
		<Popover trigger={trigger}>
			<Flex p={2}>
				<Space>
					<ChangeIcon
						iconSize='medium'
						icon={icon}
						pageId={id}
					/>
					<Input value={name} />
				</Space>
			</Flex>
		</Popover>
	);
};

export default RenamePage;
