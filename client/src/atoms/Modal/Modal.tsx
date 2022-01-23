import React, { useEffect, useState } from 'react'
import ReactModal, { Props as ModalProps, Styles } from 'react-modal'

import useMousePosition from '@/hooks/useMousePosition'
import theme from '@/theme'

import useModal, { ModalContext } from './useModal'

type ChildrenProp = { children: React.ReactElement }

export interface Props extends Omit<ModalProps, 'isOpen' | 'style'> {
	onOpen?: () => void
	onClose?: () => void
	visible?: boolean
	showOverlay?: boolean
	styles?: React.CSSProperties
}

const ModalTrigger = ({ children }: ChildrenProp) => {
	const { openModal, closeModal, isVisible } = useModal()

	return React.cloneElement(children, {
		onClick: () => {
			if (typeof children.props.onClick === 'function') children.props.onClick()
			if (isVisible) return closeModal()
			openModal()
		}
	})
}

const baseStyles: Styles = {
	overlay: {
		background: 'rgba(0, 0, 0, 0.4)'
	},
	content: {
		border: 'none',
		borderRadius: theme.borderRadius,
		padding: 0
	}
}
const noOverlayStyles: Styles = {
	...baseStyles,
	overlay: {
		background: 'transparent'
	},
	content: {
		...baseStyles.content,
		boxShadow: theme.boxShadow
	}
}
const popoverStyles: Styles = {
	...noOverlayStyles,
	content: {
		...noOverlayStyles.content,
		width: 'fit-content',
		height: 'fit-content'
	}
}
const getStyles = (
	{
		showOverlay,
		useAsPopover
	}: {
		showOverlay?: boolean
		useAsPopover?: boolean
	},
	override: React.CSSProperties | undefined
) => {
	let styles = baseStyles
	if (useAsPopover === true) styles = popoverStyles
	if (showOverlay === false) styles = noOverlayStyles
	if (override) {
		styles = { ...styles, content: { ...styles.content, ...override } }
	}
	return styles
}

const ModalContent = ({ children }: ChildrenProp) => {
	const { isVisible, closeModal, modalProps } = useModal()
	return (
		<ReactModal
			isOpen={isVisible}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
			onRequestClose={closeModal}
			style={getStyles(
				{
					showOverlay: modalProps.showOverlay
				},
				modalProps.styles
			)}
			{...modalProps}
		>
			{children}
		</ReactModal>
	)
}

const ModalPopover = ({ children }: ChildrenProp) => {
	const { isVisible, closeModal, modalProps } = useModal()
	const mousePosition = useMousePosition()
	const [modalPosition, setModalPosition] = useState({})

	const styles = React.useMemo(
		() =>
			getStyles(
				{
					useAsPopover: true
				},
				{ ...modalProps.styles, ...modalPosition }
			),
		[modalPosition]
	)

	return (
		<ReactModal
			isOpen={isVisible}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
			onRequestClose={closeModal}
			onAfterOpen={() => {
				setModalPosition({ top: mousePosition.y, left: mousePosition.x })
				if (modalProps.onOpen) modalProps.onOpen()
			}}
			{...modalProps}
			style={styles}
		>
			{children}
		</ReactModal>
	)
}

const Modal = ({ children, visible, ...otherProps }: Props) => {
	const [isVisible, setIsVisible] = useState(() =>
		typeof visible === 'boolean' ? visible : false
	)

	useEffect(() => {
		if (typeof visible === 'boolean') setIsVisible(visible)
	}, [visible])

	const value = {
		isVisible,
		openModal: () => setIsVisible(true),
		closeModal: () => setIsVisible(false),
		modalProps: otherProps
	}

	return (
		<ModalContext.Provider value={value}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</ModalContext.Provider>
	)
}

Modal.ModalTrigger = ModalTrigger
Modal.ModalContent = ModalContent
Modal.ModalPopover = ModalPopover

export default Modal
