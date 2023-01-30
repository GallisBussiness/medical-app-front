import { Dialog } from 'primereact/dialog';
import { AiFillSave } from 'react-icons/ai';
import { create } from 'react-modal-promise'


  
  const saveFiles = () => {}

function AddFiles({ isOpen, onResolve, onReject, dossier }) {

  return (
    <>
     <Dialog header="AJOUTER UN FICHIER SUR LE DOSSIER" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
        
      <div className="my-2">
            <button className="inline-block px-6 py-2 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => saveFiles()} >SAUVEGARDER LES FICHIERS <AiFillSave className="h-6 w-6 text-white inline"/></button>
      </div>
    </Dialog>
    </>
  )
}

export default create(AddFiles)