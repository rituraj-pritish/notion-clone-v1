import { Workspace, WorkspaceModel } from '../../models/workspace.model';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
export class WorkspaceResolver {
  @Query(() => Workspace)
	async getWorkspace(
    @Ctx() { workspace }
	): Promise<Workspace | null> {
		return await WorkspaceModel.findById(workspace);
	}
}