import { Button, LoadingOverlay } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createDossier, getDossierByEtudiant } from "../services/dossier-service";
import Dossier from "./Dossier";
import RemplirDossierModal from "./modals/RemplirDossierModal";
import UpdateDossierMedical from "./modals/UpdateDossierMedical";

function DossierMedical({etudiant}) {

    const qk = ['get_Dossier',etudiant?._id]
    const {data: dossier, isLoading: isLoadingDossier } = useQuery(qk, () => getDossierByEtudiant(etudiant?._id));
    const qc = useQueryClient()
    const {mutate: createD } = useMutation((data) => createDossier(data), {
        onSuccess:(_) => {
            qc.invalidateQueries(qk);
        }
    })

    const handleCreateDossier = () => {
        RemplirDossierModal({etudiant}).then(createD).catch(((e) => console.log(e, "rejected create")))
    }

    const handleUpdateDossier = (dossier) => {
        UpdateDossierMedical({dossier}).then(createD).catch(((e) => console.log(e, "rejected create")))
    }

  return (
    <>
    <LoadingOverlay visible={isLoadingDossier} overlayBlur={2} />
    {dossier ? <div className="w-1/2 my-20 mx-auto py-20 flex  items-center justify-between">
        <Dossier dossier={dossier} />
    <Button className="bg-green-500 hover:bg-green-700" onClick={() => handleUpdateDossier(dossier)}>MODIFIER LE DOSSIER</Button>
    </div>  : <div className="py-10 flex items-start justify-center">
        <Button className="bg-green-500 hover:bg-green-700" onClick={handleCreateDossier}>CREER LE DOSSIER</Button>
        </div>}
    </>
  )
}

export default DossierMedical