import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false
		}
	}
});

export const Providers = ({ children }: { children: React.ReactChild }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		ReactModal.setAppElement('#__next');	
	}, []);

	return (
		<Providers>
			<Component {...pageProps}/>
		</Providers>
	);
}

export default MyApp;
