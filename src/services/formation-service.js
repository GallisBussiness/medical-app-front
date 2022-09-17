import Api from "./Api";

export const createFormation = (data) => Api.post('/formation', data).then(res => res.data);
export const getFormations = () => Api.get('/formation').then(res => res.data);
export const updateFormation = (id,data) => Api.patch('/formation/' + id, data).then(res => res.data);
export const removeFormation = (id) => Api.delete('/formation/'+id).then(res => res.data);