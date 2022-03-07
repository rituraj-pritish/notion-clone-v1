import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Block, BlockModel } from '../../models/block.model'
import Context from '../../types/Context'
import { CreateBlockInput, UpdateBlockInput } from './block.types'

@Resolver()
export class BlockResolver {
	@Query(() => [Block])
	async getBlocks(@Arg('id') id: string): Promise<Block[]> {
		return await BlockModel.find({ 'parent.id': id })
	}

	@Mutation(() => Block)
	async updateBlock(
		@Arg('updateBlockInput') { id, index, object }: UpdateBlockInput,
		@Ctx() { user }: Context
	): Promise<Block> {
		const block = await BlockModel.findOneAndUpdate(
			{ _id: id },
			{
				index,
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
		@Arg('createBlockInput') { index, object, parent, type }: CreateBlockInput,
		@Ctx() { user }: Context
	): Promise<Block> {
		const block = await new BlockModel({
			index,
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

		return block
	}
}
