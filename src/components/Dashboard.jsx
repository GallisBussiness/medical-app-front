import { useAuthUser, useSignOut } from "react-auth-kit";
import { useQuery, useQueryClient } from "react-query";
import { Sidebar } from 'primereact/sidebar';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getAuth } from "../services/authservice";
import Paramettre from "./Paramettre";
import Profile from "./Profile";
import { useState } from "react";
import Users from "./Users";
import Etudiants from "./Etudiants";
import Etudiant from "./Etudiant";

const Dashboard = () => {
  const [visible,setVisible] = useState()
  const qc = useQueryClient();
  const auth = useAuthUser()();
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

  return (
    <>
   <div className="px-5 flex items-center justify-between bg-white py-1">
    <button className="menu-icon dw dw-menu" onClick={() => setVisible(true)}></button>
    <div className="hidden w-full md:block md:w-auto">
  <ul className="flex flex-col  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium  md:bg-white">
    <li>
      <Link to="users" className="block py-2 pr-4 pl-3 text-black hover:text-green-600 rounded md:bg-transparent md:p-0">Utilisateurs</Link>
    </li>
    <li>
      <Link to="etudiants" className="block py-2 pr-4 pl-3 text-black hover:text-green-600 rounded md:bg-transparent md:p-0">Etudiants</Link>
    </li>
  </ul>
</div>

    <div className="user-info-dropdown">
      <div className="dropdown">
        <button className="dropdown-toggle" data-toggle="dropdown">
          <span className="">{data?.prenom} {data?.nom}</span>
        </button>
        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
          <Link className="dropdown-item" to="profil"><i className="dw dw-user1" /> Profil</Link>
          <Link className="dropdown-item" to="parametre"><i className="dw dw-settings2" /> Paramétres</Link>
          <button className="dropdown-item" onClick={logout}><i className="dw dw-logout" /> Se Déconnecter</button>
        </div>
    </div>
  </div>
</div>
<div>

<Sidebar visible={visible} onHide={() => setVisible(false)}>
<div>
    <div className="brand-logo mb-10">
      <Link  to="/">
        <img src="/imgs/logo_crousz.png" className="h-16 w-16 mx-auto" alt="logo" />
      </Link>
    </div>
    <div className="menu-block customscroll">
      <div className="sidebar-menu">
        <ul id="accordion-menu">
          <Link to="profil">
            <div className="sidebar-small-cap">Mon Profil</div>
          </Link>
        </ul>
      </div>
    </div>
  </div>
</Sidebar>
 
</div>
<div>
  <div>
  <Routes>
       <Route path="" element={<Profile auth={data}/>} />
       <Route path="profil" element={<Profile auth={data}/>}/>
       <Route path="users" element={<Users auth={data}/>}/>
       <Route path="etudiants" element={<Etudiants/>}/>
       <Route path="etudiants/:id/*" element={<Etudiant/>}/>
       <Route path="parametre/*" element={<Paramettre auth={data}/>} />
     </Routes>
  </div>
</div>

    </>
  )
}

export default Dashboard