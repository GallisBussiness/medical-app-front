import { BsGearWideConnected } from 'react-icons/bs';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import {Departement} from './components-params/Departement';
import {Etablissement} from './components-params/Etablissement';
import {Formation} from './components-params/Formation';
import {Niveau} from './components-params/Niveau';
import { Ufr } from './components-params/Ufr';

const Paramettre = () => {

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

  return (
    <>
      <div className="flex flex-wrap mt-6">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full">
              <h5 className="font-bold text-3xl">Parametrage</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/imgs/paramettre.svg" alt="paramettre" />
            </div>
          </div>
          <div className="max-w-full h-40 px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 hidden lg:block">
            <div className="h-full bg-gradient-to-tl from-green-700 to-green-300 rounded-xl">
              <div className="relative flex items-center justify-center h-full">
                        <BsGearWideConnected className="h-32 w-32 bg-white text-green-600 rounded-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

   <div className="my-5">

    
<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
  <ul className="flex flex-wrap">
    <li className="mr-2">
      <Link to="ufrs" className={getClassTab('ufrs')} >UFR</Link>
    </li>
    <li className="mr-2">
      <Link to="departements" className={getClassTab('departements')} >DEPARTEMENT</Link>
    </li>
    <li className="mr-2">
      <Link to="formations" className={getClassTab('formations')} >FORMATION</Link>
    </li>
    <li className="mr-2">
      <Link to="niveau" className={getClassTab('niveau')} >NIVEAU</Link>
    </li>
    <li className="mr-2">
      <Link to="etablissements" className={getClassTab('etablissements')} >ETABLISSEMENT</Link>
    </li>
  </ul>
</div>

<Routes>
       <Route path="" element={<Ufr/>} />
       <Route path="ufrs" element={<Ufr/>}/>
       <Route path="departements" element={<Departement/>}/>
       <Route path="formations" element={<Formation/>} />
       <Route path="niveau" element={<Niveau/>} />
       <Route path="etablissements" element={<Etablissement/>} />
     </Routes>

   </div>

    </>
  )
}

export default Paramettre