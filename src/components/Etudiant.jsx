import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getEtudiantById } from "../services/etudiantservice"
// import Consultations from "./Consultations";
// import PrisEnCharges from "./PrisEnCharges";
// import { AiFillPlusCircle } from "react-icons/ai";
// import AddFiles from "./modals/AddFiles";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { UserInfo } from "./UserInfo";
import { EtudiantTab } from "./EtudiantTab";
import PrisEnCharges from "./PrisEnCharges";
import DossierMedical from "./DossierMedical";
import Consultations from "./Consultations";
// import {env} from '../env'




function Etudiant() {
    const {id} = useParams()
    const toast = useRef();
    // const qc = useQueryClient();
    const key = ['get_Etudiant',id]

//   const {mutate: upload} = useMutation(({id,data}) => uploadFiles(id,data), {
//     onSuccess: (_) => {
//     toast.current.show({severity: 'success', summary: 'Ajout de fichier', detail: 'Ajout des fichiers réussie !!'});
//     qc.invalidateQueries(key);
//     },
//     onError: (_) => {
//         toast.current.show({severity: 'error', summary: 'Ajout de fichier', detail: 'Ajout des fichiers échouée !!'});
//     }
// })

    const {data} = useQuery(key, () => getEtudiantById(id))

    // const addFiles = () => {
    //   AddFiles().then(fs => {
    //     const fd  = new FormData();
    //     fs.forEach(f => {
    //       fd.append('files',f);
    //     });
    //     upload({id:data?._id ,data:fd});
    //   })
    // }

  return (
    <>
    {data && <> 
    <UserInfo prenom={data.prenom} nom={data.nom} email={data.email} sexe={data.sexe} telephone={data.telephone}/>
    <EtudiantTab bulletinComponent={<PrisEnCharges etudiant={data} />} dossierComponent={<DossierMedical etudiant={data}/>} consulationComponent={<Consultations etudiant={data} />} />
    </> }
    <Toast ref={toast} />
    </>
  )
}

export default Etudiant