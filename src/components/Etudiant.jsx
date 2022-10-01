import { useQuery } from "react-query"
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom"
import { getEtudiantById } from "../services/etudiantservice"
import { Chip } from 'primereact/chip';
import Consultations from "./Consultations";
import PrisEnCharges from "./PrisEnCharges";

function Etudiant() {
    const {id} = useParams()
    const {pathname} = useLocation()
  const getCurrentTab = (p) => {
    const t = p.split('/');
    return t[t.length - 1];
  }

  const isActiveTab = (url) => url === getCurrentTab(pathname);

  const getClassTab = (url) => {
    if(isActiveTab(url)) {
      return "inline-block p-4 text-green-600 hover:text-green-700 rounded-t-lg border-b-2 border-green-600 active dark:text-green-500 dark:border-green-500";
    }
    return "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
  }
    const key = ['get_Etudiant',id]
    const {data} = useQuery(key, () => getEtudiantById(id))
    const makeChip = (str,cls='') => {
        return str?.split(',').map((s,i) => <Chip label={s} key={i} className={`mr-2 mb-2 ${cls}`} />) ?? ''
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
             
              <img className="relative z-20 w-32 pt-6 h-32" src={`/imgs/${data?.sexe}.svg`} alt="Etudiant" />
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
      <div className="flex">
        <div className="flex items-center w-full md:w-8/12 md:flex-none">
          <h6 className="mb-0 font-bold text-lg">DOSSIER MEDICAL</h6>
        </div>
      </div>
    </div>

    {data?.dossier && (Object.keys(data?.dossier).length > 3) ? <div className="p-4 flex items-center justify-center">
      <ul className="flex flex-col mb-0 rounded-lg w-full">
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Groupe Sanguin:</strong> &nbsp; {data?.dossier?.groupe_sanguin}</li>
        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Poids:</strong> &nbsp; {data?.dossier?.poids} kg</li>
        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Handicaps particuliers :</strong> &nbsp; {makeChip(data?.dossier?.handicap_particulier,'bg-green-500 text-white')}</li>
        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit"><strong className="text-slate-700">Maladies Chroniques:</strong> &nbsp; {makeChip(data?.dossier?.maladie_chronique,'bg-amber-500 text-white')}</li>
        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit"><strong className="text-slate-700">Allergies:</strong> &nbsp; {makeChip(data?.dossier?.allergies,'bg-blue-500 text-white')}</li>
        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit"><strong className="text-slate-700">Antécédants Médicaux:</strong> &nbsp; {makeChip(data?.dossier?.antecedant_medicaux,'bg-gray-600 text-white')}</li>

      </ul>
    </div> : <div className="flex items-center jsutify-center"><h1 className="font-bold text-5xl p-10"> Dossier Vide</h1> </div> } 
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
    </>
  )
}

export default Etudiant