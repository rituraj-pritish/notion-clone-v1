import { createState, useState } from '@hookstate/core'
import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'

import { TokenPayload } from '@/types/tokenPayload'

interface State {
	workspace: string
}

const WORKSPACE_STATE = createState<State>({
	workspace: ''
})

export default () => {
	const workspaceState = useState(WORKSPACE_STATE)

	const currentWorkspace = workspaceState.get().workspace

	const setWorkspace = (workspaceId: string) => {
		workspaceState.set({
			workspace: workspaceId
		})
	}

	useEffect(() => {
		if (currentWorkspace) return

		const token = document.cookie
			?.split('; ')
			?.find((row) => row.startsWith('auth_token='))
			?.split('=')[1]

		if (!token) return

		const res = jwtDecode<TokenPayload>(token)
		setWorkspace(res.workspace)
		//eslint-disable-next-line
	}, [])

	return React.useMemo(
		() => ({
			workspace: currentWorkspace,
			setWorkspace
		}),
		// eslint-disable-next-line
		[workspaceState]
	)
}
