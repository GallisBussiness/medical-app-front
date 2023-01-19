import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import {Chips} from 'primereact/chips'

import { create } from 'react-modal-promise'
import { Button, Select, TextInput } from '@mantine/core';

const schema = yup.object({
    groupe_sanguin: yup.string(),
    poids: yup.string(),
    taille: yup.string(),
    handicap_particulier: yup.array(),
    maladie_chronique: yup.array(),
    allergies: yup.array(),
    antecedants_medicaux: yup.array(),
    etudiant: yup.string().required()
  }).required();


function UpdateDossierMedical({ isOpen, onResolve, onReject,dossier }) {
    const defaultValues = {_id: dossier?._id,etudiant: dossier?.etudiant?._id,groupe_sanguin: dossier?.groupe_sanguin,  poids: dossier?.poids,
        taille: dossier?.taille,handicap_particulier: dossier?.handicap_particulier?.split(',') == false ?  [] : [...dossier?.handicap_particulier?.split(',')],
    maladie_chronique:dossier?.maladie_chronique?.split(',') == false ?  [] : [...dossier?.maladie_chronique?.split(',')],
    allergies:dossier?.allergies?.split(',') == false ?  [] : [...dossier?.allergies?.split(',')],
    antecedants_medicaux: dossier?.antecedants_medicaux?.split(',') == false ?  [] : [...dossier?.antecedants_medicaux?.split(',')]
};
const {control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  defaultValues
});

const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};

const onCreate = data => {
   const {handicap_particulier,maladie_chronique,allergies,antecedants_medicaux} = data;
   const strHandP = handicap_particulier.join(',');
   const strmc = maladie_chronique.join(',');
   const stral = allergies.join(',');
   const strantm = antecedants_medicaux.join(',');
    onResolve({...data, handicap_particulier: strHandP, maladie_chronique: strmc,allergies: stral,antecedants_medicaux: strantm});
  };

  return (
    <>
       <Dialog header="Modification du Dossier" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3">
              <Controller control={control} name="groupe_sanguin" render={({field}) => (
                    <Select
                    label="Groupe Sanguin"
                    placeholder="Selectionnez le groupe sanguin ..."
                    searchable
                    clearable
                    nothingFound="Pas de groupe sanguin disponibles"
                    data={['A+', 'A-', 'B+','B-','AB+','AB-','O+','O-','NEANT']}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.groupe_sanguin && errors.groupe_sanguin.message}
                    withAsterisk
                  />
              )} />
            </div>
            <div>
            <Controller control={control} name="poids" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Poids" error={errors.poids && errors.poids.message}
            placeholder="Poids"
             rightSection="Kg"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="taille" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Taille" error={errors.taille && errors.taille.message}
            placeholder="Taille"
             rightSection="cm"
              withAsterisk/>
             )}/>
            </div>
            <div className="mb-3 flex flex-col mt-3">
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
            <div className="mb-3 flex flex-col">
            <label htmlFor="allergies" className="form-label">Allergies : </label>
              <Controller control={control} name="allergies" render={({field}) => (
                 <Chips value={field.value} onChange={(e) => field.onChange(e.value)} separator="," />   
              )} />
              {getFormErrorMessage('allergies')} 
            </div>
            <div className="mb-3 flex flex-col">
            <label htmlFor="antecedants_medicaux" className="form-label">Antécédants Médicaux : </label>
              <Controller control={control} name="antecedants_medicaux" render={({field}) => (
                 <Chips value={field.value} onChange={(e) => field.onChange(e.value)} separator=","/>   
              )} />
              {getFormErrorMessage('antecedant_medicaux')} 
            </div>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">REMPLIR LE DOSSIER DE {dossier?.etudiant?.prenom} {dossier?.etudiant?.nom}</Button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateDossierMedical)