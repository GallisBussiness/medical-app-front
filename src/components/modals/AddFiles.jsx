import { Dialog } from 'primereact/dialog';
import { create } from 'react-modal-promise'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { Button, FileButton, Group, Select, Text} from '@mantine/core';
import { IMAGE_MIME_TYPE} from '@mantine/dropzone';
import { useState } from 'react';


const schema = yup.object({
  type: yup.string(),
  dossier: yup.string()
  .required(),
}).required();

function AddFiles({ isOpen, onResolve, onReject,dossier }) {

  const [file,setFile] = useState(null);
  const defaultValues = {
    type: `${IMAGE_MIME_TYPE.join(', ')}`,
    dossier: dossier?._id,
  };

  const typeOptions = [
    { value: IMAGE_MIME_TYPE.join(', '), label: 'IMAGE' },
    { value: "application/pdf, application/vnd.ms-excel", label: 'PDF' },
  ]
    const {control, handleSubmit,getValues, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues
    });


    const onCreate = (data) => {
      saveFile(data);
    }

  const saveFile = ({type,dossier}) => {
    
      const formData = new FormData();
      formData.append('doc', file,file.name);
      formData.append('dossier',dossier);
      formData.append('nom','upload');
      formData.append('type',type);
      onResolve(formData);  
  }


  return (
    <>
     <Dialog header="AJOUTER UN FICHIER SUR LE DOSSIER" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
     <form onSubmit={handleSubmit(onCreate)}>
      <div className="my-5">
        <Controller name="type" control={control} render={({field}) => (
        <Select value={field.value} onChange={field.onChange} error={errors.type && errors.type.message} label="Type de fichier" placeholder="Selectionnez le type de fichier" data={typeOptions} />
      )} />
      </div>
      
      <Group position="center">
        <FileButton onChange={setFile} accept={getValues().type}>
          {(props) => <Button className="bg-green-500 hover:bg-green-600" {...props}>Télécharger un fichier </Button>}
        </FileButton>
      </Group>
      {file && (
        <Text size="sm" align="center" mt="sm">
          Fichier choisi : {file.name}
        </Text>
      )}
      
     <div className="my-5">
      <Button type="submit" className="bg-green-500 hover:bg-green-600">ENREGISTRER</Button>
     </div>
    </form>
    </Dialog>
    </>
  )
}

export default create(AddFiles)