import Api from "./Api";

export const createDepartement = (data) => Api.post('/departement', data).then(res => res.data);
export const getDepartements = () => Api.get('/departement').then(res => res.data);
export const updateDepartement = (id,data) => Api.patch('/departement/' + id, data).then(res => res.data);
export const removeDepartement = (id) => Api.delete('/departement/'+id).then(res => res.data);