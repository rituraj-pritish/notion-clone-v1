import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Page {
  @Field(() => ID)
  	id: string;

  @Field()
  @prop({ type: String })
  	name: string;

  @Field()
  @prop({ required: true, default: Date.now })
  	createdAt: Date;

  @Field()
  @prop({ required: true, default: Date.now })
  	updatedAt: Date;
}

export const PageModel = getModelForClass(Page);