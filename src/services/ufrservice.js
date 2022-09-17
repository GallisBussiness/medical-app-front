import Api from "./Api";

export const createUfr = (data) => Api.post('/ufr', data).then(res => res.data);
export const getUfrs = () => Api.get('/ufr').then(res => res.data);
export const updateUfr = (id,data) => Api.patch('/ufr/' + id, data).then(res => res.data);
export const removeUfr = (id) => Api.delete('/ufr/'+id).then(res => res.data);