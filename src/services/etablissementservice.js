import Api from "./Api";

export const createEtablissement = (data) => Api.post('/etablissement', data).then(res => res.data);
export const getEtablissements = () => Api.get('/etablissement').then(res => res.data);
export const updateEtablissement = (id,data) => Api.patch('/etablissement/' + id, data).then(res => res.data);
export const removeEtablissement = (id) => Api.delete('/etablissement/'+id).then(res => res.data);