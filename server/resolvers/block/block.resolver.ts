import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Block, BlockModel } from '../../models/block.model'
import Context from '../../types/Context'
import { CreateBlockInput, UpdateBlockInput } from './block.types'

@Resolver()
export class BlockResolver {
	@Query(() => [Block])
	async getBlocks(@Arg('id') id: string): Promise<Block[]> {
		return await BlockModel.find({ 'parent.id': id }).sort({ order: 'asc' })
	}

	@Mutation(() => Boolean)
	async deleteBlock(@Arg('id') id: string): Promise<boolean> {
		await BlockModel.findOneAndDelete({ _id: id })
		return true
	}

	@Mutation(() => Block)
	async updateBlock(
		@Arg('updateBlockInput') { id, order, object }: UpdateBlockInput,
		@Ctx() { user }: Context
	): Promise<Block> {
		const block = await BlockModel.findOneAndUpdate(
			{ _id: id },
			{
				order,
				object,
				lastEdited: {
					user,
					time: new Date().toISOString()
				}
			},
			{ new: true }
		)
		if (!block) throw new Error('Block does not exist')

		return block
	}

	@Mutation(() => Block)
	async createBlock(
		@Arg('createBlockInput') { order, object, parent, type }: CreateBlockInput,
		@Ctx() { user }: Context
	): Promise<Block> {
		const block = await new BlockModel({
			order,
			object,
			parent,
			type,
			created: {
				user,
				time: new Date().toISOString()
			},
			lastEdited: {
				user,
				time: new Date().toISOString()
			}
		})
		await block.save()

		return block.populate(['created.user', 'lastEdited.user'])
	}
}
