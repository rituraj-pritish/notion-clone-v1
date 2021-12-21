import AUTH_TOKEN from 'enums/authToken';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

interface Payload extends JwtPayload {
  id: string
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
		console.log('cal');
		return true;
	} catch (error) {
		return false;
	}
};