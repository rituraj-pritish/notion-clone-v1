import { Emoji, File, IconType, Page, PageModel } from '../../models/page.model'
import {
	Arg,
	Authorized,
	Ctx,
	Field,
	Mutation,
	ObjectType,
	Query,
	Resolver,
	UseMiddleware
} from 'type-graphql'
import { CreatePageInput, UpdatePageInput } from './page.types'
import Context from '../../types/Context'
import DocumentUpdate from '../../middlewares/documentUpdate'
import UpdateDetails from '../../types/UpdateDetails'

interface PageWithUpdateDetails extends UpdateDetails {
	result: Page
}

interface PageWithAncestry extends Page {
	ancestry: {
		id: Page['id']
		title: string
		icon: Page['icon']
	}[]
}

@ObjectType()
class Ancestry {
	@Field()
	id: string

	@Field()
	title: string

	@Field(() => IconType, { nullable: true })
	icon: File | Emoji
}

@ObjectType()
class PageWithAncestry extends Page {
	@Field(() => [Ancestry])
	ancestry: Ancestry[]
}

@Resolver()
export class PageResolver {
	@Authorized()
	@Query(() => [Page])
	async getPages(@Arg('ids') ids: string): Promise<Page[]> {
		const commaSeparatedIds = ids.split(',')
		const pages = await PageModel.find({
			$and: [{ _id: { $in: commaSeparatedIds } }, { archived: false }]
		})

		return pages
	}

	@Authorized()
	@Query(() => PageWithAncestry)
	async getPage(@Arg('id') id: string): Promise<PageWithAncestry | null> {
		const page = await PageModel.findById(id)

		let ancestry = [
			{ id: page?.id, title: page?.properties.title, icon: page?.icon }
		]

		const getAncestry = async (pageId: string) => {
			const currentPage = await PageModel.findById(pageId)
			ancestry = [
				{
					id: currentPage?.id,
					title: currentPage?.properties.title,
					icon: currentPage?.icon
				},
				...ancestry
			]

			if (
				currentPage?.id.toString() === page?.hierarchy.root.toString()
			) {
				return
			}

			if (currentPage?.hierarchy?.parent) {
				await getAncestry(currentPage.hierarchy.parent)
			}
		}

		if (page?.hierarchy.parent) {
			await getAncestry(page.hierarchy.parent)
		}

		if (!page) return null
		// @ts-expect-error doc
		return { ...page._doc, id: page.id, ancestry }
	}

	@Authorized()
	@Mutation(() => Page)
	async createPage(
		@Arg('createPageInput')
		{ properties, icon, parent, hierarchy }: CreatePageInput,
		@Ctx() { user }: Context
	): Promise<Page> {
		const page = await PageModel.create({
			icon,
			properties,
			parent,
			hierarchy,
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
	@UseMiddleware(DocumentUpdate)
	@Mutation(() => Page)
	async updatePage(
		@Arg('updatePageInput') { id, icon, properties, favorite }: UpdatePageInput,
		@Ctx() { user }: Context
	): Promise<PageWithUpdateDetails> {
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

		return {
			updateDetails: {
				subject: 'PAGE',
				updateType: 'EDITED',
				user,
				url: page.url
			},
			result: page
		}
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
