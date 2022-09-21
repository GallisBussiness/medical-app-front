import Api from "./Api";

export const createConsultation = (data) => Api.post('/consultation', data).then(res => res.data);
export const getConsultations = () => Api.get('/consultation').then(res => res.data);
export const updateConsultation = (id,data) => Api.patch('/consultation/' + id, data).then(res => res.data);
export const removeConsultation = (id) => Api.delete('/consultation/'+id).then(res => res.data);