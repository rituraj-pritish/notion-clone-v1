import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactModal from 'react-modal'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false
		}
	}
})

const Providers = ({ children }) => {
	useEffect(() => {
		ReactModal.setAppElement('#root')
	}, [])
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
}

export const decorators = [(Story) => <Providers>{Story()}</Providers>]
