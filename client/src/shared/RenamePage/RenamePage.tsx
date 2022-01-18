import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRef, useState } from 'react';

import { Flex, Input, Space } from  '@/atoms';
import ChangeIcon from  '@/shared/ChangeIcon';
import { updatePage } from  '@/api/endpoints';
import useKeyPress from  '@/hooks/useKeyPress';
import { Page } from '@/types/page';

interface Props extends Page {
	onEnter: VoidFunction
}

const RenamePage = ({ name, id, icon, onEnter }: Props) => {
	const [text, setText] = useState<string>(name);
	const enterPress = useKeyPress('Enter');
	const { mutateAsync } = useMutation(updatePage);
	const inputRef = useRef<HTMLInputElement>(null);
	
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	useEffect(() => {
		if(enterPress) {
			onEnter();
			if(text !== name) {
				mutateAsync({
					id,
					name: text
				});
			}
		}
	}, [enterPress]);

	return (
		<Flex p={1}>
			<Space size={4}>
				<ChangeIcon
					iconSize='medium'
					icon={icon}
					pageId={id}
					bordered
				/>
				<Flex width={300}>
					<Input
						fullWidth
						size='small'
						type='secondary'
						placeholder={name}
						onChange={e => setText(e.target.value)}
						ref={inputRef}
					/>
				</Flex>
			</Space>
		</Flex>
	);
};

export default RenamePage;
