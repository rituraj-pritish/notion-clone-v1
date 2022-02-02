import { User } from './users'

type IconType = 'EMOJI' | 'FILE'

interface File {
	type: IconType
	url: string
}

interface Emoji {
	type: IconType
	emoji: string
}

export interface Page {
	id: string
	properties: {
		title: string
	}
	icon?: File | Emoji
	hierarchy: {
		root: string | null
		parent: string | null
		children: string[]
	}
	favorite: boolean
	archived: boolean
	created: {
		user: User
		time: string
	}
	lastEdited: {
		user: User
		time: string
	}
}
