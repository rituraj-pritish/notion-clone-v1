import React from 'react';
import { createState, useState } from '@hookstate/core';

import { User } from 'types/users';
import checkToken, { getUserDetails } from 'helpers/checkToken';

interface State {
	isLoading: boolean
	isAuthenticated: boolean
	user: null | User
}

const AUTH_STATE = createState<State>({
	isLoading: true,
	isAuthenticated: false,
	user: null
});

export default () => {
	const authState = useState(AUTH_STATE);

	const checkIfAuthenticated = () => {
		const isLoggedIn = checkToken();
		const user = isLoggedIn ? getUserDetails() : null;

		authState.set({
			isAuthenticated: !!isLoggedIn,
			isLoading: false,
			user
		});
	};
  
	return React.useMemo(() => ({
		checkToken: checkIfAuthenticated,
		...authState.get()
	}), [authState]);
};