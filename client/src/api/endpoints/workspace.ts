import api from '@/api';
import { GET_WORKSPACE } from '@/graphql/workspaces';
import { Page } from '@/types/page';

export interface GetWorkspaceResult {
	private: Page[];
	favorites?: Page[];
	shared?: Page[];
}

export type GetWorkspaceVariables = string;

export const getWorkspace = (token?: GetWorkspaceVariables) => {
	return api<GetWorkspaceResult>(GET_WORKSPACE, {}, token);
};
