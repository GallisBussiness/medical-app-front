import { create } from 'react-modal-promise'
import { Dialog } from 'primereact/dialog';
function ConfirmDelete({ isOpen, onResolve, onReject}) {
  return (
    <>
       <Dialog header="Voulez-vous vraiement supprimer cet enrégistrement ?" visible={isOpen} onHide={() => onReject(false)} className="p-10">
       <div className="flex items-center justify-between">
              <div>
              <button onClick={() => onResolve(true)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> SUPPRIMER</button>
            <button onClick={() => onResolve(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
              </div>
             
            </div>
        </Dialog>
    </>
  )
}

export default create(ConfirmDelete)