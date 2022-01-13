import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRef, useState } from 'react';

import ChangeIcon from 'shared/ChangeIcon';
import { Flex, Input, Popover, Space } from 'atoms';
import { updatePage } from 'api/endpoints';
import useKeyPress from 'hooks/useKeyPress';
import { Page } from 'types/page';

const RenamePage = ({ trigger, name, id, icon }: Page) => {
	const [text, setText] = useState<string>(name);
	const enterPress = useKeyPress('Enter');
	const { mutateAsync } = useMutation(updatePage);

	const inputRef = useRef<HTMLInputElement>();
	const popoverRef = useRef(null);

	useEffect(() => {
		setText(name);
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		if(enterPress) {
			if(text !== name) {
				mutateAsync({
					id,
					name: text
				});
			}
			popoverRef.current?.close();
		}
	}, [enterPress]);

	return (
		<Popover
			trigger={trigger}
			placement='right-start'
			offset={[-15, 0]}
			ref={popoverRef}
		>
			<Flex p={2}>
				<Space>
					<ChangeIcon
						iconSize='medium'
						icon={icon}
						pageId={id}
					/>
					<Input
						placeholder={name}
						onChange={e => setText(e.target.value)}
						ref={inputRef}
					/>
				</Space>
			</Flex>
		</Popover>
	);
};

export default RenamePage;
