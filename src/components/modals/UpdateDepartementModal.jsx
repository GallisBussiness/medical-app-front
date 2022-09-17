import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise'
import { useQuery } from 'react-query';
import { getUfrs } from '../../services/ufrservice';
import { Dropdown } from 'primereact/dropdown';

const schema = yup.object({
    nom: yup.string()
    .required(),
    pseudo: yup.string()
    .required()
  }).required();


function UpdateDepartementModal({ isOpen, onResolve, onReject,departement }) {

    const qk = ['get_Ufrs']

    const {data: Ufrs} = useQuery(qk, () => getUfrs());

    const defaultValues = {nom: departement?.nom,  ufr: departement?.ufr._id};
    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      defaultValues
    });

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onUpdate = data => {
        onResolve({_id:departement._id,...data});
      };

  return (
    <>
    <Dialog header="Modifier un Departement" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onUpdate)} method="POST">
            <div className="mb-3">
            <label htmlFor="nom" className="form-label">Nom</label>
            <Controller control={control} name="nom" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="nom" placeholder="Entrer le nom" autoFocus />
             )}/>
              {getFormErrorMessage('nom')} 
            </div>
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="ufr" className="form-label">Ufr</label>
              <Controller control={control} name="ufr" render={({field}) => (
                     <Dropdown className="w-full" optionLabel="nom" optionValue="_id" value={field.value} options={Ufrs}   onChange={(e) => field.onChange(e.value)} placeholder="Selectionnez l'ufr"/>
              )} />
              {getFormErrorMessage('ufr')} 
            </div>
            
            <button type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2">mettre à jour</button>
    <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> Annuler</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateDepartementModal)