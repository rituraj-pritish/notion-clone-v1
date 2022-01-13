import { Field, ID, InputType } from 'type-graphql';
import { Page } from '../../models/page.model';

@InputType()
class HierarchyInput {
	@Field(() => ID, { nullable: true })
		parent: string;

	@Field(() => ID, { nullable: true })
		root: string;
	
	@Field(() => [ID], { nullable: true })
		children: string[];
}

@InputType()
export class CreatePageInput implements Partial<Page> {
	@Field()
		name: string;

	@Field({ nullable: true })
		icon: string;

	@Field(() => HierarchyInput, { nullable: true })
		hierarchy: HierarchyInput;
}

@InputType()
export class UpdatePageInput implements Partial<Page> {
  @Field(() => ID)
  	id: string;

	@Field({ nullable: true })
		name: string;
    
  @Field({ nullable: true })
  	icon: string;

  @Field(() => ID, { nullable: true })
  	parent: string;

  @Field(() => [ID], { nullable: true })
  	children: string[];
}