import { User } from './users';

export interface Block {
  id: string
  index: number
  object: object
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