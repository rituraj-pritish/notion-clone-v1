import { RawDraftContentBlock, RawDraftContentState } from 'draft-js'
import _isEqual from 'lodash/isEqual'

import { Block } from '@/types/block'

export const getRawData = (obj?: Block['object']): RawDraftContentState => ({
	blocks: [
		{
			text: obj?.text || '',
			key: 'foo',
			type: 'unstyled',
			entityRanges: [],
			//@ts-expect-error abc
			inlineStyleRanges: obj?.styles || []
		}
	],
	entityMap: {}
})

export const isContentSame = (
	oldContent: Block['object'],
	newContent: RawDraftContentBlock
) => {
	return (
		_isEqual(oldContent.text, newContent.text) &&
		_isEqual(oldContent.styles, newContent.inlineStyleRanges)
	)
}
