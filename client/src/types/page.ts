export interface Hierarchy {
	root: string
	parent: string
	children: string[]
}

export interface Page {
	id: string
	name: string
	icon?: string
	hierarchy: Hierarchy
	favorite: boolean
}