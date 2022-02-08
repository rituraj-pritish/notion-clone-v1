import {
	getModelForClass,
	mongoose,
	plugin,
	prop,
	Ref
} from '@typegoose/typegoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import autoPopulate from 'mongoose-autopopulate'
import { User } from './user.model'

enum Role {
	ADMIN = 'ADMIN',
	MEMBER = 'MEMBER',
	GUEST = 'GUEST'
}
registerEnumType(Role, {
	name: 'Role'
})

@ObjectType()
class UserWithRole {
	@Field(() => User)
	@prop({
		type: mongoose.Types.ObjectId,
		autopopulate: true,
		ref: User
	})
	user: Ref<User>

	@Field()
	@prop({ enum: Role })
	role: string
}

@plugin(autoPopulate as any)
@ObjectType()
export class Workspace {
	@Field(() => ID)
	id: string

	@Field(() => [UserWithRole])
	@prop({ _id: false, type: [UserWithRole] })
	users: Ref<UserWithRole>[]

	@Field()
	@prop({ type: String })
	title: string
}

export const WorkspaceModel = getModelForClass(Workspace)
