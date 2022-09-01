import Api from "./Api";

export const createUser = (data) => Api.post('/user', data).then(res => res.data);
export const getUsers = () => Api.get('/user').then(res => res.data);
export const updateUser = (id,data) => Api.patch('/user/' + id, data).then(res => res.data);
export const removeUser = (id) => Api.delete('/user/'+id).then(res => res.data);