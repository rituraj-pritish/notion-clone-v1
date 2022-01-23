import React from 'react'

interface Context {
	isVisible: boolean
	open: VoidFunction
	close: VoidFunction
}

export const PopoverContext = React.createContext<Context>({
	isVisible: false,
	open: () => {},
	close: () => {}
})
PopoverContext.displayName = 'PopoverContext'

const usePopover = () => {
	const context = React.useContext(PopoverContext)

	if (!context) {
		throw new Error('usePopover must be used within PopoverProvider')
	}

	return context
}

export default usePopover
