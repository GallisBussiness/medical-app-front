import { useState } from "react";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../services/authservice";

const Dashboard = () => {
  const qc = useQueryClient();
  const auth = useAuthUser()();
  const navigate = useNavigate();
  const [showSidebar,setShowSidebar] = useState(true);
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
   <div className="header flex items-center justify-between">
    <div onClick={(e) => setShowSidebar(v => !v)} class="menu-icon dw dw-menu cursor-pointer"></div>
    <div className="user-info-dropdown">
      <div className="dropdown">
        <a className="dropdown-toggle" href="!#" role="button" data-toggle="dropdown">
          <span className="user-icon">
            {/* <img src="vendors/images/photo1.jpg" alt /> */}
          </span>
          <span className="user-name">{data?.prenom} {data?.nom}</span>
        </a>
        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
          <a className="dropdown-item" href="profile.html"><i className="dw dw-user1" /> Profil</a>
          <a className="dropdown-item" href="profile.html"><i className="dw dw-settings2" /> Paramétres</a>
          <button className="dropdown-item" onClick={logout}><i className="dw dw-logout" /> Se Déconnecter</button>
        </div>
    </div>
  </div>
</div>
<div>
  {showSidebar &&  <>
  <div className="left-side-bar">
    <div className="brand-logo mb-10">
      <a href="/">
        <img src="/imgs/logo_crousz.png" className="h-16 w-16 mx-auto" alt="logo" />
      </a>
      <div className="close-sidebar" data-toggle="left-sidebar-close">
        <i className="ion-close-round" />
      </div>
    </div>
    <div className="menu-block customscroll">
      <div className="sidebar-menu">
        <ul id="accordion-menu">
          <li>
            <div className="sidebar-small-cap">Extra</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
   <div className="mobile-menu-overlay" />
   </>
  }
 
</div>
<div className="main-container">
  <div className={showSidebar ? 'pd-ltr-20' : ''}>
    My content
  </div>
</div>

    </>
  )
}

export default Dashboard