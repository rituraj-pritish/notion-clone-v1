import { Page, PageModel } from '../../models/page.model';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { WorkspaceModel } from '../../models/workspace.model';
import { CreatePageInput } from './page.types';

@Resolver()
export class PageResolver {
	@Query(() => Page)
	async getPage(
		@Arg('id') id: string
	): Promise<Page | null> {
		const page = await PageModel.findById(id);

		return page;
	}

  @Mutation(() => Page) 
	async createPage(
    @Arg('createPageInput') {
    	name,
    	icon
    }: CreatePageInput,
		@Ctx() { workspace }
	): Promise<Page> {
		const page = await PageModel.create({
			name,
			icon
		});
		const space = await WorkspaceModel.findById(workspace);

		await space?.pages.push(page.id);
		await space?.save();

		return page;
	}
}