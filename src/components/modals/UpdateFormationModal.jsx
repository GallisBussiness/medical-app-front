import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise'
import { useQuery } from 'react-query';
import { getDepartements } from '../../services/departementservice';
import { Dropdown } from 'primereact/dropdown';
import { getNiveaux } from '../../services/niveauservice';

const schema = yup.object({
    departement: yup.string()
    .required(),
   niveau: yup.string().required()
  }).required();


function UpdateFormationModal({ isOpen, onResolve, onReject,formation }) {

    const defaultValues = {departement: formation?.departement._id,  niveau: formation?.niveau._id};
    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      defaultValues
    });

    const qk = ['get_Departements']

    const {data: Departements } = useQuery(qk, () => getDepartements());

    const qkn = ['get_Niveaux']

    const {data: Niveaux } = useQuery(qkn, () => getNiveaux());

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onUpdate = data => {
        onResolve({_id:formation._id,...data});
      };

  return (
    <>
          <Dialog header="Creer un Formation" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onUpdate)} method="POST">
            <div className="mb-3">
            <label htmlFor="departement" className="form-label">Departement</label>
            <Controller control={control} name="departement" render={({field}) => (
             <Dropdown className="w-full" optionLabel="nom" optionValue="_id" value={field.value} options={Departements} onChange={(e) => field.onChange(e.value)} placeholder="Selectionnez le département"/>
             )}/>
              {getFormErrorMessage('departement')} 
            </div>
          
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="niveau" className="form-label">Niveau</label>
              <Controller control={control} name="niveau" render={({field}) => (
                  <Dropdown className="w-full" optionLabel="nom" optionValue="_id" value={field.value} options={Niveaux} onChange={(e) => field.onChange(e.value)} placeholder="Selectionnez le niveau"/>
              )} />
              {getFormErrorMessage('niveau')} 
            </div>
            
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> Mettre à jour</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateFormationModal)