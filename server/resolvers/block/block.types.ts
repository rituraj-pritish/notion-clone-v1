import { prop } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import { Field, ID, InputType } from 'type-graphql'
import { BlockType, BlockParentType } from '../../models/block.model'

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
class RichTextStyleInput {
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

@InputType()
class RichTextObjectInput {
	@Field(() => [RichTextStyleInput])
	@prop({ type: [RichTextStyleInput] })
	styles: RichTextStyleInput[]

	@Field()
	@prop({ type: String })
	text: string
}

@InputType()
export class CreateBlockInput {
	@Field(() => RichTextObjectInput)
	@prop({ type: RichTextObjectInput })
	object: RichTextObjectInput

	@Field()
	@prop({ type: Number })
	order: number

	@Field(() => BlockType)
	@prop({ enum: BlockType, required: true })
	type: BlockType

	@Field(() => BlockParentInput)
	@prop({ type: BlockParentInput })
	parent: BlockParentInput
}

@InputType()
export class UpdateBlockInput {
	@Field(() => ID)
	id: string

	@Field(() => RichTextObjectInput, { nullable: true })
	@prop({ type: RichTextObjectInput })
	object: RichTextObjectInput

	@Field({ nullable: true })
	@prop({ type: Number })
	order: number
}
