import { Dialog } from 'primereact/dialog';
import { create } from 'react-modal-promise'
import { Button, Group, Image, SimpleGrid, Text } from '@mantine/core';
import { TbUpload, TbPhoto, TbX } from 'react-icons/tb';
import { Dropzone, IMAGE_MIME_TYPE,PDF_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';

function AddFiles({ isOpen, onResolve, onReject,dossier }) {

  const [files, setFiles] = useState([]);

  const saveFile = () => {
    if(files) {
      const formData = new FormData();
      files.forEach(f => {
        formData.append('docs', f,f.name);
      })
      formData.append('dossier',dossier._id);
      formData.append('type', 'img');
      onResolve(formData);
    }
    
  }


  const previews = files.map((file, index) => {
    const fileUrl = URL.createObjectURL(file);
      return (
            <Image
              key={index}
              src={fileUrl}
              imageProps={{ onLoad: () => URL.revokeObjectURL(fileUrl) }}
            />
          );
  });

  return (
    <>
     <Dialog header="AJOUTER UN FICHIER SUR LE DOSSIER" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
     <Dropzone
      onDrop={setFiles}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={[IMAGE_MIME_TYPE, PDF_MIME_TYPE]}
      
    >
      <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <TbUpload
            size={50}
            stroke={1.5}
            className="text-green-500"
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <TbX
            size={50}
            stroke={1.5}
           className="text-red-500"
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <TbPhoto size={50} stroke={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
          Faites glisser des images ici ou cliquez pour sélectionner des fichiers
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>

          Joignez autant de fichiers que vous le souhaitez, chaque fichier ne doit pas dépasser 5 Mo
          </Text>
        </div>
      </Group>
    </Dropzone>
    <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
        mt={previews.length > 0 ? 'xl' : 0}
      >
        {previews}
      </SimpleGrid>
     <div className="my-5">
      <Button onClick={saveFile} className="bg-green-500 hover:bg-green-600">ENREGISTRER</Button>
     </div>
    </Dialog>
    </>
  )
}

export default create(AddFiles)