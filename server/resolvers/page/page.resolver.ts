import { Page, PageModel } from '../../models/page.model'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { CreatePageInput, UpdatePageInput } from './page.types'
import Context from '../../types/Context'

@Resolver()
export class PageResolver {
	@Authorized()
	@Query(() => [Page])
	async getPages(@Arg('ids') ids: string): Promise<Page[]> {
		const commaSeparatedIds = ids.split(',')
		const pages = await PageModel.find({
			$and: [{ _id: { $in: commaSeparatedIds } }, { deletedAt: undefined }]
		})

		return pages
	}

	@Authorized()
	@Query(() => Page)
	async getPage(@Arg('id') id: string): Promise<Page | null> {
		const page = await PageModel.findById(id)
		return page
	}

	@Authorized()
	@Mutation(() => Page)
	async createPage(
		@Arg('createPageInput') { properties, icon, parent, hierarchy }: CreatePageInput,
		@Ctx() { user }: Context
	): Promise<Page> {
		const page = await PageModel.create({
			icon,
			properties,
			parent,
			created: {
				user,
				time: new Date().toISOString()
			},
			lastEdited: {
				user,
				time: new Date().toISOString()
			}
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

		return page.populate(['created.user', 'lastEdited.user'])
	}

	@Authorized()
	@Mutation(() => Page)
	async updatePage(
		@Arg('updatePageInput') { id, icon, properties, favorite }: UpdatePageInput,
		@Ctx() { user }: Context
	): Promise<Page> {
		const page = await PageModel.findOneAndUpdate(
			{ _id: id },
			{
				icon,
				properties,
				favorite,
				lastEdited: {
					user,
					time: new Date().toISOString()
				}
			},
			{ new: true }
		)

		if (!page) throw new Error('Page not found')

		return page
	}

	@Authorized()
	@Mutation(() => Page)
	async deletePage(@Arg('id') id: string) {
		const page = await PageModel.findByIdAndUpdate(
			id,
			{
				archived: true
			},
			{ new: true }
		)

		return page
	}
}
