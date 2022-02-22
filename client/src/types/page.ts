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
	parent: {
		type: 'WORKSPACE' | 'PAGE'
		id: string
	}
	icon?: File | Emoji | null
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

export interface Ancestry {
	id: Page['id']
	title: Page['properties']['title']
	icon: Page['icon']
}