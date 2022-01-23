import Tippy, { TippyProps } from '@tippyjs/react/headless'
import React, { useImperativeHandle, useState } from 'react'

import { Content, RootWrapper, Title } from './Popover.styles'
import usePopover, { PopoverContext } from './usePopover'

type ChildrenProp = { children: React.ReactElement }

const PopoverTrigger = React.forwardRef(({ children }: ChildrenProp, ref) => {
	const { open, close, isVisible } = usePopover()

	return React.cloneElement(children, {
		ref,
		onClick: () => {
			if (typeof children.props.onClick === 'function') children.props.onClick()
			if (isVisible) return close()
			open()
		}
	})
})

const PopoverContent = ({ children }: ChildrenProp) => {
	return <Content>{children}</Content>
}

const PopoverTitle = ({ children }: ChildrenProp) => {
	return <Title>{children}</Title>
}

export interface PopoverProps extends Omit<TippyProps, 'trigger' | 'children'> {
	children: React.ReactElement[]
}

interface Handle {
	close: VoidFunction
}

const Popover = React.forwardRef(
	(
		{ children, placement = 'auto', ...props }: PopoverProps,
		ref?: React.Ref<Handle>
	) => {
		const [isVisible, setIsVisible] = useState(false)

		const value = {
			isVisible,
			open: () => setIsVisible(true),
			close: () => setIsVisible(false)
		}

		useImperativeHandle(ref, () => ({
			close: () => setIsVisible(false)
		}))

		if (!Array.isArray(children)) return null

		const trigger = children.find(({ type }) => type === PopoverTrigger)
		const content = children.find(({ type }) => type === PopoverContent)
		const title = children.find(({ type }) => type === PopoverTitle)

		return (
			<PopoverContext.Provider value={value}>
				<Tippy
					render={(attrs) => (
						<RootWrapper {...attrs} onClick={(e) => e.stopPropagation()}>
							{title}
							{content}
						</RootWrapper>
					)}
					visible={isVisible}
					interactive
					onClickOutside={() => setIsVisible(false)}
					placement={placement}
					{...props}
				>
					{trigger}
				</Tippy>
			</PopoverContext.Provider>
		)
	}
)

const PopoverNamespace = Object.assign(Popover, {
	Trigger: PopoverTrigger,
	Content: PopoverContent,
	Title: PopoverTitle
})

export default PopoverNamespace
