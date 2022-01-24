import { Response } from 'express'

interface Context {
	user: string
	workspace: string
	res: Response
}

export default Context
