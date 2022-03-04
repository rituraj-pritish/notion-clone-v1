import styled from 'styled-components'

import theme from '@/theme'

export const RootWrapper = styled.div`
	box-shadow: ${theme.boxShadow};
	padding: 6px 4px;
	width: 265px;
`

export const Heading = styled.div`
	font-size: 11px;
	color: rgba(55, 53, 47, 0.65);
	padding-left: 12px;
	font-weight: 500;
`

export const PickerOption = styled.div`
	display: flex;
	align-items: center;
	margin: 2px 0;
	padding: 4px 12px;
	cursor: pointer;

	&:hover {
		background: #ededed;
	}
`

interface OptionIconProps {
	color?: string
	background?: string
	showBorder?: boolean
}

export const OptionIcon = styled.div<OptionIconProps>`
	border: ${({ showBorder }) => showBorder && '1px solid #c7c7c7'};
	border-radius: 2px;
	font-weight: 600;
	font-size: 16px;
	width: 22px;
	height: 22px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: ${({ showBorder }) => showBorder && '12px'};
	color: ${({ color }) => color};
	background: ${({ background }) => background};
`

OptionIcon.defaultProps = {
	showBorder: true
}
