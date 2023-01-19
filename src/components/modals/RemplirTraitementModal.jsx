import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise'
import { Button } from 'primereact/button';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Chip } from 'primereact/chip'
import { Column } from 'primereact/column';
import { MdDelete } from 'react-icons/md';
import { ActionIcon, NumberInput, Select, TextInput } from '@mantine/core';

const schema = yup.object({
    medicament: yup.string().required(),
    nombre: yup.number().required(),
    frequence: yup.string().required(),
  }).required();

function RemplirTraitementModal({ isOpen, onResolve, onReject,traitement }) {
 const [curTraitement,setCurTraitement] = useState(traitement);
    const defaultValues = { medicament: '',
        nombre: 1,
        frequence: 'heure'};
const {control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  defaultValues
});

const FrequenceOptions = [
    {label: 'Heure', value: 'heure'},
    {label: 'Jour', value: 'jour'},
    {label: 'Semaine', value: 'semaine'},
    {label: 'Mois', value: 'mois'},
];

const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};
const actionBodyTemplate = (rowData) => {
  return <div className="flex items-center justify-center space-x-1">
  <ActionIcon onClick={() => deleteTraitement(rowData)}>
    <MdDelete className="text-red-500"/>
  </ActionIcon>
  </div>;
  
}

const nombreTemplate = (row) => {
  return <div>
      <Chip label={`${row.nombre} X`} className="bg-amber-300"/>
  </div>
}
const frequenceTemplate = (row) => {
  return <div>
    <Chip label={`Par ${row.frequence}`} className="bg-green-300"/>
  </div>
}

const onCreate = () => {
    onResolve(curTraitement);
  };

  const deleteTraitement = (row) => {
    const rest = curTraitement.filter(t => t.medicament !== row.medicament )
    setCurTraitement(rest)
  }

  const addTraitement = data => {
    setCurTraitement(cur => ([...cur,data]))
  };

  return (
    <>
         <Dialog header="Ajouter Traitement" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="flex flex-col space-y-1 md: md:flex-row md:space-x-1 md:space-y-0" onSubmit={handleSubmit(addTraitement)} method="POST">
        <div>
            <Controller control={control} name="medicament" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Médicament" error={errors.medicament && errors.medicament.message}
            placeholder="entrer le médicament"
              withAsterisk/>
             )}/>
            </div>
          
            <div>
              <Controller control={control} name="nombre" render={({field}) => (
                 <NumberInput value={field.value} onChange={field.onChange} label="Posologie" withAsterisk/>
              )} />
              {getFormErrorMessage('nombre')} 
            </div>
            <div >
          <Controller control={control} name="frequence" render={({field}) => (
                    <Select
                    label="Frequence de prise"
                    placeholder="Selectionnez la fréquence ..."
                    searchable
                    clearable
                    nothingFound="Pas de fréquence disponibles"
                    data={FrequenceOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.frequence && errors.frequence.message}
                  />
              )} />
            </div>
            <div className="self-end">
            <Button icon="pi pi-plus" />
            </div>
            
          </form>

          <div className="my-5">
            
          <DataTable value={curTraitement}
                     size="small"
                    dataKey="medicament" rowHover 
                    responsiveLayout="scroll"
                    emptyMessage="Aucun médicament prescrit"
                    >
                    
                    <Column field="medicament" header="Medicament" style={{ minWidth: '14rem' }} />
                    <Column field="nombre" header="Posologie" body={nombreTemplate} style={{ minWidth: '14rem' }} />
                    <Column field="frequence" header="Frequence de prise" body={frequenceTemplate}  style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
          </div>
          <div className="my-2">
          <Button onClick={onCreate} className="bg-green-500 hover:bg-green-700">SAUVEGARDER</Button>
          </div>
        
  </Dialog>
    </>
  )
}

export default create(RemplirTraitementModal)