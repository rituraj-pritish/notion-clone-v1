import React from 'react'

import { Props } from './Modal'

interface Context {
	isVisible: boolean
	openModal: VoidFunction
	closeModal: VoidFunction
	modalProps: Props
}

export const ModalContext = React.createContext<Context>({
	isVisible: false,
	openModal: () => {},
	closeModal: () => {},
	modalProps: {}
})
ModalContext.displayName = 'ModalContext'

const useModal = () => {
	const context = React.useContext(ModalContext)

	if (!context) {
		throw new Error('useModal must be used within ModalProvider')
	}

	return context
}

export default useModal
