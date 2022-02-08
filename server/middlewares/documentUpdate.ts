import { MiddlewareFn } from 'type-graphql'
// import { UpdateModel } from '../models/update.model'

const DocumentUpdate: MiddlewareFn = async (_, next) => {
	// const { updateDetails, result } = await next()
	const { result } = await next()

	// UpdateModel.create(updateDetails)

	return result
}

export default DocumentUpdate
