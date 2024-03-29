import { ActionIcon, Button, Card, Checkbox, Grid, Image, LoadingOverlay } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createDossier, getDossierByEtudiant, updateDossier } from "../services/dossier-service";
import Dossier from "./Dossier";
import RemplirDossierModal from "./modals/RemplirDossierModal";
import UpdateDossierMedical from "./modals/UpdateDossierMedical";
import { GiFiles } from 'react-icons/gi';
import AddFiles from "./modals/AddFiles";
import { createDoc, getDocByDossier, removeDoc } from "../services/docservice";
import { showNotification } from "@mantine/notifications";
import { IMAGE_MIME_TYPE} from '@mantine/dropzone';
import { env } from "../env";
import { FaPrint, FaRegFilePdf, FaTrash } from "react-icons/fa";
import { AttestationPrint } from "./AttestationPrint";
import ReactToPrint from 'react-to-print';
import { useRef, useState } from "react";
import { updateEtudiant } from "../services/etudiantservice";


function DossierMedical({etudiant,auth}) {
    const [apte, setApte] = useState(etudiant?.apte);
    const qk = ['get_Dossier',etudiant?._id];
    const qkd = ['get_Docs',etudiant?._id];
    const key = ['get_Etudiant',etudiant?._id]
    const attestationRef = useRef();
    const {data: dossier, isLoading: isLoadingDossier } = useQuery(qk, () => getDossierByEtudiant(etudiant?._id));

    
    const {data: docs, isLoading: isLoadingDocs } = useQuery(qkd, () => getDocByDossier(dossier?._id), {
        enabled: dossier !== undefined,
    });
    const qc = useQueryClient()
    const {mutate: createD } = useMutation((data) => createDossier(data), {
        onSuccess:(_) => {
            showNotification({
                title: 'Dossier Crée !',
                message: 'félicitations, le dossier a bien été créé!',
                color: "green"
              })
            qc.invalidateQueries(qk);
            qc.invalidateQueries(qkd);
        },
        onError:(_) => {
            showNotification({
                title: 'Dossier non crée!',
                message: 'désolé, le dossier n\'a pas pu être créé',
                color: "red"
              });
        }
    })

    const {mutate: update, isLoading: loadingU} = useMutation((data) => updateEtudiant(data._id, data.data), {
        onSuccess: (_) => {
            showNotification({
                title: 'Mise à  jour etudiant',
                message: 'félicitations, l\'étudiant est modifié!',
                color: "green"
              })
            qc.invalidateQueries(key);
           },
           onError: (_) => {
            showNotification({
                title: 'Mise à  jour etudiant',
                message: 'cet étudiant n\'a pas pu être modifié',
                color: "red"
              })
           }
    })

    const {mutate: DD, isLoading: isLoadingDD } = useMutation((id) => removeDoc(id), {
        onSuccess:(_) => {
            showNotification({
                title: 'Document supprimé avec succés !',
                message: 'félicitations, le document a bien été supprimé!',
                color: "green"
              })
            qc.invalidateQueries(qkd);
        },
        onError:(_) => {
            showNotification({
                title: 'Document non supprimé!',
                message: 'désolé, le document n\'a pas pu être supprimé',
                color: "red"
              });
        }
    })

    const {mutate: updateD } = useMutation(({_id,...rest}) => updateDossier(_id,rest), {
        onSuccess:(_) => {
            showNotification({
                title: 'Dossier Modifié !',
                message: 'félicitations, le dossier a bien été modifié!',
                color: "green"
              })
            qc.invalidateQueries(qk);
            qc.invalidateQueries(qkd);
        },
        onError:(_) => {
            showNotification({
                title: 'Dossier non modifié!',
                message: 'désolé, le dossier n\'a pas pu être modifié',
                color: "red"
              });
        }
    })

    const {mutate: uploads, isLoading } = useMutation((data) => createDoc(data), {
        onSuccess:(_) => {
            showNotification({
                title: 'fichier uploadé !',
                message: 'félicitations, votre fichier a bien été créé!',
                color: "green"
              })
            qc.invalidateQueries(qkd);
        },
        onError:(_) => {
            showNotification({
                title: 'fichier non uploadé!',
                message: 'désolé, votre fichier n\'a pas pu être créé',
                color: "red"
              });
        }
    })

    const handleCreateDossier = () => {
        RemplirDossierModal({etudiant}).then(createD).catch(((e) => console.log(e, "rejected create")))
    }

    const handleUpdateDossier = (dossier) => {
        UpdateDossierMedical({dossier}).then(updateD).catch(((e) => console.log(e, "rejected create")))
    }

    const handleAddFile = (dossier) => {
        AddFiles({dossier}).then(uploads).catch(((e) => console.log(e, "rejected create")))
    }

    const handleDeleteDoc = (id) => DD(id);

    const handleApte = (event) => {
        setApte(event.currentTarget.checked);
        update({_id: etudiant?._id, data: { apte: event.currentTarget.checked }});
    }
    



    const WrapperDoc = ({doc}) => {
        return <Card>
           <div className="my-2 mx-1 border">
           {doc.type === IMAGE_MIME_TYPE.join(',') ? <Image src={`${env.baseServerURL}/uploads/docs/${doc.nom}`}/>   : <a  href={`${env.baseServerURL}/uploads/docs/${doc.nom}`}><FaRegFilePdf className="text-red-500 w-10 h-10 inline" /> {doc.nom} </a>  }
           </div>
           <div className="flex items-center space-x-3 mx-1"> <ActionIcon onClick={() => handleDeleteDoc(doc._id)}> <FaTrash className="text-red-500 w-6 h-6"/></ActionIcon>  </div>
        </Card>
    }

  return (
    <>
    <LoadingOverlay visible={isLoadingDossier || isLoading || isLoadingDocs || isLoadingDD || loadingU} overlayBlur={2} />
    {dossier ? <div className="flex items-center space-x-2 py-20 mx-5">
        <div className="w-full flex flex-col  items-center justify-between">
        {auth?.role === "admin" && <div className="self-start mx-20"><Checkbox checked={apte} onChange={(event) => handleApte(event)} label="aptitude" size="lg" /> </div>}
        <Dossier dossier={dossier} />
        <div className="flex  space-x-2">
            <Button className="bg-green-500 hover:bg-green-700" onClick={() => handleUpdateDossier(dossier)}>MODIFIER LE DOSSIER</Button>
            <Button className="bg-amber-500 hover:bg-amber-700" onClick={() => handleAddFile(dossier)}><GiFiles  className="h-6 w-6 text-white"/> AJOUTER UN FICHIER</Button>
            {auth?.role === "admin" && <ReactToPrint
                trigger={() => <Button className="bg-blue-500 hover:bg-blue-600" leftIcon={<FaPrint className="text-white mx-1"/>}> IMPRIMER L'ATTESTATION</Button>}
                content={() => attestationRef.current}
            />}
            
            <div className="hidden print-block">
            <AttestationPrint ref={attestationRef} dossier={dossier}/>
            </div>
        </div>
            </div>
        <div className="w-1/2 mx-10">
        <Grid grow gutter="xs">
        {docs?.map((doc) => (
         <Grid.Col key={doc._id} span={2}>
           <WrapperDoc doc={doc} />
        </Grid.Col>
        ))}
    </Grid>
        </div>
    </div>  : <div className="py-10 flex items-start justify-center">
        <Button className="bg-green-500 hover:bg-green-700" onClick={handleCreateDossier}>CREER LE DOSSIER</Button>
        </div>}
    </>
  )
}

export default DossierMedical