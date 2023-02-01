import { Button, LoadingOverlay } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createDossier, getDossierByEtudiant } from "../services/dossier-service";
import Dossier from "./Dossier";
import RemplirDossierModal from "./modals/RemplirDossierModal";
import UpdateDossierMedical from "./modals/UpdateDossierMedical";
import { GiFiles } from 'react-icons/gi';
import AddFiles from "./modals/AddFiles";
import { createDoc } from "../services/docservice";

function DossierMedical({etudiant}) {

    const qk = ['get_Dossier',etudiant?._id]
    const {data: dossier, isLoading: isLoadingDossier } = useQuery(qk, () => getDossierByEtudiant(etudiant?._id));
    const qc = useQueryClient()
    const {mutate: createD } = useMutation((data) => createDossier(data), {
        onSuccess:(_) => {
            qc.invalidateQueries(qk);
        }
    })

    const {mutate: uploads } = useMutation((data) => createDoc(data), {
        onSuccess:(_) => {
            console.log(_);
            qc.invalidateQueries(qk);
        },
        onError:(_) => {
            console.log(_);
        }
    })

    const handleCreateDossier = () => {
        RemplirDossierModal({etudiant}).then(createD).catch(((e) => console.log(e, "rejected create")))
    }

    const handleUpdateDossier = (dossier) => {
        UpdateDossierMedical({dossier}).then(createD).catch(((e) => console.log(e, "rejected create")))
    }

    const handleAddFile = (dossier) => {
        AddFiles({dossier}).then(uploads).catch(((e) => console.log(e, "rejected create")))
    }

  return (
    <>
    <LoadingOverlay visible={isLoadingDossier} overlayBlur={2} />
    {dossier ? <div className="w-1/2 my-20 mx-auto py-20 flex flex-col  items-center justify-between">
        <Dossier dossier={dossier} />
        <div className="flex items-center justify-center space-x-2">
            <Button className="bg-green-500 hover:bg-green-700" onClick={() => handleUpdateDossier(dossier)}>MODIFIER LE DOSSIER</Button>
            <Button className="bg-amber-500 hover:bg-amber-700" onClick={() => handleAddFile(dossier)}><GiFiles  className="h-6 w-6 text-white"/> AJOUTER UN FICHIER</Button>
        </div>
    
    </div>  : <div className="py-10 flex items-start justify-center">
        <Button className="bg-green-500 hover:bg-green-700" onClick={handleCreateDossier}>CREER LE DOSSIER</Button>
        </div>}
    </>
  )
}

export default DossierMedical