import { useMutation, useQuery, useQueryClient } from "react-query"
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom"
import { getEtudiantById, uploadFiles } from "../services/etudiantservice"
import Consultations from "./Consultations";
import PrisEnCharges from "./PrisEnCharges";
import { AiFillPlusCircle } from "react-icons/ai";
import AddFiles from "./modals/AddFiles";
import { useRef } from "react";
import { Toast } from "primereact/toast";
// import {env} from '../env'




function Etudiant() {
    const {id} = useParams()
    const {pathname} = useLocation()
    const toast = useRef();
    const qc = useQueryClient();
    const key = ['get_Etudiant',id]
  const getCurrentTab = (p) => {
    const t = p.split('/');
    return t[t.length - 1];
  }

  const {mutate: upload} = useMutation(({id,data}) => uploadFiles(id,data), {
    onSuccess: (_) => {
    toast.current.show({severity: 'success', summary: 'Ajout de fichier', detail: 'Ajout des fichiers réussie !!'});
    qc.invalidateQueries(key);
    },
    onError: (_) => {
        toast.current.show({severity: 'error', summary: 'Ajout de fichier', detail: 'Ajout des fichiers échouée !!'});
    }
})

  const isActiveTab = (url) => url === getCurrentTab(pathname);

  const getClassTab = (url) => {
    if(isActiveTab(url)) {
      return "inline-block p-4 text-green-600 hover:text-green-700 rounded-t-lg border-b-2 border-green-600 active dark:text-green-500 dark:border-green-500";
    }
    return "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
  }
    const {data} = useQuery(key, () => getEtudiantById(id))

    const addFiles = () => {
      AddFiles().then(fs => {
        const fd  = new FormData();
        fs.forEach(f => {
          fd.append('files',f);
        });
        upload({id:data?._id ,data:fd});
      })
    }

  return (
    <>
      <div className="flex flex-wrap">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full">
                <div>
                <h5 className="font-bold text-3xl">{data?.prenom} {data?.nom}</h5>
                <h5 className="font-semibold text-lg">{data?.nce}</h5>
                </div>
             
              {data?.sexe && <img className="relative z-20 w-32 pt-6 h-32" src={`/imgs/${data?.sexe}.svg`} alt="Etudiant" />}
            </div>
          </div>
          <div className="max-w-full h-40 px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 hidden md:block">
          <div>
          <h5 className="font-semibold text-lg">Tel : {data?.telephone}</h5>
          <h5 className="font-semibold text-lg">Adresse: {data?.adresse}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="my-10 mx-5">
  <div className="flex flex-col h-full bg-white border-0 shadow-soft-xl rounded-2xl">
    <div className="flex flex-col space-y-1 md:flex-row md:space-x-1">
        <div>
           <div className="p-4 bg-white border-b-0 rounded-t-2xl">
      <div className="flex w-full">
        <div className="flex items-center justify-center w-full md:w-8/12">
          <h6 className="mb-0 font-bold text-2xl">DOSSIER MEDICAL</h6>
        </div>
      </div>
    </div>

    {data?.dossier && (Object.keys(data?.dossier).length > 3) ? <div className="p-4 flex flex-col items-center justify-start">
      {/* <ul className="flex flex-col mb-0 rounded-lg w-full">
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Groupe Sanguin:</strong> &nbsp; {data?.dossier?.groupe_sanguin}</li>
        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Poids:</strong> &nbsp; {data?.dossier?.poids} kg</li>
        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Handicaps particuliers :</strong> &nbsp; {makeChip(data?.dossier?.handicap_particulier,'bg-green-500 text-white')}</li>
        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit"><strong className="text-slate-700">Maladies Chroniques:</strong> &nbsp; {makeChip(data?.dossier?.maladie_chronique,'bg-amber-500 text-white')}</li>
        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit"><strong className="text-slate-700">Allergies:</strong> &nbsp; {makeChip(data?.dossier?.allergies,'bg-blue-500 text-white')}</li>
        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit"><strong className="text-slate-700">Antécédants Médicaux:</strong> &nbsp; {makeChip(data?.dossier?.antecedant_medicaux,'bg-gray-600 text-white')}</li>
        <li></li>
      </ul> */}

<table className="border-collapse border border-slate-500 w-full my-2">
  <thead>
    <tr>
      <th className="border border-slate-600 p-2 bg-blacky text-whity">INFORMATION</th>
      <th className="border border-slate-600 p-2 bg-blacky text-whity">VALEUR</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-slate-600 font-semibold p-1">Groupe sanguin</td>
      <td className="border border-slate-600 font-semibold p-1">{data?.dossier?.groupe_sanguin}</td>
    </tr>
    <tr>
      <td className="border border-slate-600 font-semibold p-1">Poids</td>
      <td className="border border-slate-600 font-semibold p-1">{data?.dossier?.poids} kg</td>
    </tr>
    <tr>
      <td className="border border-slate-600 font-semibold p-1">Handicaps particuliers</td>
      <td className="border border-slate-600 font-semibold p-1">{data?.dossier?.handicap_particulier}</td>
    </tr>
    <tr>
      <td className="border border-slate-600 font-semibold p-1">Maladies Chroniques</td>
      <td className="border border-slate-600 font-semibold p-1">{data?.dossier?.maladie_chronique}</td>
    </tr>
    <tr>
      <td className="border border-slate-600 font-semibold p-1">Allergies</td>
      <td className="border border-slate-600 font-semibold p-1">{data?.dossier?.allergies}</td>
    </tr>
    <tr>
      <td className="border border-slate-600 font-semibold p-1">Antécédants Médicaux</td>
      <td className="border border-slate-600 font-semibold p-1">{data?.dossier?.antecedant_medicaux}</td>
    </tr>
  </tbody>
</table>
<button className="inline-block px-6 py-2 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => addFiles()} >AJOUTER DES FICHIERS <AiFillPlusCircle className="h-6 w-6 text-white inline"/></button>
      
    </div> : <div className="flex items-center jsutify-center"><h1 className="font-bold text-5xl p-10"> <img className="relative z-20 w-96 pt-6 h-96" src="/imgs/nodata.svg" alt="nodata" /> </h1> </div> } 
        </div>
        <div className="mx-5 w-full">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
  <ul className="flex flex-wrap">
    <li className="mr-2">
      <Link to="consultations" className={getClassTab('consultations')} >CONSULTATIONS</Link>
    </li>
    <li className="mr-2">
      <Link to="pris-en-charges" className={getClassTab('pris-en-charges')} >PRIS EN CHARGES</Link>
    </li>
  </ul>
</div>

<Routes>
       <Route path="" element={<Consultations etudiant={data}/>} />
       <Route path="consultations" element={<Consultations etudiant={data}/>} />
       <Route path="pris-en-charges" element={<PrisEnCharges etudiant={data}/>}/>
     </Routes>
        </div>
    </div>
    
  </div>
 
</div>
<Toast ref={toast} />
    </>
  )
}

export default Etudiant