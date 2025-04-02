import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8081', // Usa la variable de entorno o localhost como fallback
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default instance;
