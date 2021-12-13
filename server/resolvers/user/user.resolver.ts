import { AuthenticationError } from 'apollo-server-errors';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, UserModel } from '../../models/user.model';
import { UserInput } from './user.types';

@Resolver()
export class UsersResolver {
	@Query(() => User)
	async signin(
		@Arg('email') email: string,
		@Arg('password') password: string
	): Promise<User> {
		const user = await UserModel.findOne({ email });

		if(!user) throw new AuthenticationError('Invalid Credentials');

		const isPasswordCorrect =  await bcrypt.compare(password.toString(), user.password); 
		if(!isPasswordCorrect) throw new AuthenticationError('Invalid Credentials');

		return user;
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