import React, { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { emojiIndex } from 'emoji-mart';
import { VscSmiley } from 'react-icons/vsc';
import _random from 'lodash/random';

import { Button, Flex, IconButton, Popover } from 'atoms';
import { EmojiPicker } from 'components';
import { useMutation } from 'react-query';
import api from 'api';
import { UPDATE_PAGE } from 'graphql/pages';

const getRandomEmoji = () => {
	const emojis = Object.values(emojiIndex.emojis);
	return emojis[_random(0, emojis.length - 1)].native;
};

interface Props {
	icon?: string,
	pageId: string
}

const ChangeIcon = ({
	icon,
	pageId
}: Props) => {
	const {
		mutateAsync
	} = useMutation(
		(newIcon) => api(UPDATE_PAGE, {
			updatePageInput: {
				id: pageId,
				icon: newIcon
			}
		})
	);

	const [emoji, setEmoji] = useState(icon);

	const onRandomClick = async close => {
		try {
			const randomEmoji = getRandomEmoji();
			await mutateAsync(randomEmoji);
			setEmoji(randomEmoji);
			close();
		} catch (error) {
			console.log('e', error);
		}
	};

	const onRemoveClick = async close => {
		try {
			await mutateAsync(null);
			setEmoji(null);
			close();
		} catch (error) {
			console.log('e', error);
		}
	};

	const title = React.useCallback((close: () => void) => (
		<Flex justifyContent='flex-end'>
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

	return (
		<Popover
			title={title}
			trigger={(
				<IconButton size='small' tooltip='Change icon'>
					{emoji || <FiFileText/>}
				</IconButton>
			)}
			placement='bottom'
		>
			{(close) => (
				<EmojiPicker
					emojiTooltip
					onSelect={async ({ native }) => {
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
