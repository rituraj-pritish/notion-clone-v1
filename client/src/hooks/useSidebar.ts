import React, { useEffect } from 'react';
import { createState, useState } from '@hookstate/core';

const WIDTH_KEY = 'sidebar-width';

interface State {
	isCollapsed: boolean,
	width: number
}

const INITIAL_STATE = {
	isCollapsed: false,
	width: 200
};

const COLLAPSED_STATE = createState<State>(INITIAL_STATE);

export default () => {
	const sidebarState = useState(COLLAPSED_STATE);

	useEffect(() => {
		const width = localStorage.getItem(WIDTH_KEY);
		if(width) setWidth(Number(width));
		// eslint-disable-next-line
	}, []);

	const toggleCollapsed = () => sidebarState.set(state => ({
		...state,
		isCollapsed: !state.isCollapsed
	}));

	const setWidth = (newWidth: number) => {
		localStorage.setItem(WIDTH_KEY, newWidth.toString());

		sidebarState.set(state => ({
			...state,
			width: newWidth
		}));
	};

	return React.useMemo(() => ({
		...sidebarState.get(),
		toggleCollapsed,
		setWidth
	// eslint-disable-next-line
	}), [sidebarState]);
};