import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import theme from '@/theme';

export const PickerWrapper = styled.div`
	.emoji-mart-preview {
		display: none;
	}

	section {
		border: none;
	}

	.emoji-mart-anchor-selected {
		color: ${theme.colors.text} !important;
	}
	.emoji-mart-anchor-bar {
		background-color: ${theme.colors.text} !important;
	}
	.emoji-mart-bar {
		display: none;
	}
	.emoji-mart-category-label {
		font-size: 12px;
		text-transform: uppercase;
		font-weight: 300;
		color: gray;
	}

	.emoji-mart-search {
		margin-bottom: 8px;

		input {
			padding-top: 8px;
		}
	}

	.emoji-mart-emoji {
		cursor: pointer;

		span {
			cursor: pointer !important;
		}

		&::before {
			border-radius: 4px !important;
		}
	}
`;
