import { Ctx, Query, Resolver } from 'type-graphql';
import { Page, PageModel } from '../../models/page.model';

import Context from '../../types/Context';

@Resolver()
export class WorkspaceResolver {
  @Query(() => [Page])
	async getWorkspace(
    @Ctx() { workspace }: Context
	): Promise<Page[]> {
		return await PageModel.find({
			$and: [{ workspace }, { 'hierarchy.root' : null }, { deletedAt: undefined }]
		});
	}
}