import styled, { css } from 'styled-components'

import { Props } from './Space'

export const RootWrapper = styled.div<Props>`
	display: flex;
	flex-direction: ${({ direction }) => direction === 'vertical' && 'column'};
	align-items: ${({ align }) => {
		switch (align) {
			case 'center':
				return 'center'
			case 'start':
				return 'flex-start'
			case 'end':
				return 'flex-end'
			default:
				return 'center'
		}
	}};

	& > * {
		${({ size, direction }) => {
			const gap = typeof size === 'string' ? size : `${size}px`

			if (direction === 'horizontal')
				return css`
					margin: 0 calc(${gap} / 2);
					&:last-child {
						margin-right: 0;
					}

					&:first-child {
						margin-left: 0;
					}
				`

			return css`
				margin: calc(${gap} / 2) 0;
				&:last-child {
					margin-bottom: 0;
				}

				&:first-child {
					margin-top: 0;
				}
			`
		}};
	}
`
