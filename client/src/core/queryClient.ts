import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false
		}
	}
});

export default queryClient;
