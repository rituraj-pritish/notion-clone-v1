import React from 'react';
import { createState, useState } from '@hookstate/core';
import checkToken from 'helpers/checkToken';

const AUTH_STATE = createState({
	isLoading: true,
	isAuthenticated: false
});

export default () => {
	const authState = useState(AUTH_STATE);

	const checkIfAuthenticated = () => {
		const isLoggedIn = checkToken();
		authState.set({
			isAuthenticated: isLoggedIn,
			isLoading: false
		});
	};
  
	return React.useMemo(() => ({
		checkToken: checkIfAuthenticated,
		...authState.get()
	}), [authState]);
};