import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useRef, useState } from 'react';

import { Flex, Input, Popover, Space } from  '@/atoms';
import ChangeIcon from  '@/shared/ChangeIcon';
import { updatePage } from  '@/api/endpoints';
import useKeyPress from  '@/hooks/useKeyPress';
import { Page } from '@/types/page';

interface RenameFieldProps extends Partial<Page> {
	id: string,
	setText: (t: string) => void
}

const RenameField = ({ name, icon, id, setText }: RenameFieldProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	
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

interface RenamePageProps extends Partial<Page> {
	name: string
	id: string
	trigger: React.ReactElement
}

const RenamePage = ({ trigger, name, id, icon }: RenamePageProps) => {
	const [text, setText] = useState<string>(name);
	const enterPress = useKeyPress('Enter');
	const { mutateAsync } = useMutation(updatePage);

	const popoverRef = useRef<React.ElementRef<typeof Popover>>(null);

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
