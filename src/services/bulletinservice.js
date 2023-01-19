import Api from "./Api";

export const createBulletin = (data) => Api.post('/bulletin', data).then(res => res.data);
export const getBulletinById  = (id) => Api.get('/bulletin/'+ id).then(res => res.data);
export const getBulletinByDossier  = (id) => Api.get('/bulletin/bydossier/'+ id).then(res => res.data);
export const getBulletins = () => Api.get('/bulletin').then(res => res.data);
export const updateBulletin = (id,data) => Api.patch('/bulletin/' + id, data).then(res => res.data);
export const removeBulletin = (id) => Api.delete('/bulletin/'+id).then(res => res.data);