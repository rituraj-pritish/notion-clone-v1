import { BlockResolver } from './block/block.resolver'
import { PageResolver } from './page/page.resolver'
import { UsersResolver } from './user/user.resolver'
import { WorkspaceResolver } from './workspace/workspace.resolver'

const resolvers = [
	PageResolver,
	UsersResolver,
	WorkspaceResolver,
	BlockResolver
] as const

export default resolvers
