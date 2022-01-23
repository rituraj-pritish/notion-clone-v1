import styled, { css } from 'styled-components'

interface SpinnerProps {
	size: 'small' | 'medium' | 'large'
}

const getSize = (size: 'small' | 'medium' | 'large') => {
	let dimension = 12

	if (size === 'medium') dimension = 20
	if (size === 'large') dimension = 30

	return css`
		width: ${dimension + 'px'};
		height: ${dimension + 'px'};
	`
}

export const StyledSpinner = styled.div<SpinnerProps>`
	${({ size }) => getSize(size)};
	color: #b1b1b1;
	position: relative;
	display: inline-block;
	border: 3px solid;
	border-radius: 50%;
	border-top-color: transparent;
	animation: rotate 1s linear infinite;

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
