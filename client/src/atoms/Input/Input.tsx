import React, { InputHTMLAttributes } from 'react';

import { StyledInput } from './Input.styles';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const Input = React.forwardRef(({
	...props
}: Props, ref: React.Ref<HTMLInputElement>) => {
	return (
		<StyledInput ref={ref} {...props}/>  
	);
});

export default Input;
