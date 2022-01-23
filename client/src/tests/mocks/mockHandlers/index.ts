import authHandlers from './auth.handlers'
import pageHandlers from './page.handlers'
import workspaceHandlers from './workspace.handlers'

export default [...authHandlers, ...pageHandlers, ...workspaceHandlers]
