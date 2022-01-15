import api from  '@/api';
import { GET_WORKSPACE } from  '@/graphql/workspaces';
import { Page } from 'types/page';

export const getWorkspace = () => {
	return api<{private: Page[], favorites?: Page[], shared?: []}>(GET_WORKSPACE);
};