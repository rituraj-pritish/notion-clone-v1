import { PickerProps, Picker } from 'emoji-mart';
import React from 'react';

import { PickerWrapper } from './EmojiPicker.styles';

const EmojiPicker = (props: PickerProps) => {
	return (
		<PickerWrapper>
			<Picker {...props} />
		</PickerWrapper>
	);
};

export default EmojiPicker;
