import { Authorized, Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql'
import { Page, PageModel } from '../../models/page.model'

import Context from '../../types/Context'

@ObjectType()
class WorkspaceReturn {
	@Field(() => [Page])
	private: Page[]

	@Field(() => [Page])
	favorites: Page[]
}

@Resolver()
export class WorkspaceResolver {
	@Authorized()
	@Query(() => WorkspaceReturn)
	async getWorkspace(@Ctx() { workspace }: Context): Promise<WorkspaceReturn> {
		const all = await PageModel.find({
			$and: [
				{ 'parent.id': workspace },
				{ archived: false }
			]
		})

		const favorites = await PageModel.find({
			$and: [{ 'parent.id': workspace }, { favorite: true }, { archived: false }]
		})

		return {
			private: all,
			favorites
		}
	}
}
