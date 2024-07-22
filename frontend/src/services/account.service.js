import Axios from './caller.service';

let login = credentials => {
	return Axios.post('/auth/login', credentials);
};

let register = credentials => {
	return Axios.post('/auth/register', credentials);
};

let getProfile = () => {
	return Axios.get('/user/profile');
}

let saveToken = token => {
	localStorage.setItem('token', token);
};

let logout = () => {
	localStorage.removeItem('token');
};

let isLogged = () => {
	let token = localStorage.getItem('token');
	return !!token;
};

let getToken = () => {
	return localStorage.getItem('token');
};

export const accountService = {
	login,
	register,
	getProfile,
	saveToken,
	logout,
	isLogged,
	getToken,
	
};
