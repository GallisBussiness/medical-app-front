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

const Dashboard = () => {
  const [visible,setVisible] = useState()
  const qc = useQueryClient();
  const auth = useAuthUser()();
  const hasAuth = useIsAuthenticated()()
  const navigate = useNavigate();
  const signOut = useSignOut()

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
   <div className="px-5 flex items-center justify-between bg-white py-1">
    <button className="menu-icon dw dw-menu" onClick={() => setVisible(true)}></button>
    <div className="hidden w-full md:flex justify-end items-center mx-10 ">
  <ul className="flex flex-col  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium  md:bg-white">
   {data?.role === 'admin' && <li>
      <Link to="statistiques" className="block py-2 text-black hover:text-green-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Statistiques</Link>
    </li>}
    {data?.role === 'admin' && <li>
      <Link to="users" className="block py-2 text-black hover:text-green-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Utilisateurs</Link>
    </li>}
    <li>
      <Link to="etudiants" className="block py-2 text-black hover:text-green-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Etudiants</Link>
    </li>
  </ul>
</div>

    <div className="user-info-dropdown">
      <div className="dropdown">
        <button className="dropdown-toggle" data-toggle="dropdown">
          <span className="font-bold uppercase">{data?.prenom} {data?.nom}</span>
        </button>
        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
          <Link className="dropdown-item" to="profil"><i className="dw dw-user1" /> Profil</Link>
         {data?.role === 'admin' && <Link className="dropdown-item" to="parametre"><i className="dw dw-settings2" /> Paramétres</Link>}
          <button className="dropdown-item" onClick={logout}><i className="dw dw-logout" /> Se Déconnecter</button>
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
      <Link to="statistiques" className="block py-2 text-black hover:text-green-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Statistiques</Link>
    </li>}
    {data?.role === 'admin' && <li>
      <Link to="users" className="block py-2 text-black hover:text-green-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Utilisateurs</Link>
    </li>}
    <li>
      <Link to="etudiants" className="block py-2 text-black hover:text-green-600 rounded md:bg-transparent md:p-0 uppercase font-bold">Etudiants</Link>
    </li>
        </ul>
      </div>
    </div>
  </div>
</Sidebar>
 
</div>
<div className="bg-pattern">
  <div>
  <Routes>
       <Route path="" element={<Profile auth={data}/>} />
       <Route path="profil" element={<Profile auth={data}/>}/>
      {data?.role === 'admin' && <Route path="users" element={<Users auth={data}/>}/>}
      {data?.role === 'admin' && <Route path="statistiques" element={<Statistique auth={data}/>}/>}
       <Route path="consultations/:id" element={<Consultation/>} />
       <Route path="pris-en-charges/:id" element={<Bulletin/>} />
       <Route path="etudiants" element={<Etudiants/>}/>
       <Route path="etudiants/:id/*" element={<Etudiant/>}/>
      {data?.role === 'admin' && <Route path="parametre/*" element={<Paramettre auth={data}/>} />}
     </Routes>
  </div>
</div>

    </>
  )
}

export default Dashboard