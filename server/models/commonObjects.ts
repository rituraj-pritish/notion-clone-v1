import { prop, Ref } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import { Field, ObjectType } from 'type-graphql'
import { User } from './user.model'

@ObjectType()
export class UserAndDate {
	@Field(() => User)
	@prop({ type: Schema.Types.ObjectId, autopopulate: true, ref: User })
	user: Ref<User>

	@Field(() => Date)
	@prop({ type: Date, default: new Date().toISOString() })
	time: Date
}
