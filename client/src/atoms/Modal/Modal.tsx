import React, { useEffect, useState } from 'react';
import ReactModal, { Props as ModalProps } from 'react-modal';
import { CSSProperties } from 'styled-components';

import useMousePosition from '@/hooks/useMousePosition';
import theme from '@/theme';

interface Props extends Omit<ModalProps, 'isOpen' | 'style'> {
	onOpen?: () => void;
	onClose?: () => void;
	showOverlay?: boolean;
	useAsPopover?: boolean;
	style?: CSSProperties;
}

interface WithoutTriggerProps extends Props {
	trigger?: never;
	visible: boolean;
}

interface TriggerProps extends Props {
	trigger: React.ReactElement<any>;
	visible?: never;
}

type GetStyleOptions = Pick<Props, 'showOverlay' | 'useAsPopover'>;

const getStyles = (
	{ showOverlay, useAsPopover }: GetStyleOptions,
	customStyles: CSSProperties = {}
) => {
	let overlay: CSSProperties = {
		background: 'rgba(0, 0, 0, 0.4)'
	};

	const content: CSSProperties = {
		border: 'none',
		borderRadius: theme.borderRadius,
		padding: 0
	};

	if (!showOverlay || useAsPopover) {
		overlay = {
			background: 'transparent'
		};

		content.boxShadow = theme.boxShadow;
		content.width = 'fit-content';
		content.height = 'fit-content';
	}

	return {
		overlay,
		content: {
			...content,
			...customStyles
		}
	};
};

const Modal = ({
	children,
	trigger,
	visible,
	onOpen,
	onClose,
	showOverlay = true,
	useAsPopover = false,
	style = {},
	...props
}: TriggerProps | WithoutTriggerProps) => {
	const mousePosition = useMousePosition();
	const [modalPosition, setModalPosition] = useState({});
	const [isVisible, setIsVisible] = useState(visible || false);

	useEffect(() => {
		if (typeof visible === 'boolean') setIsVisible(visible);
	}, [visible]);

	return (
		<div onClick={(e) => e.stopPropagation()}>
			{trigger &&
				React.cloneElement(trigger, {
					onClick: (e: Event) => {
						if (typeof trigger.props.onClick === 'function')
							trigger.props.onClick(e);
						setIsVisible((state) => !state);
					}
				})}
			<ReactModal
				isOpen={isVisible}
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
				onRequestClose={() => setIsVisible(false)}
				onAfterClose={onClose}
				onAfterOpen={() => {
					if (useAsPopover) {
						setModalPosition({ top: mousePosition.y, left: mousePosition.x });
					}
					if (onOpen) onOpen();
				}}
				style={{
					...getStyles(
						{ useAsPopover, showOverlay },
						{ ...style, ...modalPosition }
					)
				}}
				{...props}
			>
				{children}
			</ReactModal>
		</div>
	);
};

export default Modal;
