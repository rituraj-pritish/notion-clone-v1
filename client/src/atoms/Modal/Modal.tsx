import React, { useEffect, useState } from 'react';
import ReactModal, { Props as ModalProps } from 'react-modal';
import theme from  '@/theme';

interface Props extends Omit<ModalProps, 'isOpen'> {
  onOpen?: () => void
  onClose?: () => void
}

interface WithoutTriggerProps extends Props {
  trigger?: never
  visible: boolean
}

interface TriggerProps extends Props {
  trigger: React.ReactElement<any>,
  visible?: never
}

const styles = {
	overlay: {
		background: 'rgba(0, 0, 0, 0.4)'
	},
	content: {
		border: 'none',
		borderRadius: theme.borderRadius,
		padding: 0
	}
};

const Modal = ({
	children,
	trigger,
	visible,
	onOpen,
	onClose
}: TriggerProps | WithoutTriggerProps) => {
	const [isVisible, setIsVisible] = useState(visible || false);

	useEffect(() => {
		if(typeof visible === 'boolean') setIsVisible(visible);
	}, [visible]);

	return (
		<>
			{trigger && React.cloneElement(trigger, {
				onClick: (e: Event) => {
					if(typeof trigger.props.onClick === 'function') trigger.props.onClick(e);
					setIsVisible(state => !state);
				}
			})}
			<ReactModal
				isOpen={isVisible}
				shouldCloseOnEsc
				shouldCloseOnOverlayClick
				onRequestClose={() => setIsVisible(false)}
				onAfterClose={onClose}
				onAfterOpen={onOpen}
				style={styles}
			>
				{children}
			</ReactModal>
		</>
	);
};

export default Modal;
