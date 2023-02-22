import { Dialog } from 'primereact/dialog';
import { create } from 'react-modal-promise'
import { Button, FileButton, Group, Select, Text} from '@mantine/core';
import { IMAGE_MIME_TYPE, PDF_MIME_TYPE} from '@mantine/dropzone';
import { useState } from 'react';


function UpdateFiles({ isOpen, onResolve, onReject,idDos }) {

  const [file,setFile] = useState(null);
  const [type,setType] = useState(IMAGE_MIME_TYPE.join(','));
  const typeOptions = [
    { value: IMAGE_MIME_TYPE.join(','), label: 'IMAGE' },
    { value: PDF_MIME_TYPE.join(','), label: 'PDF' },
  ]


  const saveFile = () => {
    
      const formData = new FormData();
      formData.append('doc', file,file.name);
      formData.append('dossier',idDos);
      formData.append('nom','upload');
      formData.append('type',type);
      onResolve(formData);  
  }


  return (
    <>
     <Dialog header="MODIFIER UN FICHIER SUR LE DOSSIER" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
      <div className="my-5">
        <Select value={type} onChange={setType}  label="Type de fichier" placeholder="Selectionnez le type de fichier" data={typeOptions} />
      </div>
      
      <Group position="center">
        <FileButton onChange={setFile} accept={type}>
          {(props) => <Button className="bg-green-500 hover:bg-green-600" {...props}>Télécharger un fichier </Button>}
        </FileButton>
      </Group>
      {file && (
        <Text size="sm" align="center" mt="sm">
          Fichier choisi : {file.name}
        </Text>
      )}
      
     <div className="my-5">
      <Button onClick={saveFile} className="bg-green-500 hover:bg-green-600">ENREGISTRER</Button>
     </div>
    </Dialog>
    </>
  )
}

export default create(UpdateFiles)