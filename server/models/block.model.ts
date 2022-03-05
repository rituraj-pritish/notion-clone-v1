import { getModelForClass, plugin, prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import autoPopulate from 'mongoose-autopopulate'
import { UserAndDate } from './commonObjects'
import { Schema } from 'mongoose'
import { GraphQLJSONObject } from 'graphql-type-json'
import { GraphQLObjectType } from 'graphql'

export enum BlockParentType {
	PAGE = 'PAGE',
	DATABASE = 'DATABASE'
}
registerEnumType(BlockParentType, {
	name: 'BlockParentType'
})

@ObjectType()
export class BlockParent {
	@Field(() => BlockParentType)
	@prop({ enum: BlockParentType })
	type: BlockParentType

	@Field(() => ID)
	@prop({ type: Schema.Types.ObjectId })
	id: string
}

export enum BlockType {
	TEXT = 'TEXT'
}
registerEnumType(BlockType, {
	name: 'BlockType'
})

@plugin(autoPopulate as any)
@ObjectType()
export class Block {
	@Field(() => ID)
	id: string

	@Field(() => GraphQLJSONObject)
	@prop({ type: GraphQLObjectType })
	object: object

	@Field()
	@prop({ type: Number })
	index: number

	@Field(() => BlockType)
	@prop({ enum: BlockType, required: true })
	type: BlockType

	@Field(() => UserAndDate)
	@prop({ type: UserAndDate, _id: false })
	lastEdited: UserAndDate

	@Field(() => BlockParent)
	@prop({ type: BlockParent, _id: false })
	parent: BlockParent

	@Field(() => UserAndDate)
	@prop({ type: UserAndDate, _id: false })
	created: UserAndDate
}

export const BlockModel = getModelForClass(Block)
