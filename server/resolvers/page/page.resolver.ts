import { Page, PageModel } from '../../models/page.model';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';

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
    @Arg('name') name: string
	): Promise<Page> {
		const page = await PageModel.create({
			name
		});

		return page;
	}
}