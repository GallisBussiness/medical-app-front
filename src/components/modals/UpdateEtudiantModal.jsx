import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise'
import Select from 'react-select'
import { SelectButton } from 'primereact/selectbutton';
import {InputMask} from 'primereact/inputmask'
import { useQuery } from 'react-query';
import { getFormations } from '../../services/formation-service';
import { useState } from 'react';
import RemplirDossierModal from './RemplirDossierModal';

const schema = yup.object({
    prenom: yup.string()
    .required(),
    nom: yup.string()
    .required(),
    nce: yup.string()
    .required(),
    sexe: yup.string()
    .required(),
    dateDeNaissance: yup.string()
    .required(),
    lieuDeNaissance: yup.string()
    .required(),
    adresse: yup.string()
    .required(),
    telephone: yup.string()
    .required(),
    formation: yup.object()
    .required(),
    dossier: yup.object()
  }).required();


function UpdateEtudiantModal({ isOpen, onResolve, onReject,etudiant }) {
  const [formations,setFormations] = useState([])
    const defaultValues = {nce: etudiant.nce, nom: etudiant.nom, prenom: etudiant.prenom,sexe: etudiant.sexe,dateDeNaissance: etudiant.dateDeNaissance,
      lieuDeNaissance: etudiant.lieuDeNaissance,adresse: etudiant.adresse,telephone: etudiant.telephone,formation: null,
       dossier: {
        groupe_sanguin: etudiant?.dossier?.groupe_sanguin ?? '',  poids: etudiant?.dossier?.poids ?? '',handicap_particulier: etudiant?.dossier?.handicap_particulier?.split(',') ?? [],
        maladie_chronique: etudiant?.dossier?.maladie_chronique?.split(',') ?? [],allergies: etudiant?.dossier?.allergies?.split((',')) ?? [],
        antecedant_medicaux: etudiant?.dossier?.antecedant_medicaux?.split(',') ?? []
      }};
      const {control, handleSubmit,getValues,setValue, formState: { errors } } = useForm({
          resolver: yupResolver(schema),
        defaultValues
      });

      const qk = ['get_Formations']

   useQuery(qk, () => getFormations(), {
    onSuccess:(_) => {
      const newObj = _.map(f => ({value: f._id, label: `${f.niveau.nom} ${f.departement.nom}`}));
      const curf = newObj.find(f => {
       return f.value === etudiant.formation._id
      }
        )
      setValue('formation',curf);
      setFormations(newObj);
    }
   });

      const sexeOptions = [
        {name: 'Homme', value: 'M'},
        {name: 'Femme', value: 'F'}
    ];
      const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

     
    const onCreate = data => {
        const {dossier} = data;
        onResolve({_id:etudiant._id,...data,formation: data.formation.value, dossier: {
          groupe_sanguin: dossier?.groupe_sanguin ?? '',  poids: dossier?.poids ?? '',handicap_particulier: dossier?.handicap_particulier?.join(',') ?? '',
        maladie_chronique: dossier?.maladie_chronique?.join(',') ?? '',allergies: dossier?.allergies?.join(',') ?? '',antecedant_medicaux: dossier?.antecedant_medicaux?.join(',') ?? ''
        }});
      };

      const remplirDossier = () => {
        RemplirDossierModal({dossier: getValues().dossier}).then((d => {
            setValue('dossier',d);
        }));
    }
  return (
    <>
        <Dialog header="Modifier un Etudiant" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
        <div className="flex items-center justify-end my-5">
              <button className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2" onClick={remplirDossier}> MODIFIER SON DOSSIER</button>
              </div>
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3">
            <label htmlFor="nce" className="form-label">Numéro carte Etudiant </label>
            <Controller control={control} name="nce" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="nce" placeholder="Entrer le numéro carte étudiant" />
             )}/>
              {getFormErrorMessage('nce')} 
            </div>
            <div className="mb-3">
            <label htmlFor="prenom" className="form-label">Prenom</label>
            <Controller control={control} name="prenom" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="prenom" placeholder="Entrer le prenom" />
             )}/>
              {getFormErrorMessage('prenom')} 
            </div>
            <div className="mb-3">
            <label htmlFor="nom" className="form-label">Nom</label>
            <Controller control={control} name="nom" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300 bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="nom" placeholder="Entrer le nom" autoFocus />
             )}/>
              {getFormErrorMessage('nom')} 
            </div>
            <div className="mb-3">
            <label htmlFor="sexe" className="form-label">Sexe</label>
            <Controller control={control} name="sexe" render={({field}) => (
            <SelectButton value={field.value} optionLabel="name" options={sexeOptions} onChange={(e) => field.onChange(e.value)} />
             )}/>
              {getFormErrorMessage('sexe')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="dateDeNaissance" className="form-label">Date de Naissance</label>
            <Controller control={control} name="dateDeNaissance" render={({field}) => (
            <InputMask id="dateDeNaissance" mask="99/99/9999" value={field.value} placeholder="99/99/9999" slotChar="mm/dd/yyyy" onChange={(e) => field.onChange(e.value)}></InputMask>
             )}/>
              {getFormErrorMessage('dateDeNaissance')} 
            </div>
            <div className="mb-3">
            <label htmlFor="lieuDeNaissance" className="form-label">Lieu de Naissance</label>
            <Controller control={control} name="lieuDeNaissance" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="lieuDeNaissance" placeholder="Entrer le lieu de Naissance" />
             )}/>
              {getFormErrorMessage('lieuDeNaissance')} 
            </div>
            <div className="mb-3">
            <label htmlFor="adresse" className="form-label">Adresse</label>
            <Controller control={control} name="adresse" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="adresse" placeholder="Entrer votre adresse" />
             )}/>
              {getFormErrorMessage('adresse')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="telephone" className="form-label">Numéro de téléphone</label>
            <Controller control={control} name="telephone" render={({field}) => (
            <InputMask id="telephone" mask="(+221) 99-999-99-99" value={field.value} onChange={(e) => field.onChange(e.value)}></InputMask>
             )}/>
              {getFormErrorMessage('telephone')} 
            </div>
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="formation" className="form-label">Formation</label>
              <Controller control={control} name="formation" render={({field}) => (
                    <Select
                    {...field}
                    options={formations}
                  />
              )} />
              {getFormErrorMessage('formation')} 
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

export default create(UpdateEtudiantModal)