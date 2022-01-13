import React, { Ref, useState } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { Content, RootWrapper, Title } from './Popover.styles';
import { useImperativeHandle } from 'react';

type Callback = () => void

type RenderComponent = React.ReactElement<any> |
// eslint-disable-next-line
	((cb: Callback) => React.ReactElement<any>)

interface Props extends Omit<TippyProps, 'trigger' | 'children'> {
  children: RenderComponent
  trigger: React.ReactElement<any>
  title?: RenderComponent
  action?: string
}

const Popover = React.forwardRef(({
	children,
	trigger,
	action = 'click',
	title,
	placement = 'auto',
	...props
}: Props, ref: Ref<any>) => {
	const [isVisible, setIsVisible] = useState(false);

	useImperativeHandle(ref, () => ({
		close: () => setIsVisible(false)
	}));

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
			placement={placement}
			interactive
			onClickOutside={() => setIsVisible(false)}
			// onUntrigger={() => setIsVisible(false)}
			{...props}
		>
			{React.cloneElement(
				trigger, 
				{ 
					onClick: (e: Event) => {
						if(typeof trigger.props.onClick === 'function') trigger.props.onClick(e);
						setIsVisible(state => !state); 
					} 
				})}
		</Tippy>
	);
});

export default Popover;
