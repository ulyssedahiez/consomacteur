import axios from 'axios';
import { accountService } from './account.service';
import { config } from '../../local-config.js';

// Paramétrage de base d'axios
const Axios = axios.create({
	baseURL: `${config.API_HOST}:${config.API_PORT}`,

});

Axios.interceptors.request.use(request => {
	if (accountService.isLogged()) {
		request.headers.Authorization = accountService.getToken();
	}
	return request;
});

export default Axios;
