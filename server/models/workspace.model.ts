import { getModelForClass, plugin, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { Page } from './page.model';
import autoPopulate from 'mongoose-autopopulate';

@plugin(autoPopulate as any)
@ObjectType()
export class Workspace {
  @Field(() => ID)
  	id: string;

  @Field(() => [Page])
  @prop({ type: [Page], autopopulate: true, ref: Page })
  	pages: Page[];
}

export const WorkspaceModel = getModelForClass(Workspace);