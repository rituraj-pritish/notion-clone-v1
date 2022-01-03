import React, { useState } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { RootWrapper } from './Popover.styles';

interface Props extends Omit<TippyProps, 'trigger' | 'children'> {
  children: React.ReactElement<any> | Function
  trigger: React.ReactElement<any>,
  action?: string
}

const Popover = ({
	children,
	trigger,
	action = 'click',
	...props
}: Props) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<Tippy
			render={attrs => (
				<RootWrapper {...attrs}>
					<>
            
						{typeof children === 'function' 
							? children(() => setIsVisible(false)) 
							: children}
					</>
				</RootWrapper>
			)}
			trigger={action}
			visible={isVisible}
			interactive
			onClickOutside={() => setIsVisible(false)}
			onUntrigger={() => setIsVisible(false)}
			{...props}
		>
			{React.cloneElement(
				trigger, 
				{ 
					onClick: e => {
						if(typeof trigger.props.onClick === 'function') trigger.props.onClick(e);
						setIsVisible(true); 
					} 
				})}
		</Tippy>
	);
};

export default Popover;
