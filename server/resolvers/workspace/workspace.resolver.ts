import { Ctx, Query, Resolver } from 'type-graphql';

import { Workspace, WorkspaceModel } from '../../models/workspace.model';
import Context from '../../types/Context';

@Resolver()
export class WorkspaceResolver {
  @Query(() => Workspace)
	async getWorkspace(
    @Ctx() { workspace }: Context
	): Promise<Workspace | null> {
		return await WorkspaceModel.findById(workspace);
	}
}