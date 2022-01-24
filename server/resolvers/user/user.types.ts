import { IsEmail } from 'class-validator'
import { User } from '../../models/user.model'
import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput implements Partial<User> {
	@Field()
	name: string

	@IsEmail()
	@Field()
	email: string

	@Field()
	password: string
}
