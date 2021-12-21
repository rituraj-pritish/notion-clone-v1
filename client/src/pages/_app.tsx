import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Layout } from 'components';
import { useEffect } from 'react';
import useAuthentication from 'hooks/useAuthentication';
import { useRouter } from 'next/router';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false
		}
	}
});

const PUBLIC_ROUTES = ['/', '/login'];

function MyApp({ Component, pageProps }: AppProps) {
	const { checkToken, isLoading, isAuthenticated } = useAuthentication();
	const router = useRouter();
	useEffect(() => {
		checkToken();
	}, []);

	if(!isLoading && isAuthenticated && PUBLIC_ROUTES.includes(router.asPath)) {
		router.replace('/dashboard');
	}

	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				<Component {...pageProps}/>
			</Layout>
		</QueryClientProvider>
	);
}

export default MyApp;
