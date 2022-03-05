import { getModelForClass, plugin, prop } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import {
	createUnionType,
	Field,
	ID,
	ObjectType,
	registerEnumType
} from 'type-graphql'
import autoPopulate from 'mongoose-autopopulate'
import { convertDocument } from '../middlewares/typegooseMiddleware'
import { UserAndDate } from './commonObjects'

enum ParentType {
	WORKSPACE = 'WORKSPACE',
	PAGE = 'PAGE'
}
registerEnumType(ParentType, {
	name: 'ParentType'
})

@ObjectType()
class Hierarchy {
	@Field(() => ID, { nullable: true })
	@prop({ type: Schema.Types.ObjectId })
	root: string

	@Field(() => ID, { nullable: true })
	@prop({ type: Schema.Types.ObjectId })
	parent: string

	@Field(() => [ID], { defaultValue: [] })
	@prop({ type: [Schema.Types.ObjectId] })
	children: string[]

	@Field()
	@prop({ type: Number })
	index: number
}

@ObjectType()
export class Emoji {
	@Field()
	@prop({ type: String, default: 'EMOJI' })
	type: string

	@Field()
	@prop({ type: String, required: true })
	emoji: string
}

@ObjectType()
export class File {
	@Field()
	@prop({ type: String, default: 'FILE' })
	type: string

	@Field()
	@prop({ type: String, required: true })
	url: string
}

export const IconType = createUnionType({
	name: 'IconType',
	types: () => [Emoji, File] as const,
	resolveType: value => {
		if('emoji' in value) return Emoji
		if('url' in value) return File
		return undefined
	}
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

	@Field(() => IconType, { nullable: true })
	@prop({ type: Schema.Types.Mixed, _id: false })
	icon: File | Emoji

	@Field(() => Cover, { nullable: true })
	@prop({ type: Cover, _id: false })
	cover: Cover

	@Field(() => Properties)
	@prop({ type: Properties, _id: false })
	properties: Properties

	@Field(() => Hierarchy)
	@prop({
		type: Hierarchy,
		_id: false,
		default: { root: null, parent: null, children: [], index: 0 }
	})
	hierarchy: Hierarchy

	@Field()
	@prop({ type: String })
	url: string

	@Field()
	@prop({ type: Boolean, default: false })
	favorite: boolean

	@Field()
	@prop({ type: Boolean, default: false })
	archived: boolean

	@Field(() => UserAndDate)
	@prop({ type: UserAndDate, _id: false })
	lastEdited: UserAndDate

	@Field(() => UserAndDate)
	@prop({ type: UserAndDate, _id: false })
	created: UserAndDate
}

export const PageModel = getModelForClass(Page)
