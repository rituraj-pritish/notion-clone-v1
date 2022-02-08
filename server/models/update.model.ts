import { getModelForClass, prop, plugin, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import { User } from './user.model'
import autoPopulate from 'mongoose-autopopulate'
import { Schema } from 'mongoose'

export enum SubjectType {
	WORKSPACE = 'WORKSPACE',
	PAGE = 'PAGE',
	VIEW = 'VIEW',
	BLOCK = 'BLOCK'
}
registerEnumType(SubjectType, {
	name: 'SubjectType'
})

export enum UpdateType {
	EDITED = 'EDITED',
	CREATED = 'CREATED',
	DELETED = 'DELETED'
}
registerEnumType(UpdateType, {
	name: 'UpdateType'
})

@plugin(autoPopulate as any)
@ObjectType()
class Update {
	@Field(() => ID)
	id: string

  @Field(() => User)
	@prop({ type: Schema.Types.ObjectId, autopopulate: true, ref: User })
	user: Ref<User>

  @Field()
  @prop({ enum: SubjectType })
  subject: string

	@Field()
	@prop({ type: String })
	property: string

  @Field()
  @prop({ type: String })
  url: string

	@Field()
	@prop({ enum: UpdateType })
	updateType: string

	@Field()
	@prop({ default: new Date().toISOString() })
	time: Date
}

export const UpdateModel = getModelForClass(Update)
