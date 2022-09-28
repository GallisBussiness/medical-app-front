import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import {Calendar} from 'primereact/calendar'
import { parseISO } from 'date-fns'
import { Chips } from 'primereact/chips';
import { Dropdown } from 'primereact/dropdown';
import { getEtablissements } from '../../services/etablissementservice';
import { useQuery } from 'react-query';

const schema = yup.object({
    date: yup.string()
    .required(),
    examensDemandes: yup.array(),
    service: yup.string(),
    etablissement: yup.string(),
    user: yup.string().required(),
    etudiant: yup.string()
    .required(),
  }).required();



function UpdateBulletinModal({ isOpen, onResolve, onReject,idEtudiant,idAuth,bulletin }) {
    const defaultValues = {
        date: bulletin?.date,
        examensDemandes: bulletin?.examensDemandes?.split(',') ?? [],
        service: bulletin?.service,
        etablissement: bulletin?.etablissement?._id,
        user: idAuth,
        etudiant: idEtudiant,
      };
        const {control, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(schema),
          defaultValues
        });
  
        const qk = ['get_Etablissements']

        const {data: Etablissements} = useQuery(qk, () => getEtablissements());
      
        const getFormErrorMessage = (name) => {
          return errors[name] && <small className="p-error">{errors[name].message}</small>
      };
       
      const onUpdate = data => {
        const {examensDemandes} = data;
          onResolve({...data, examensDemandes: examensDemandes.join(',')});
        };
  return (
    <>
          <Dialog header="Creer un Bulletin" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onUpdate)} method="POST">
    
    <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="date" className="form-label">Date</label>
            <Controller control={control} name="date" render={({field}) => (
            <Calendar id="date" value={parseISO(field.value)} onChange={(e) => field.onChange(e.value.toISOString())} showTime showSeconds minDate={new Date()} dateFormat="dd/mm/yyyy"  placeholder="Date"/>
             )}/>
              {getFormErrorMessage('date')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="examensDemandes" className="form-label">Examens Demandés : </label>
              <Controller control={control} name="examensDemandes" render={({field}) => (
                 <Chips value={field.value} onChange={(e) => field.onChange(e.value)} separator="," />   
              )} />
              {getFormErrorMessage('examensDemandes')} 
            </div>
            <div className="mb-3">
            <label htmlFor="etablissement" className="form-label">Etablissement</label>
            <Controller control={control} name="etablissement" render={({field}) => (
             <Dropdown className="w-full" optionLabel="nom" optionValue="_id" value={field.value} options={Etablissements} onChange={(e) => field.onChange(e.value)} placeholder="Selectionnez l'établissement"/>
             )}/>
              {getFormErrorMessage('etablissement')} 
            </div>
            <div className="mb-3">
            <label htmlFor="service" className="form-label">Service </label>
            <Controller control={control} name="service" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="poids" placeholder="Entrer le service" />
             )}/>
              {getFormErrorMessage('service')} 
            </div>
            <div className="flex items-center justify-between">
              <div>
              <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> MODIFIER</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
              </div>
             
            </div>
            
          </form>
          
  </Dialog>
    </>
  )
}

export default create(UpdateBulletinModal)