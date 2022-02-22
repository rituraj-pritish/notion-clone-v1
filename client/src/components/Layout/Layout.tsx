import React from 'react'

import { Box } from '@/atoms'
import { Navbar, Sidebar } from '@/components'

import { RootWrapper } from './Layout.styles'

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<RootWrapper>
			<Sidebar />
			<Box marginX='auto'>
				<Navbar />
				{children}
			</Box>
		</RootWrapper>
	)
}

export default Layout
