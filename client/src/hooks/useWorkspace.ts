import { createState, useState } from '@hookstate/core'
import React from 'react'

interface State {
	workspace: null | string
}

const WORKSPACE_STATE = createState<State>({
	workspace: null
})

export default () => {
	const workspaceState = useState(WORKSPACE_STATE)

	const setWorkspace = (workspaceId: string) => {
		workspaceState.set({
			workspace: workspaceId
		})
	}
  
	return React.useMemo(
		() => ({
			workspace: workspaceState.get().workspace,
			setWorkspace
		}),
		// eslint-disable-next-line
		[workspaceState]
	)
}
