import React, { useEffect } from 'react';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { useRef, useState } from 'react';

import { Flex, Input, Space } from  '@/atoms';
import ChangeIcon from  '@/shared/ChangeIcon';
import { updatePage } from  '@/api/endpoints';
import useKeyPress from  '@/hooks/useKeyPress';
import { Page } from '@/types/page';
import queryKeys from '@/constants/queryKeys';
import { GetWorkspaceResult } from '@/api/endpoints/workspace';

interface Props extends Page {
	onEnter: VoidFunction
}

const updateQuery = (
	queryClient: QueryClient, 
	hierarchy: Page['hierarchy'], 
	text: string,
	id: string
) => {
	const updateRecord = (array: Page[] | undefined) => {
		if(!array || array.length === 0) return [];
		const idx = array.findIndex(({ id: pId }) => pId === id);

		if(!array[idx]) return array;

		array[idx] = {
			...array[idx],
			name: text
		};
		return array;
	};

	queryClient.setQueryData<GetWorkspaceResult>(
		queryKeys.ROOT_PAGES, 
		prevData => ({
			private: updateRecord(prevData?.private),
			favorites: updateRecord(prevData?.favorites),
			shared: updateRecord(prevData?.shared)
		})
	);
	queryClient.setQueryData<Page[] | undefined>(
		[hierarchy.parent, 'children'],
		prevData => {
			if(!prevData) return undefined;
			return updateRecord(prevData);
		}
	);
};

const RenamePage = ({ onEnter, ...props }: Props) => {
	const { name, id, hierarchy } = props;

	const queryClient = useQueryClient();
	const [text, setText] = useState<string>(name);

	const enterPress = useKeyPress('Enter');
	const { mutateAsync } = useMutation(updatePage, {
		onSuccess: () => updateQuery(queryClient, hierarchy, text, id)
	});
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
		<Flex p={1} >
			<Space size={4}>
				<ChangeIcon
					iconSize='medium'
					bordered
					{...props}
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
