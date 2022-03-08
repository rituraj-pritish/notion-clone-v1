import { getModelForClass, plugin, prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import autoPopulate from 'mongoose-autopopulate'
import { UserAndDate } from './commonObjects'
import { Schema } from 'mongoose'

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

@ObjectType()
class Style {
	@Field()
	@prop({ type: Number })
	offset: number

	@Field()
	@prop({ type: Number })
	length: number

	@Field()
	@prop({ type: String })
	style: string
}

@ObjectType()
class RichTextObject {
	@Field(() => [Style])
	@prop({ type: [Style] })
	styles: Style[]

	@Field()
	@prop({ type: String })
	text: string
}

@plugin(autoPopulate as any)
@ObjectType()
export class Block {
	@Field(() => ID)
	id: string

	@Field(() => RichTextObject)
	@prop({ type: RichTextObject, _id: false })
	object: RichTextObject

	@Field()
	@prop({ type: Number })
	order: number

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
