import { Dialog } from 'primereact/dialog';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { AiFillSave } from 'react-icons/ai';
import { create } from 'react-modal-promise'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };
  

function AddFiles({ isOpen, onResolve, onReject }) {

    const [files,setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })));
      }, [])
      const { isFocused,
        isDragAccept,
        isDragReject,getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);

      const saveFiles = () => onResolve(files);

      const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
              alt="file"
              // Revoke data uri after image is loaded
              onLoad={() => { URL.revokeObjectURL(file.preview) }}
            />
          </div>
        </div>
      ));
    
      useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

  return (
    <>
     <Dialog header="AJOUTER DES FICHIERS SUR LE DOSSIER" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
     <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Déposer les fichiers ici ...</p> :
          <p>Faite un glisser-déposer de vos fichiers ici, ou cliquer ici pour les selectionner</p>
      }
    </div>
    <aside style={thumbsContainer}>
        {thumbs}
      </aside>
      <div className="my-2">
            <button className="inline-block px-6 py-2 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => saveFiles()} >SAUVEGARDER LES FICHIERS <AiFillSave className="h-6 w-6 text-white inline"/></button>
      </div>
    </Dialog>
    </>
  )
}

export default create(AddFiles)