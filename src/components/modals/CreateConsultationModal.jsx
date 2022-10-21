import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import {Calendar} from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown';
import RemplirTraitementModal from './RemplirTraitementModal';
import { parseISO } from 'date-fns'

const schema = yup.object({
    dateDeConsultation: yup.string()
    .required(),
    poids: yup.string(),
    tension: yup.string(),
    temperature: yup.string(),
    poule: yup.string(),
    glycemie: yup.string(),
    corps_cetonique: yup.string(),
    autres: yup.string(),
    bilan: yup.string(),
    prochain_rv: yup.string(),
    references: yup.string(),
    plainte_du_jour: yup.string(),
    type: yup.string(),
    user: yup.string().required(),
    etudiant: yup.string()
    .required(),
    traitement: yup.array()
  }).required();

function CreateConsultationModal({ isOpen, onResolve, onReject,idEtudiant,idAuth }) {

    const defaultValues = {
      dateDeConsultation: new Date().toISOString(),
      poids: '',
      tension: '',
      temperature: '',
      poule: '',
      glycemie: '',
      corps_cetonique: '',
      autres: '',
      bilan: '',
      prochain_rv: new Date().toISOString(),
      reference: '',
      plainte_du_jour: '',
      type: 'generale',
      user: idAuth,
      etudiant: idEtudiant,
      traitement: []
    };
      const {control, handleSubmit,setValue,getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues
      });

    
      const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const ConsultationOptions = [
      {name: 'Generale', value: 'generale'},
      {name: 'Dentaire', value: 'dentaire'}
  ];
     
    const onCreate = data => {
        const {poids} = data;
        onResolve({...data, poids: +poids});
      };

      const remplirTraitement = () => {
        RemplirTraitementModal({traitement: getValues().traitement}).then((d => {
            setValue('traitement',d);
        }));
    }


  return (
    <>
        <Dialog header="Creer une Consultation" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3 flex flex-col space-y-2">
            <label className="form-label">Type de Consultation</label>
            <Controller control={control} name="type" render={({field}) => (
            <Dropdown value={field.value} options={ConsultationOptions} onChange={field.onChange} optionLabel="name" placeholder="Selectionez le type de consultation" />
             )}/>
              {getFormErrorMessage('type')} 
            </div>
    <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="dateDeConsultation" className="form-label">Date De Consultation </label>
            <Controller control={control} name="dateDeConsultation" render={({field}) => (
            <Calendar id="dateDeConsultation" value={parseISO(field.value)} onChange={(e) => field.onChange(e.value.toISOString())} showTime showSeconds minDate={new Date()} dateFormat="dd/mm/yyyy"  placeholder="Date De Consultation"/>
             )}/>
              {getFormErrorMessage('dateDeConsultation')} 
            </div>
            <div className="mb-3">
            <label htmlFor="poids" className="form-label">Poids </label>
            <Controller control={control} name="poids" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="poids" placeholder="Entrer le poids" />
             )}/>
              {getFormErrorMessage('poids')} 
            </div>
            <div className="mb-3">
            <label htmlFor="tension" className="form-label">Tension </label>
            <Controller control={control} name="tension" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="tension" placeholder="Tension" />
             )}/>
              {getFormErrorMessage('tension')} 
            </div>
            <div className="mb-3">
            <label htmlFor="temperature" className="form-label">Temperature </label>
            <Controller control={control} name="temperature" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="temperature" placeholder="Entrer la Température" />
             )}/>
              {getFormErrorMessage('temperature')} 
            </div>
            <div className="mb-3">
            <label htmlFor="poule" className="form-label">Pouls </label>
            <Controller control={control} name="poule" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="poule" placeholder="Poule" />
             )}/>
              {getFormErrorMessage('poule')} 
            </div>
            <div className="mb-3">
            <label htmlFor="glycemie" className="form-label">Glycemie </label>
            <Controller control={control} name="glycemie" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="glycemie" placeholder="Glycemie" />
             )}/>
              {getFormErrorMessage('glycemie')} 
            </div>
            <div className="mb-3">
            <label htmlFor="corps_cetonique" className="form-label">Corps Cetonique </label>
            <Controller control={control} name="corps_cetonique" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="corps_cetonique" placeholder="Corps Cetonique" />
             )}/>
              {getFormErrorMessage('corps_cetonique')} 
            </div>
            <div className="mb-3">
            <label htmlFor="autres" className="form-label">Autres </label>
            <Controller control={control} name="autres" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="autres" placeholder="Autres" />
             )}/>
              {getFormErrorMessage('autres')} 
            </div>
            <div className="mb-3">
            <label htmlFor="bilan" className="form-label">Bilan </label>
            <Controller control={control} name="bilan" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="bilan" placeholder="Bilan" />
             )}/>
              {getFormErrorMessage('bilan')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="prochain_rv" className="form-label">Prochain rendez-vous </label>
            <Controller control={control} name="prochain_rv" render={({field}) => (
            <Calendar id="prochain_rv"  value={parseISO(field.value)} onChange={(e) => field.onChange(e.value.toISOString())} showTime showSeconds minDate={new Date()} dateFormat="dd/mm/yyyy"  placeholder="Prochain rendez-vous"/>
             )}/>
              {getFormErrorMessage('prochain_rv')} 
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <h1 className="font-semibold text-3xl">Traitement</h1>
            <button type="button" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2" onClick={remplirTraitement}> AJOUTER TRAITEMENTS</button>
            </div>
            <div className="mb-3">
            <label htmlFor="reference" className="form-label">Reference </label>
            <Controller control={control} name="reference" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="reference" placeholder="References" />
             )}/>
              {getFormErrorMessage('reference')} 
            </div>
            <div className="mb-3">
            <label htmlFor="painte_du_jour" className="form-label">Plainte Du Jour </label>
            <Controller control={control} name="plainte_du_jour" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="plainte_du_jour" placeholder="Plainte_du_jour" />
             )}/>
              {getFormErrorMessage('plainte_du_jour')} 
            </div>
            <div className="flex items-center justify-between">
              <div>
              <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> CREER</button>
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

export default create(CreateConsultationModal)