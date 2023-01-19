import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { parseISO } from 'date-fns'
import { Chips } from 'primereact/chips';
import { DatePicker } from '@mantine/dates';
import { Button, Select, TextInput } from '@mantine/core';

const schema = yup.object({
    date: yup.string()
    .required(),
    examensDemandes: yup.array(),
    service: yup.string(),
    etablissement: yup.string(),
    user: yup.string().required(),
    dossier: yup.string()
    .required(),
  }).required();


function UpdateBulletinModal({ isOpen, onResolve, onReject,idDossier,idAuth,bulletin }) {
    const defaultValues = {
        _id: bulletin?._id,
        date: bulletin?.date,
        examensDemandes: bulletin?.examensDemandes?.split(',') == false ? [] : [...bulletin?.examensDemandes?.split(',')],
        service: bulletin?.service,
        etablissement: bulletin?.etablissement,
        user: idAuth,
        dossier: idDossier,
      };
        const {control, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(schema),
          defaultValues
        });
  
      
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
    
    <div>
            <Controller control={control} name="date" render={({field}) => (
            <DatePicker placeholder="Choisir la date" label="Date" withAsterisk locale="fr" value={parseISO(field.value)} onChange={(v) => field.onChange(v.toISOString())} error={errors.date && errors.date.message} />
             )}/>
            </div>
            <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="examensDemandes" className="form-label">Examens Demandés : </label>
              <Controller control={control} name="examensDemandes" render={({field}) => (
                 <Chips value={field.value} onChange={(e) => field.onChange(e.value)} separator=","  className="focus:outline-none"/>   
              )} />
              {getFormErrorMessage('examensDemandes')} 
            </div>
            <div >
      <Controller control={control} name="etablissement" render={({field}) => (
                    <Select
                    label="Etablissement"
                    placeholder="Selectionnez l'etablissement"
                    searchable
                    clearable
                    nothingFound="Pas d'etablissement disponibles"
                    data={['HOPITAL REGIONAL DE ZIGUINCHOR','HOPITAL DE LA PAIX DE ZIGUINCHOR','HOPITAL PSYCHIATRIQUE DE KENIA DE ZIGUINCHOR']}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.etablissement && errors.etablissement.message}
                  />
              )} />
            </div>
            <div>
            <Controller control={control} name="service" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Service" error={errors.service && errors.service.message}
            placeholder="entrer le service"
              withAsterisk/>
             )}/>
            </div>
              <div className="my-5">
             <Button type="submit" className="bg-green-500 hover:bg-green-600"> MODIFIER BULLETIN</Button>
            </div>
            
          </form>
          
  </Dialog>
    </>
  )
}

export default create(UpdateBulletinModal)