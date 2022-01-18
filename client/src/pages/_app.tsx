import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import ReactModal from 'react-modal';

if(process.env.NODE_ENV !== 'test') {
	ReactModal.setAppElement('#__next');	
}

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
	return (
		<Providers>
			<Component {...pageProps}/>
		</Providers>
	);
}

export default MyApp;
