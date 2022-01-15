import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRef, useState } from 'react';

import { Flex, Input, Popover, Space } from  '@/atoms';
import ChangeIcon from  '@/shared/ChangeIcon';
import { updatePage } from  '@/api/endpoints';
import useKeyPress from  '@/hooks/useKeyPress';
import { Page } from '@/types/page';

interface Props extends Page {
	trigger: React.ReactElement
}

const RenameField = ({ name, icon, id, setText }: Page & { setText: (t: string) => void }) => {
	const inputRef = useRef<HTMLInputElement>();
	
	useEffect(() => {
		inputRef.current?.focus();
	}, []);
	
	return (
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
	);
};

const RenamePage = ({ trigger, name, id, icon }: Props) => {
	const [text, setText] = useState<string>(name);
	const enterPress = useKeyPress('Enter');
	const { mutateAsync } = useMutation(updatePage);

	const popoverRef = useRef(null);

	useEffect(() => {
		if(enterPress && text !== name) {
			mutateAsync({
				id,
				name: text
			});
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
			{(isVisible) => isVisible && (
				<RenameField
					name={name}
					icon={icon}
					id={id}
					setText={setText}
				/>
			)}
		</Popover>
	);
};

export default RenamePage;
