import Api from './Api';

export const register = (data) => Api.post('/user', data).then(res => res.data.data);

export const login = (data) => Api.post('/user/login', data).then(res => res.data.data);

export const getAuth = (id) => Api.get('/user/' + id).then(res => res.data);