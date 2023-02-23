import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getEtudiantById } from "../services/etudiantservice"
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { UserInfo } from "./UserInfo";
import { EtudiantTab } from "./EtudiantTab";
import PrisEnCharges from "./PrisEnCharges";
import DossierMedical from "./DossierMedical";
import Consultations from "./Consultations";





function Etudiant({auth}) {
    const {id} = useParams()
    const toast = useRef();
    const key = ['get_Etudiant',id]

    const {data} = useQuery(key, () => getEtudiantById(id))
  return (
    <>
    {data && <> 
    <UserInfo prenom={data.prenom} nom={data.nom} email={data.email} sexe={data.sexe} telephone={data.telephone} user={data.user} formation={data.formation} apte={data.apte}/>
    <EtudiantTab bulletinComponent={<PrisEnCharges etudiant={data} />} dossierComponent={<DossierMedical etudiant={data} auth={auth}/>} consulationComponent={<Consultations etudiant={data} />} />
    </> }
    <Toast ref={toast} />
    </>
  )
}

export default Etudiant