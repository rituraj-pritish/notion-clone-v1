import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Block, BlockModel } from '../../models/block.model'
import Context from '../../types/Context'
import { CreateBlockInput } from './block.types'

@Resolver()
export class BlockResolver {
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

		return block
	}
}
