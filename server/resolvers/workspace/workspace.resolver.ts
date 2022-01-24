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
				{ workspace },
				{ 'hierarchy.root': null },
				{ deletedAt: undefined }
			]
		})

		const favorites = await PageModel.find({
			$and: [{ workspace }, { favorite: true }, { deletedAt: undefined }]
		})

		return {
			private: all,
			favorites
		}
	}
}
