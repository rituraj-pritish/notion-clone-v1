import { Page, PageModel } from '../../models/page.model'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { CreatePageInput, UpdatePageInput } from './page.types'
import Context from '../../types/Context'

@Resolver()
export class PageResolver {
	@Query(() => [Page])
	async getPages(@Arg('ids') ids: string): Promise<Page[]> {
		const commaSeparatedIds = ids.split(',')
		const pages = await PageModel.find({
			$and: [{ _id: { $in: commaSeparatedIds } }, { deletedAt: undefined }]
		})

		return pages
	}

	@Query(() => Page)
	async getPage(@Arg('id') id: string): Promise<Page | null> {
		const page = await PageModel.findById(id)
		return page
	}

	@Mutation(() => Page)
	async createPage(
		@Arg('createPageInput') { name, icon, hierarchy }: CreatePageInput,
		@Ctx() { workspace }: Context
	): Promise<Page> {
		const page = await PageModel.create({
			name,
			icon,
			hierarchy: {
				root: hierarchy?.root || null,
				parent: hierarchy?.parent || null,
				children: hierarchy?.children || []
			},
			workspace
		})

		if (hierarchy?.parent) {
			const parentPage = await PageModel.findById(hierarchy.parent)
			await parentPage?.update({
				hierarchy: {
					//@ts-expect-error todo find solution
					...parentPage.hierarchy._doc,
					children: [...parentPage.hierarchy.children, page.id]
				}
			})
		}

		return page
	}

	@Mutation(() => Page)
	async updatePage(
		@Arg('updatePageInput') { id, icon, name, favorite }: UpdatePageInput
	): Promise<Page> {
		const page = await PageModel.findOneAndUpdate(
			{ _id: id },
			{
				icon,
				name,
				favorite
			},
			{ new: true }
		)

		if (!page) throw new Error('Page not found')

		return page
	}

	@Mutation(() => Page)
	async deletePage(@Arg('id') id: string) {
		const page = await PageModel.findByIdAndUpdate(
			id,
			{
				deletedAt: new Date()
			},
			{ new: true }
		)

		return page
	}
}
