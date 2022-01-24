import { AuthChecker } from 'type-graphql'
import { UserModel } from '../models/user.model'
import Context from '../types/Context'

const authChecker: AuthChecker<Context> = async ({ context }) => {
	const { user: userId, workspace: workspaceId } = context
	if (!userId || !workspaceId) return false

	const user = await UserModel.findById(userId)
	if (!user) return false

	const hasAccessToWorkspace = user.workspaces.includes(workspaceId)
	if (!hasAccessToWorkspace) return false

	return true
}

export default authChecker
