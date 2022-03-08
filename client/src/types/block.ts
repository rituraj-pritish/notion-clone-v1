import { User } from './users';

export interface RichTextObject {
  text: string
  styles: {
    offset: number
    length: number
    style: string
  }[]
}

export interface Block {
  id: string
  order: number
  object: RichTextObject
  type: 'TEXT'
  parent: {
    type: 'DATABASE' | 'PAGE'
    id: string
  }
  created: {
		user: User
		time: string
	}
	lastEdited: {
		user: User
		time: string
	}
}