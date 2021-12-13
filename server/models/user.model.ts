import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  	_id: string;

  @Field()
  @prop({ type: String, required: true })
  	email: string;

  @Field()
  @prop({ type: String, required: true })
  	name: string;

  @Field()
  @prop({ type: String, required: true })
  	password: string;

  @Field()
  @prop({ required: true, default: Date.now })
  	createdAt: Date;

  @Field()
  @prop({ required: true, default: Date.now })
  	updatedAt: Date;
}

export const UserModel = getModelForClass(User);