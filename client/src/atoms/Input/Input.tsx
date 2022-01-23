import React, { InputHTMLAttributes } from 'react'

import { StyledInput } from './Input.styles'

type InputType = InputHTMLAttributes<HTMLInputElement>

export interface Props extends Omit<InputType, 'type' | 'size'> {
	type: 'primary' | 'secondary'
	inputType?: InputType['type']
	size: 'small' | 'medium'
	fullWidth?: boolean
}

const Input = React.forwardRef(
	({ ...props }: Props, ref: React.Ref<HTMLInputElement>) => {
		return (
			// @ts-expect-error styled-component ref issue
			<StyledInput ref={ref} {...props} />
		)
	}
)

export default Input
