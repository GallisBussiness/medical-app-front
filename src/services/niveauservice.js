import Api from "./Api";

export const createNiveau = (data) => Api.post('/niveau', data).then(res => res.data);
export const getNiveaux = () => Api.get('/niveau').then(res => res.data);
export const updateNiveau = (id,data) => Api.patch('/niveau/' + id, data).then(res => res.data);
export const removeNiveau = (id) => Api.delete('/niveau/'+id).then(res => res.data);