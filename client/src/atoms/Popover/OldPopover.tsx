import Tippy, { TippyProps } from '@tippyjs/react/headless'
import React, { useState, useImperativeHandle } from 'react'

import { Content, RootWrapper, Title } from './Popover.styles'

type Callback = () => void

export type PopoverRenderComponent =
	| React.ReactElement<any>
	// eslint-disable-next-line
	| ((visible: boolean, cb: Callback) => React.ReactElement<any> | false)

export interface PopoverProps extends Omit<TippyProps, 'trigger' | 'children'> {
	children: PopoverRenderComponent
	trigger: React.ReactElement<any>
	title?: PopoverRenderComponent
	action?: string
}

interface Handle {
	close: VoidFunction
}

const Popover = React.forwardRef(
	(
		{
			children,
			trigger,
			title,
			placement = 'auto',
			className,
			...props
		}: PopoverProps,
		ref?: React.Ref<Handle>
	) => {
		const [isVisible, setIsVisible] = useState(false)

		useImperativeHandle(ref, () => ({
			close: () => setIsVisible(false)
		}))

		const render = (component: typeof children) => {
			if (!component) return null

			if (typeof component === 'function') {
				return component(isVisible, () => setIsVisible(false))
			}
			return component
		}

		return (
			<div className={className} onClick={(e) => e.stopPropagation()}>
				<Tippy
					render={(attrs) => (
						<RootWrapper {...attrs}>
							<>
								{title && <Title>{render(title)}</Title>}
								<Content>{render(children)}</Content>
							</>
						</RootWrapper>
					)}
					visible={isVisible}
					placement={placement}
					interactive
					onClickOutside={() => setIsVisible(false)}
					{...props}
				>
					{React.cloneElement(trigger, {
						onClick: (e: Event) => {
							if (typeof trigger.props.onClick === 'function')
								trigger.props.onClick(e)
							setIsVisible((state) => !state)
						}
					})}
				</Tippy>
			</div>
		)
	}
)

export default Popover
