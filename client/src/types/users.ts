export interface User {
	id: string
	name: string
	email: string
}

export interface SignInResponse extends User {
	token: string
	name: string
	currentWorkspace: string
}

export interface SignInInput {
	email: string
	password: string
}
