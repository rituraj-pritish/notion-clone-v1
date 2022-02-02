import { getModelForClass, prop } from '@typegoose/typegoose'
import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType()
export class User {
	@Field(() => ID)
	id: string

	@Field()
	@prop({ type: String, required: true })
	email: string

	@Field()
	@prop({ type: String, required: true })
	name: string

	@prop({ type: String, required: true })
	password: string

	@Field(() => [ID])
	@prop({ type: [String] })
	workspaces: string[]

	@Field(() => ID)
	@prop({ type: String })
	currentWorkspace: string

	@Field()
	@prop({ required: true, default: new Date().toISOString() })
	createdAt: Date

	@Field()
	@prop({ required: true, default: new Date().toISOString() })
	updatedAt: Date
}

export const UserModel = getModelForClass(User)
