import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import RemplirTraitementModal from './RemplirTraitementModal';
import { parseISO } from 'date-fns'
import { Button, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const schema = yup.object({
    dateDeConsultation: yup.string()
    .required(),
    poids: yup.string(),
    taille: yup.string(),
    tension: yup.string(),
    temperature: yup.string(),
    poule: yup.string(),
    examen: yup.string(),
    diagnostique: yup.string(),
    glycemie: yup.string(),
    corps_cetonique: yup.string(),
    autres: yup.string(),
    bilan: yup.string(),
    prochain_rv: yup.string(),
    references: yup.string(),
    plainte_du_jour: yup.string(),
    type: yup.string(),
    user: yup.string().required(),
    dossier: yup.string()
    .required(),
    traitement: yup.array()
  }).required();


function UpdateConsultationModal({ isOpen, onResolve, onReject,idDossier,idAuth,consultation }) {

  const defaultValues = {
    _id: consultation._id,
    dateDeConsultation: consultation?.dateDeConsultation,
    poids: consultation?.poids,
    taille: consultation?.taille,
    tension: consultation?.taille,
    temperature: consultation?.temperature,
    poule: consultation?.poule,
    examen: consultation?.examen,
    diagnostique: consultation?.diagnostique,
    glycemie: consultation?.glycemie,
    corps_cetonique: consultation?.corps_cetonique,
    autres: consultation?.autres,
    bilan: consultation?.bilan,
    
    prochain_rv: consultation?.prochain_rv,
    
    reference: consultation?.reference,

    plainte_du_jour: consultation?.plainte_du_jour,
    type: consultation?.type,
    user: idAuth,
    dossier: idDossier,
    traitement: consultation?.traitement
  };
    const {control, handleSubmit,setValue,getValues, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues
    });


  const ConsultationOptions = [
    {label: 'Generale', value: 'generale'},
    {label: 'Dentaire', value: 'dentaire'}
];
   
  const onCreate = data => {
      onResolve(data);
    };

    const remplirTraitement = () => {
      RemplirTraitementModal({traitement: getValues().traitement}).then((d => {
          setValue('traitement',d);
      }));
  }

  return (
    <>
         <Dialog header="Modifier la Consultation" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
         <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
          <div >
      <Controller control={control} name="type" render={({field}) => (
                    <Select
                    label="Type de consultation"
                    placeholder="Selectionnez le type de consultation ..."
                    searchable
                    clearable
                    nothingFound="Pas de types disponibles"
                    data={ConsultationOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.type && errors.type.message}
                  />
              )} />
            </div>
            <div>
            <Controller control={control} name="dateDeConsultation" render={({field}) => (
            <DatePicker placeholder="Choisir la date de consultation" label="Date de Consultation" withAsterisk locale="fr" value={parseISO(field.value)} onChange={(v) => field.onChange(v.toISOString())} error={errors.dateDeConsultation && errors.dateDeConsultation.message} />
             )}/>
            </div>
            <div>
            <Controller control={control} name="poids" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Poids" error={errors.poids && errors.poids.message}
            placeholder="entrer le poids"
            rightSection="kg"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="taille" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Taille" error={errors.taille && errors.taille.message}
            placeholder="entrer la taille"
            rightSection="cm"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="tension" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Tension" error={errors.tension && errors.tension.message}
            placeholder="entrer la tension"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="temperature" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Temperature" error={errors.temperature && errors.temperature.message}
            placeholder="entrer la température"
            rightSection="°C"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="poule" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Pouls" error={errors.poule && errors.poule.message}
            placeholder="entrer le pouls"
            rightSection="bpm"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="glycemie" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Glycemie" error={errors.glycemie && errors.glycemie.message}
            placeholder="entrer le taux de glycémie"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="corps_cetonique" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Corps Cetonique" error={errors.corps_cetonique && errors.corps_cetonique.message}
            placeholder="entrer le corps cétonique"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="autres" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Autres" error={errors.autres && errors.autres.message}
            placeholder="autres observations ..."
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="plainte_du_jour" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Plaite du jour" error={errors.plainte_du_jour	&& errors.plainte_du_jour.message}
            placeholder="Plaite du jour ..."
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="examen" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Examen" error={errors.examen	&& errors.examen.message}
            placeholder="Examen ..."
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="diagnostique" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Diagnostique" error={errors.diagnostique	&& errors.diagnostique.message}
            placeholder="Diagnostique ..."
              withAsterisk/>
             )}/>
            </div>
            <div className="my-2">
              <Button onClick={remplirTraitement} className="bg-green-500 hover:bg-green-700">AJOUTER TRAITEMENTS</Button>
            </div>
            <div>
            <Controller control={control} name="bilan" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Bilan" error={errors.bilan && errors.bilan.message}
            placeholder="entrer le bilan"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="prochain_rv" render={({field}) => (
            <DatePicker placeholder="Choisir la date du prochain rendez-vous" label="Date du prochain rendez-vous" withAsterisk locale="fr" value={parseISO(field.value)} onChange={(v) => field.onChange(v.toISOString())} error={errors.prochain_rv && errors.prochain_rv.message} />
             )}/>
            </div>
            
            <div>
            <Controller control={control} name="reference" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="References" error={errors.reference && errors.reference.message}
            placeholder="References ...."
              withAsterisk/>
             )}/>
            </div>
           
            <div className="flex items-center justify-center space-x-2 my-5"> 
              <Button type="submit" className="bg-green-500 hover:bg-green-700">METTRE A JOUR LA CONSULTATION</Button>
            </div>
          </form>
          
  </Dialog>
    </>
  )
}

export default create(UpdateConsultationModal)