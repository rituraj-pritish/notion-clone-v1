import { getModelForClass, mongoose, plugin, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import autoPopulate from 'mongoose-autopopulate';
import { User } from './user.model';

enum Role {
  ADMIN = 'admin',
  GUEST = 'guest'
}

@ObjectType()
class UserWithRole {
  @Field(() => User)
  @prop({ type: mongoose.Types.ObjectId, autopopulate: true, ref: User, required: true })
  	user: Ref<User>;

  @Field()
  @prop({ enum: Role, required: true })
  	role: string;
}

@plugin(autoPopulate as any)
@ObjectType()
export class Workspace {
  @Field(() => ID)
  	id: string;

  @Field(() => [UserWithRole])
  @prop({ _id: false, type: [UserWithRole], required: true })
  	users: Ref<UserWithRole>[];
}

export const WorkspaceModel = getModelForClass(Workspace);