import { prop } from '@typegoose/typegoose'
import { GraphQLObjectType } from 'graphql'
import { Schema } from 'mongoose'
import { Field, ID, InputType } from 'type-graphql'
import { BlockType, BlockParentType } from '../../models/block.model'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
class BlockParentInput {
	@Field(() => BlockParentType)
	@prop({ enum: BlockParentType })
	type: BlockParentType

	@Field(() => ID)
	@prop({ type: Schema.Types.ObjectId })
	id: string
}

@InputType()
export class CreateBlockInput {
	@Field(() => GraphQLJSONObject)
	@prop({ type: GraphQLObjectType })
	object: object

	@Field()
	@prop({ type: Number })
	index: number

	@Field(() => BlockType)
	@prop({ enum: BlockType, required: true })
	type: BlockType

	@Field(() => BlockParentInput)
	@prop({ type: BlockParentInput })
	parent: BlockParentInput
}
