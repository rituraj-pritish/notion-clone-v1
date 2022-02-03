import { Schema } from 'mongoose'
import { Field, ID, InputType } from 'type-graphql'
import { Page } from '../../models/page.model'

@InputType()
class PropertiesInput {
	@Field()
	title: string
}

@InputType()
class HierarchyInput {
	@Field(() => ID, { nullable: true })
	parent: string

	@Field(() => ID, { nullable: true })
	root: string

	@Field(() => [ID], { nullable: true })
	children: string[]

	@Field({ nullable: true })
	index: number
}

@InputType()
class ParentInput {
	@Field()
	type: string

	@Field()
	id: string
}

@InputType()
class IconInput {
	@Field()
	type: string

	@Field()
	url: string

	@Field()
	emoji: string
}

@InputType()
export class CreatePageInput implements Partial<Page> {
	@Field(() => PropertiesInput, { nullable: true })
	properties: PropertiesInput

	@Field(() => IconInput, { nullable: true })
	icon: Schema.Types.Mixed

	@Field(() => ParentInput)
	parent: ParentInput

	@Field(() => HierarchyInput, { nullable: true })
	hierarchy: HierarchyInput
}

@InputType()
export class UpdatePageInput implements Partial<Page> {
	@Field(() => ID)
	id: string

	@Field(() => PropertiesInput, { nullable: true })
	properties: PropertiesInput

	@Field(() => IconInput, { nullable: true })
	icon: Schema.Types.Mixed

	@Field(() => ParentInput, { nullable: true })
	parent: ParentInput

	@Field(() => HierarchyInput, { nullable: true })
	hierarchy: HierarchyInput

	@Field({ nullable: true })
	favorite: boolean
}
