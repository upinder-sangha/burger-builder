import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-burger-builder-dd799.firebaseio.com/'
});

export default instance;