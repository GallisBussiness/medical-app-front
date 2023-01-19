import Api from "./Api";

export const createDossier = (data) => Api.post('/dossier', data).then(res => res.data);
export const getDossierById  = (id) => Api.get('/dossier/'+ id).then(res => res.data);
export const getDossierByEtudiant  = (id) => Api.get('/dossier/byetudiant/'+ id).then(res => res.data);
export const getDossiers = () => Api.get('/dossier').then(res => res.data);
export const updateDossier = (id,data) => Api.patch('/dossier/' + id, data).then(res => res.data);
export const removeDossier = (id) => Api.delete('/dossier/'+id).then(res => res.data);