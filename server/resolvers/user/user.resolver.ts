import { AuthenticationError } from 'apollo-server-errors';
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, UserModel } from '../../models/user.model';
import { UserInput } from './user.types';

@ObjectType()
class UserWithToken extends User {
	@Field()
		token: string;
}

@Resolver()
export class UsersResolver {
	@Query(() => UserWithToken)
	async signin(
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<UserWithToken> {
		const user = await UserModel.findOne({ email });

		if(!user) throw new AuthenticationError('Invalid Credentials');

		const isPasswordCorrect =  await bcrypt.compare(password.toString(), user.password); 
		if(!isPasswordCorrect) throw new AuthenticationError('Invalid Credentials');
		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET!,
			{ expiresIn: '10days' }
		);

		return {
			...user._doc,
			token
		};
	}

  @Mutation(() => User) 
	async signup(@Arg('newUserInput') {
		password,
		email,
		name
	}: UserInput): Promise<User & { token: string }> {
		const hashed = await bcrypt.hash(password, 10);
		
		const user = await UserModel.create({
			email,
			name,
			password: hashed
		});
		
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);

		return {
			...user,
			token
		};
	}
}