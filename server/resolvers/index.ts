import { PageResolver } from './page/page.resolver'
import { UsersResolver } from './user/user.resolver'
import { WorkspaceResolver } from './workspace/workspace.resolver'

const resolvers = [
	PageResolver,
	UsersResolver,
	WorkspaceResolver
] as const

export default resolvers
