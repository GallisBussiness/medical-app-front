import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useQuery, useQueryClient } from "react-query";
import { Sidebar } from 'primereact/sidebar';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { getAuth } from "../services/authservice";
import { useEffect, useState } from "react";
import Users from "./Users";
import Etudiants from "./Etudiants";
import Etudiant from "./Etudiant";
import Consultation from "./Consultation";
import Bulletin from "./Bulletin";
import "./bg.css"
import Statistique from "./Statistique";
import {useMedia} from 'react-use';
import ConsultationsAll from "./ConsultationsAll";
import BulletinsAll from "./BulletinsAll";
import P404 from "./P404";
import { ActionIcon } from "@mantine/core";
import { MdDashboard } from "react-icons/md";

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
    onError: (_) => {
      if(_.response.data.statusCode === 440) {
        logout();
      }
    },
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
    <div className="flex flex-col min-h-screen justify-start">
   <div className="px-5 flex items-center justify-between bg-green-500 py-1">
    {isWide && <ActionIcon onClick={() => setVisible(true)}>
      <MdDashboard className="text-white h-6 w-6" />
      </ActionIcon>}
    {!isWide && <div className="w-2/5 flex space-x-2 items-center justify-center"><Link  to="/" className="p-2 rounded-full bg-whity">
        <img src="/imgs/logo_crousz.png" className="h-8 w-8 mx-auto object-contain" alt="logo" />
      </Link> <span className="text-white font-semibold">CROUS/Z</span></div>}
    <div className="hidden w-full md:flex justify-end items-center mx-10 bg-green-500">
  <ul className="flex flex-col  md:flex-row md:space-x-1 md:mt-0 md:text-sm md:font-medium">
   {data?.role === 'admin' && <li>
      <Link to="statistiques" className="block py-2 px-4 text-whity rounded-md uppercase font-bold hover:text-green-500 hover:bg-white ">Acceuil</Link>
    </li>}
    <li>
      <Link to="allconsultations" className="block py-2 px-4 text-whity rounded-md uppercase font-bold hover:text-green-500 hover:bg-white">Consultations</Link>
    </li>
    <li>
      <Link to="allbulletins" className="block py-2 px-4 text-whity rounded-md uppercase font-bold hover:text-green-500 hover:bg-white">Prises en charge</Link>
    </li>
    <li>
      <Link to="etudiants" className="block py-2 px-4 text-whity rounded-md uppercase font-bold hover:text-green-500 hover:bg-white">Etudiants</Link>
    </li>
    {data?.role === 'admin' && <li>
      <Link to="users" className="block py-2 px-4 text-whity rounded-md uppercase font-bold hover:text-green-500 hover:bg-white">Utilisateurs</Link>
    </li>}
    <li><button className="block py-2 px-4 text-whity rounded-md uppercase font-bold hover:text-green-500 hover:bg-white" onClick={logout}><i className="dw dw-logout" /> Se Déconnecter</button></li>
  </ul>
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
<div>
  <div>
  <Routes>
      <Route path="" element={<Statistique auth={data}/>}/>
      {data?.role === 'admin' && <Route path="users" element={<Users auth={data}/>}/>}
      {data?.role === 'admin' && <Route path="statistiques" element={<Statistique auth={data}/>}/>}
       <Route path="allconsultations" element={<ConsultationsAll/>} />
       <Route path="allbulletins" element={<BulletinsAll/>} />
       <Route path="consultations/:id" element={<Consultation/>} />
       <Route path="pris-en-charges/:id" element={<Bulletin/>} />
       <Route path="etudiants" element={<Etudiants auth={data}/>}/>
       <Route path="etudiants/:id/*" element={<Etudiant/>}/>
      <Route path="*" element={<P404/>}/>
     </Routes>
  </div>
</div>
<footer className="mt-auto p-4 bg-green-500 md:p-6 text-white">
      <span className="text-sm sm:text-center">© 2023 <span  className="hover:underline">DME CROUSZ</span>.CELLULE INFORMATIQUE CROUSZ, TOUS DROITS RESERVES.
      </span>
  </footer>
    </div>
  )
}

export default Dashboard