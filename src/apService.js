import { BASE_URL } from './constants';

export function getAppData(params) {
	return fetch(`${BASE_URL}${params}`);
}