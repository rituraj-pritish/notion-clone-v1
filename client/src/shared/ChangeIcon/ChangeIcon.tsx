import React, { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { AiOutlineFile } from 'react-icons/ai';
import { BaseEmoji, emojiIndex } from 'emoji-mart';
import { VscSmiley } from 'react-icons/vsc';
import _random from 'lodash/random';

import { Button, Flex, IconButton, Popover } from  '@/atoms';
import { EmojiPicker } from  '@/components';
import { useMutation } from 'react-query';
import { updatePage } from  '@/api/endpoints';

const getRandomEmoji = () => {
	const emojis = Object.values(emojiIndex.emojis);
	//@ts-expect-error type mismatch
	return emojis[_random(0, emojis.length - 1)].native;
};

interface Props {
	icon?: string
	iconSize?: 'small' | 'medium'
	pageId: string
	haveChildren?: boolean
	bordered?: boolean
}

const ChangeIcon = ({
	icon,
	pageId,
	iconSize = 'small',
	haveChildren,
	bordered
}: Props) => {
	const {
		mutateAsync
	} = useMutation(
		(newIcon: string | undefined) => updatePage({
			id: pageId,
			icon: newIcon
		})
	);

	const [emoji, setEmoji] = useState(icon);

	const onRandomClick = async (close: VoidFunction) => {
		try {
			const randomEmoji = getRandomEmoji();
			await mutateAsync(randomEmoji);
			setEmoji(randomEmoji);
			close();
		} catch (error) {
			console.log('e', error);
		}
	};

	const onRemoveClick = async (close: VoidFunction) => {
		try {
			await mutateAsync(undefined);
			setEmoji('');
			close();
		} catch (error) {
			console.log('e', error);
		}
	};

	const title = React.useCallback((_, close: VoidFunction) => (
		<Flex justifyContent='flex-end' p={1}>
			<Button
				size='small'
				variant='tertiary'
				ghost
				leftIcon={VscSmiley}
				onClick={() => onRandomClick(close)}
			>
        Random
			</Button>
			<Button
				size='small'
				variant='tertiary'
				ghost
				onClick={() => onRemoveClick(close)}
			>
        Remove
			</Button>
		</Flex>
	), []);

	const renderIcon = () => {
		if(emoji) return emoji;
		return haveChildren ? <FiFileText/> : <AiOutlineFile/>;
	};

	return (
		<Popover
			title={title}
			trigger={(
				<IconButton
					size={iconSize}
					tooltip='Change icon'
					bordered={bordered}
				>
					{renderIcon()}
				</IconButton>
			)}
			placement='bottom'
		>
			{(_, close) => (
				<EmojiPicker
					emojiTooltip
					onSelect={async ({ native }: BaseEmoji) => {
						await mutateAsync(native);
						setEmoji(native);
						close();
					}}
					i18n={{
						search: 'Filter...'
					}}
					showPreview={false}
				/>
			)} 
		</Popover>
	);
};

export default ChangeIcon;
