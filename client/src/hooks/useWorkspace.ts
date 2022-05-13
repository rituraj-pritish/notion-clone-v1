import { createState, useState } from '@hookstate/core'
import jwtDecode from 'jwt-decode'
import React, { useEffect } from 'react'

import { TokenPayload } from '@/types/tokenPayload'
import { User } from '@/types/users'

interface State {
	workspace: string
	user: User | null
}

const WORKSPACE_STATE = createState<State>({
	workspace: '',
	user: null
})

export default () => {
	const workspaceState = useState(WORKSPACE_STATE)

	const currentWorkspace = workspaceState.get().workspace

	const setWorkspace = (workspaceId: string, user: User) => {
		workspaceState.set({
			workspace: workspaceId,
			user
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
		setWorkspace(res.workspace, { id: res.user, email: res.email, name: res.name })
		//eslint-disable-next-line
	}, [])

	return React.useMemo(
		() => ({
			workspace: currentWorkspace,
			setWorkspace,
			user: workspaceState.get().user
		}),
		// eslint-disable-next-line
		[workspaceState]
	)
}
