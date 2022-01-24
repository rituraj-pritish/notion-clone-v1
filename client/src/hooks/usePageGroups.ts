import { createState, useState } from '@hookstate/core'

import { GroupName } from '@/modules/sidebar/SidebarPageGroup/SidebarPageGroup'

interface State {
	[key: string]: boolean
}

const INITIAL_STATE = {
	private: false,
	shared: false,
	favorites: false
}

const GROUP_STATE = createState<State>(INITIAL_STATE)

export default (name?: GroupName) => {
	const groupState = useState(GROUP_STATE)
	const key = name?.toLowerCase()

	const toggleCollapsed = (groupName?: 'private' | 'shared' | 'favorites') => {
		const name = key || groupName
		if (!name) throw new Error('group key must be provided')

		groupState.set((prevState) => ({
			...prevState,
			[name]: !prevState[name]
		}))
	}

	const expandGroup = (groupName: 'private' | 'shared' | 'favorites') => {
		if (!key && !groupName) throw new Error('group key must be provided')

		groupState.set((prevState) => ({
			...prevState,
			[key || groupName]: false
		}))
	}

	const isCollapsed = key ? groupState.get()[key] : undefined

	return {
		toggleCollapsed,
		isCollapsed,
		expandGroup,
		...groupState.get()
	}
}
