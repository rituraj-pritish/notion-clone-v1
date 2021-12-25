import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Layout } from 'components';

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
	return (
		<QueryClientProvider client={queryClient}>
			{/* <Layout> */}
			<Component {...pageProps}/>
			{/* </Layout> */}
		</QueryClientProvider>
	);
}

export default MyApp;
