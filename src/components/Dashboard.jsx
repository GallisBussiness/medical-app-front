import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useQuery, useQueryClient } from "react-query";
import { Sidebar } from 'primereact/sidebar';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getAuth } from "../services/authservice";
import Paramettre from "./Paramettre";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import Users from "./Users";
import Etudiants from "./Etudiants";
import Etudiant from "./Etudiant";
import Consultation from "./Consultation";
import Bulletin from "./Bulletin";
import "./bg.css"
import Statistique from "./Statistique";
import GlobalLoadingIndicator from "./GlobalIsFetchingInd";
import {useMedia} from 'react-use';
import ConsultationsAll from "./ConsultationsAll";
import BulletinsAll from "./BulletinsAll";
import P404 from "./P404";

const Dashboard = () => {
  const [visible,setVisible] = useState()
  const qc = useQueryClient();
  const auth = useAuthUser()();
  const hasAuth = useIsAuthenticated()();
  const navigate = useNavigate();
  const signOut = useSignOut()
  const isWide = useMedia('(max-width: 680px)');

  const qk = ['auth',auth?.id]
  const {data} = useQuery(qk, () => getAuth(auth?.id), {
    stateTime: 100_000,
    refetchOnWindowFocus:false,
  })

  const logout = () => {
    if(signOut()) {
      qc.clear();
      navigate("/login", {replace: true})
    }
  }

  useEffect(() => {
    if(!hasAuth) navigate("/login", {replace: true})
    return () => null;
  }, [hasAuth,navigate]);

  return (
    <>
   <div className="px-5 flex items-center justify-between bg-secondary py-1">
    {isWide && <button className="menu-icon dw dw-menu text-white" onClick={() => setVisible(true)}></button>}
    {!isWide && <div className="w-2/5 flex space-x-2 items-center justify-center"><Link  to="/" className="p-2 rounded-full bg-whity">
        <img src="/imgs/logo_crousz.png" className="h-8 w-8 mx-auto object-contain" alt="logo" />
      </Link> <span className="text-whity">CROUS/Z</span></div>}
    <div className="hidden w-full md:flex justify-end items-center mx-10 bg-secondary">
  <ul className="flex flex-col  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
   {data?.role === 'admin' && <li>
      <Link to="statistiques" className="block py-2 text-whity rounded md:bg-transparent md:p-0 uppercase font-bold">Acceuil</Link>
    </li>}
    <li>
      <Link to="allconsultations" className="block py-2 text-whity rounded md:bg-transparent md:p-0 uppercase font-bold">Consultations</Link>
    </li>
    <li>
      <Link to="allbulletins" className="block py-2 text-whity rounded md:bg-transparent md:p-0 uppercase font-bold">Prises en charge</Link>
    </li>
    <li>
      <Link to="etudiants" className="block py-2 text-whity rounded md:bg-transparent md:p-0 uppercase font-bold">Etudiants</Link>
    </li>
    {data?.role === 'admin' && <li>
      <Link to="users" className="block py-2 text-whity  rounded md:bg-transparent md:p-0 uppercase font-bold">Utilisateurs</Link>
    </li>}
  </ul>
</div>

    <div className="user-info-dropdown">
      <div className="dropdown">
        <button className="dropdown-toggle" data-toggle="dropdown">
          <span className="font-bold uppercase text-white">{data?.prenom} {data?.nom}</span>
        </button>
        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list bg-secondary">
          <Link className="dropdown-item text-whity" to="profil"><i className="dw dw-user1" /> Profil</Link>
         {data?.role === 'admin' && <Link className="dropdown-item text-whity" to="parametre"><i className="dw dw-settings2" /> Param??tres</Link>}
          <button className="dropdown-item text-whity" onClick={logout}><i className="dw dw-logout" /> Se D??connecter</button>
        </div>
    </div>
  </div>
</div>
<div>

<Sidebar visible={visible} onHide={() => setVisible(false)}>
<div>
    <div className="brand-logo mb-2">
      <Link  to="/">
        <img src="/imgs/logo_crousz.png" className="h-20 w-20 mx-auto object-cover" alt="logo" />
      </Link>
    </div>
    <div className="menu-block customscroll">
      <div className="sidebar-menu">
        <ul id="accordion-menu">
        {data?.role === 'admin' && <li>
      <Link to="statistiques" className="block py-2 text-black hover:text-blue-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Statistiques</Link>
    </li>}
    <li>
      <Link to="allconsultations" className="block py-2 text-blacky rounded md:bg-transparent md:p-0 uppercase font-bold">Consultations</Link>
    </li>
    <li>
      <Link to="allbulletins" className="block py-2 text-blacky rounded md:bg-transparent md:p-0 uppercase font-bold">Prises en charge</Link>
    </li>
    {data?.role === 'admin' && <li>
      <Link to="users" className="block py-2 text-black hover:text-blue-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Utilisateurs</Link>
    </li>}
    <li>
      <Link to="etudiants" className="block py-2 text-black hover:text-blue-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Etudiants</Link>
    </li>
        </ul>
      </div>
    </div>
  </div>
</Sidebar>
 
</div>
<div className="bg-back bg-fixed">
  <div>
  <GlobalLoadingIndicator />
  <Routes>
      <Route path="" element={<Statistique auth={data}/>}/>
       <Route path="profil" element={<Profile auth={data}/>}/>
      {data?.role === 'admin' && <Route path="users" element={<Users auth={data}/>}/>}
      {data?.role === 'admin' && <Route path="statistiques" element={<Statistique auth={data}/>}/>}
       <Route path="allconsultations" element={<ConsultationsAll/>} />
       <Route path="allbulletins" element={<BulletinsAll/>} />
       <Route path="consultations/:id" element={<Consultation/>} />
       <Route path="pris-en-charges/:id" element={<Bulletin/>} />
       <Route path="etudiants" element={<Etudiants/>}/>
       <Route path="etudiants/:id/*" element={<Etudiant/>}/>
      {data?.role === 'admin' && <Route path="parametre/*" element={<Paramettre auth={data}/>} />}
      <Route path="*" element={<P404/>}/>
     </Routes>
  </div>
</div>

    </>
  )
}

export default Dashboard