import Api from "./Api";

export const createDoc = (data) => Api.post('/doc', data).then(res => res.data);
export const getDocById  = (id) => Api.get('/doc/'+ id).then(res => res.data);
export const getDocByDossier  = (id) => Api.get('/doc/bydossier/'+ id).then(res => res.data);
export const getDocs = () => Api.get('/Doc').then(res => res.data);
export const updateDoc = (id,data) => Api.patch('/doc/' + id, data).then(res => res.data);
export const removeDoc = (id) => Api.delete('/doc/'+id).then(res => res.data);