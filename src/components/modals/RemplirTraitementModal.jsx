import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber'

import { create } from 'react-modal-promise'
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Chip } from 'primereact/chip'
import { Column } from 'primereact/column';
import { MdDelete } from 'react-icons/md';

const schema = yup.object({
    medicament: yup.string(),
    nombre: yup.number(),
    frequence: yup.string(),
  }).required();

function RemplirTraitementModal({ isOpen, onResolve, onReject,traitement }) {
 const [curTraitement,setCurTraitement] = useState(traitement);
    const defaultValues = { medicament: '',
        nombre: 1,
        frequence: 'jour'};
const {control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  defaultValues
});

const FrequenceOptions = [
    {name: 'Heure', value: 'heure'},
    {name: 'Jour', value: 'jour'},
    {name: 'Semaine', value: 'semaine'},
    {name: 'Mois', value: 'mois'},
];

const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};
const actionBodyTemplate = (rowData) => {
  return <div className="flex items-center justify-center space-x-1">
  <button type="button" onClick={() => deleteTraitement(rowData)}  className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><MdDelete className="text-white inline"/></button>
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
            <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="medicament" className="form-label">Medicament</label>
            <Controller control={control} name="medicament" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full
             appearance-none rounded-lg border border-solid border-green-300 bg-white bg-clip-padding px-3 py-2.5 font-normal text-green-700 
             outline-none transition-all placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="medicament" placeholder="Medicament" autoFocus />
             )}/>
              {getFormErrorMessage('medicament')} 
            </div>
          
            <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="nombre" className="form-label">Posologie</label>
              <Controller control={control} name="nombre" render={({field}) => (
                  <InputNumber inputId="vertical" value={field.value} onValueChange={(e) => field.onChange(e.value)} showButtons buttonLayout="horizontal"
                  decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
              )} />
              {getFormErrorMessage('nombre')} 
            </div>
            <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="frequence" className="form-label">Frequence</label>
            <Controller control={control} name="frequence" render={({field}) => (
            <Dropdown value={field.value} options={FrequenceOptions} onChange={field.onChange} optionLabel="name" optionValue="value" placeholder="Selectionez la Fréquence de prise" />
             )}/>
              {getFormErrorMessage('frequence')} 
            </div>
            <div className="self-end">
            <Button icon="pi pi-plus" />
            </div>
            
          </form>

          <div className="my-2">
            
          <DataTable value={curTraitement} rows={10}
                     rowsPerPageOptions={[10,25,50]}
                     size="small"
                    dataKey="medicament" rowHover 
                    responsiveLayout="scroll"
                    emptyMessage="Aucun médicament prescrit"
                    >
                    
                    <Column field="medicament" header="Medicament" sortable style={{ minWidth: '14rem' }} />
                    <Column field="nombre" header="Posologie" body={nombreTemplate} sortable style={{ minWidth: '14rem' }} />
                    <Column field="frequence" header="Frequence de prise" body={frequenceTemplate} sortable style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
          </div>
          <div className="my-2">
              <button onClick={onCreate} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> AJOUTER TRAITEMENT</button>
          </div>
        
  </Dialog>
    </>
  )
}

export default create(RemplirTraitementModal)