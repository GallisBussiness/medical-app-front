import Api from "./Api";

export const createEtudiant = (data) => Api.post('/etudiant', data).then(res => res.data);
export const getEtudiants = () => Api.get('/etudiant').then(res => res.data);
export const updateEtudiant = (id,data) => Api.patch('/etudiant/' + id, data).then(res => res.data);
export const removeEtudiant = (id) => Api.delete('/etudiant/'+id).then(res => res.data);