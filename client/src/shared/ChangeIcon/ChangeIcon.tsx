import React, { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { emojiIndex } from 'emoji-mart';
import { VscSmiley } from 'react-icons/vsc';
import _random from 'lodash/random';

import { Button, Flex, IconButton, Popover } from 'atoms';
import { EmojiPicker } from 'components';

const getRandomEmoji = () => {
	const emojis = Object.values(emojiIndex.emojis);
	return emojis[_random(0, emojis.length - 1)].native;
};

const ChangeIcon = ({
	icon
}) => {
	const [emoji, setEmoji] = useState(icon);

	const onRandomClick = async close => {
		try {
			setEmoji(getRandomEmoji());
			close();
		} catch (error) {
      
		}
	};

	const onRemoveClick = async close => {
		try {
			setEmoji(null);
			close();
		} catch (error) {
      
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
					onSelect={({ native }) => {
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
