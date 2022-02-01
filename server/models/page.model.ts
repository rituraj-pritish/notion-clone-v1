import { getModelForClass, plugin, prop, Ref } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import {
	createUnionType,
	Field,
	ID,
	ObjectType,
	registerEnumType
} from 'type-graphql'
import { User } from './user.model'
import autoPopulate from 'mongoose-autopopulate'

enum ParentType {
	WORKSPACE = 'WORKSPACE',
	PAGE = 'PAGE'
}
registerEnumType(ParentType, {
	name: 'ParentType'
})

@ObjectType()
class Emoji {
	@Field()
	@prop({ type: String, default: 'Emoji' })
	type: string

	@Field()
	@prop({ type: String, required: true })
	emoji: string
}

@ObjectType()
class File {
	@Field()
	@prop({ type: String, default: 'File' })
	type: string

	@Field()
	@prop({ type: String, required: true })
	url: string
}

const IconType = createUnionType({
	name: 'IconType',
	types: () => [Emoji, File] as const
})

@ObjectType()
class Parent {
	@Field(() => ParentType)
	@prop({ enum: ParentType })
	type: string

	@Field(() => ID)
	@prop({ type: Schema.Types.ObjectId })
	id: string
}

@ObjectType()
class LastEdited {
	@Field(() => User)
	@prop({ type: Schema.Types.ObjectId, autopopulate: true, ref: User })
	user: Ref<User>

	@Field(() => Date)
	@prop({ type: Date })
	time: Date
}

@ObjectType()
class Cover {
	@Field()
	@prop({ type: String })
	url: string
}

@ObjectType()
class Properties {
	@Field()
	@prop({ type: String })
	title: string
}

@plugin(autoPopulate as any)
@ObjectType()
export class Page {
	@Field(() => ID)
	id: string

	@Field(() => Parent)
	@prop({ type: Parent, _id: false })
	parent: Parent

	@Field(() => LastEdited)
	@prop({ type: LastEdited, _id: false })
	lastEdited: LastEdited

	@Field(() => IconType)
	@prop({ type: Schema.Types.Mixed, _id: false })
	icon: Schema.Types.Mixed

	@Field(() => Cover)
	@prop({ type: Cover, _id: false })
	cover: Cover

	@Field(() => Properties)
	@prop({ type: Properties, _id: false })
	properties: Properties

	@Field()
	@prop({ type: String })
	url: string

	@Field()
	@prop({ type: Boolean, default: false })
	favorite: boolean

	@Field()
	@prop({ type: Boolean, default: false })
	archived: boolean

	@Field()
	@prop({ default: Date.now })
	createdAt: Date
}

export const PageModel = getModelForClass(Page)
