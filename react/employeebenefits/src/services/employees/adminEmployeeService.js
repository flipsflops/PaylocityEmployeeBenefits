import { api } from '../serviceHelpers';
import axios from 'axios';

export const getAllEmployees = async () => {
	const config = {
		method: 'GET',
		url: `${api}/employee/all`,
		crossdomain: true,
	};

	return axios(config);
};
