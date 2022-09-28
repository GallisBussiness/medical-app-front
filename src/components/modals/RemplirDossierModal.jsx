import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import {Chips} from 'primereact/chips'

import { create } from 'react-modal-promise'

const schema = yup.object({
    groupe_sanguin: yup.string(),
    poids: yup.string(),
    handicap_particulier: yup.array(),
    maladie_chronique: yup.array(),
    allergies: yup.array(),
    antecedant_medicaux: yup.array(),
  }).required();

function RemplirDossierModal({ isOpen, onResolve, onReject,dossier }) {

    const defaultValues = {groupe_sanguin: dossier?.groupe_sanguin ?? '',  poids: dossier?.poids ?? '',handicap_particulier: dossier?.handicap_particulier ?? '',
        maladie_chronique: dossier?.maladie_chronique ?? '',allergies: dossier?.allergies ?? '',antecedant_medicaux: dossier?.antecedant_medicaux ?? ''
    };
    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      defaultValues
    });

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onCreate = data => {
        const {poids} = data;
        onResolve({...data, poids: +poids});
      };


  return (
    <>
         <Dialog header="Création du Dossier" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
            <div className="mb-3">
            <label htmlFor="groupe_sanguin" className="form-label">Groupe Sanguin</label>
            <Controller control={control} name="groupe_sanguin" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full
             appearance-none rounded-lg border border-solid border-green-300 bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 
             outline-none transition-all placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="groupe_sanguin" placeholder="Entrer le groupe_sanguin" autoFocus />
             )}/>
              {getFormErrorMessage('groupe_sanguin')} 
            </div>
          
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="poids" className="form-label">Poids</label>
              <Controller control={control} name="poids" render={({field}) => (
                    <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
                    ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
                     bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
                      placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="poids" placeholder="Entrer le poids" />
              )} />
              {getFormErrorMessage('poids')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="handicap_particulier" className="form-label">Handicaps particuliers : </label>
              <Controller control={control} name="handicap_particulier" render={({field}) => (
                 <Chips value={field.value} onChange={(e) => field.onChange(e.value)} separator="," />   
              )} />
              {getFormErrorMessage('handicap_particulier')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="maladie_chronique" className="form-label">Maladies Chroniques : </label>
              <Controller control={control} name="maladie_chronique" render={({field}) => (
                 <Chips value={field.value} onChange={(e) => field.onChange(e.value)} separator="," />   
              )} />
              {getFormErrorMessage('maladie_chronique')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="allergies" className="form-label">Allergies : </label>
              <Controller control={control} name="allergies" render={({field}) => (
                 <Chips value={field.value} onChange={(e) => field.onChange(e.value)} separator="," />   
              )} />
              {getFormErrorMessage('allergies')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="antecedant_medicaux" className="form-label">Antécédants Médicaux : </label>
              <Controller control={control} name="antecedant_medicaux" render={({field}) => (
                 <Chips value={field.value} onChange={(e) => field.onChange(e.value)} separator=","/>   
              )} />
              {getFormErrorMessage('antecedant_medicaux')} 
            </div>
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> CREER</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(RemplirDossierModal)