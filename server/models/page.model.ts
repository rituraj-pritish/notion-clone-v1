import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class Hierarchy {
  @Field(() => ID, { nullable: true })
  @prop({ type: Schema.Types.ObjectId })
  	root: string;

  @Field(() => ID, { nullable: true })
  @prop({ type: Schema.Types.ObjectId })
  	parent: string;

  @Field(() => [ID], { defaultValue: [] })
  @prop({ type: [Schema.Types.ObjectId] })
  	children: string[];
}

@ObjectType()
export class Page {
  @Field(() => ID)
  	id: string;

  @Field()
  @prop({ type: String })
  	name: string;

  @Field({ nullable: true })
  @prop({ type: String })
  	icon: string;

  @Field(() => Hierarchy)
  @prop({ type: Hierarchy, _id: false , default: { root: null, parent: null, children: [] } })
  	hierarchy: Hierarchy;

  @Field(() => ID)
  @prop({ type: mongoose.Types.ObjectId, required: true })
  	workspace: string;

  @Field({ nullable: true })
  @prop({ type: Date })
  	deletedAt: Date;

  @Field()
  @prop({ required: true, default: Date.now })
  	createdAt: Date;

  @Field()
  @prop({ required: true, default: Date.now })
  	updatedAt: Date;
}

export const PageModel = getModelForClass(Page);