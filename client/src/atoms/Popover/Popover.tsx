import React, { useState } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { Content, RootWrapper, Title } from './Popover.styles';

interface Props extends Omit<TippyProps, 'trigger' | 'children'> {
  children: React.ReactElement<any> | ((fn: () => void) => void)
  trigger: React.ReactElement<any>
  title?: React.ReactElement<any> | ((fn: () => void) => void)
  action?: string
}

const Popover = ({
	children,
	trigger,
	action = 'click',
	title,
	...props
}: Props) => {
	const [isVisible, setIsVisible] = useState(false);

	const render = (component: typeof children) => {
		if(typeof component === 'function') {
			return component(() => setIsVisible(false));
		}
		return component;
	};

	return (
		<Tippy
			render={attrs => (
				<RootWrapper {...attrs}>
					<>
						{title && <Title>{render(title)}</Title>}
						<Content>
							{render(children)}
						</Content>
					</>
				</RootWrapper>
			)}
			trigger={action}
			visible={isVisible}
			placement='auto'
			interactive
			onClickOutside={() => setIsVisible(false)}
			// onUntrigger={() => setIsVisible(false)}
			{...props}
		>
			{React.cloneElement(
				trigger, 
				{ 
					onClick: e => {
						if(typeof trigger.props.onClick === 'function') trigger.props.onClick(e);
						setIsVisible(state => !state); 
					} 
				})}
		</Tippy>
	);
};

export default Popover;
