import AUTH_TOKEN from 'enums/authToken';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';
import { User } from 'types/users';

interface Payload extends JwtPayload {
  id: string
	name: string
	email: string
  exp: number
}

export default () => {
	const token = localStorage.getItem(AUTH_TOKEN) || '';
	if(!token) return false;

	try {
		const {
			exp
		} = jwtDecode<Payload>(token);
		const hasTokenExpired = moment.unix(exp).isBefore(moment());

		if(hasTokenExpired) {
			localStorage.removeItem(AUTH_TOKEN);
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
};

export const getUserDetails = (): User => {
	const token = localStorage.getItem(AUTH_TOKEN) || '';
	const {
		id,
		email,
		name
	} = jwtDecode<Payload>(token);

	return {
		id,
		email,
		name
	};
};