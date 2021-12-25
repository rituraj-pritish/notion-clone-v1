import { Field, InputType } from 'type-graphql';
import { Page } from '../../models/page.model';

@InputType()
export class CreatePageInput implements Partial<Page> {
  @Field()
  	name: string;
  
  @Field()
  	icon?: string;
}