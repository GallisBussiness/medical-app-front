import { Link } from 'react-router-dom'
import { FaNewspaper, FaStethoscope, FaUserGraduate } from 'react-icons/fa'
import { getUsers } from '../services/userservice';
import { useQuery } from 'react-query';
import { getConsultations } from '../services/consultationservice';
import { getBulletins } from '../services/bulletinservice';
import { getEtudiants } from '../services/etudiantservice';
import { Chart } from 'primereact/chart'
import { useState } from 'react';

function Statistique({auth}) {

  const [basicData,setBasicData] = useState({})
  const [bulletinData,setBulletinData] = useState({});

  const qk = ['get_users',auth?._id]

  const {data: users } = useQuery(qk, () => getUsers());

  const qkc = ['get_Consultations']

  const {data: Consultations } = useQuery(qkc, () => getConsultations(), {
    onSuccess: (_) => {
         const labels = ["HOMMES","FEMMES"];
          const hommes = _.filter(c=> c?.etudiant?.sexe === "M");
          const femmes = _.filter(c => c?.etudiant?.sexe !== "M");
          const datasets = [{
              label: "Consultation selon le sexe",
              backgroundColor: [`#4464AD`,`#C1292E`],
              data:[hommes.length,femmes.length]
              }];
  
  setBasicData({
      labels,
      datasets
  })
    }

  });

  const  basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .8,
    plugins: {
        legend: {
            labels: {
                color: '#000'
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#4464AD'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        }
    }
};

  const qkb = ['get_Bulletins']

  const {data: Bulletins } = useQuery(qkb, () => getBulletins(), {
    onSuccess:(_) => {
      const labels = ["HOMMES","FEMMES"];
      const hommes = _.filter(c=> c?.etudiant?.sexe === "M");
      const femmes = _.filter(c => c?.etudiant?.sexe !== "M");
      const datasets = [{
          label: "Consultation selon le sexe",
          backgroundColor: [`#${Math.floor(Math.random()*16777215).toString(16)}`,`#${Math.floor(Math.random()*16777215).toString(16)}`],
          data:[hommes.length,femmes.length]
          }];

setBulletinData({
  labels,
  datasets
})
    }
  });

  const qke = ['get_Etudiants']

    const {data: Etudiants } = useQuery(qke, () => getEtudiants());

  return (
    <>
       <div className="flex flex-wrap">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-auto min-w-0 break-words bg-whity shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-col  items-center justify-center md:flex-row -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-start h-full">
              <h5 className="font-bold text-3xl">Statistiques</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/imgs/stats.svg" alt="Statistiques" />
            </div>
          </div>
          <img className="relative z-20 w-96 pt-6 h-32 object-cover" src="/imgs/gif2.gif" alt="gif" />
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-sm font-semibold">Centre Régional des Oeuvres Universitaires Sociales de Ziguinchor</h1>
          <h1 className="text-sm font-semibold">Plateforme de gestion des dossiers médicaux des étudiants</h1>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</div>
<div className="flex flex-col space-y-2 items-center justify-center md:flex-row md:space-x-5 mt-10 mx-10">
    {/* Card */}
    <Link to="/dashboard/allconsultations">
      <div className="flex items-center p-4 bg-primary rounded-lg shadow-xs">
    <div className="p-3 mr-4 bg-white rounded-full">
     <FaStethoscope className="h-6 w-6 text-black" />
    </div>
    <div>
      <p className="mb-2 text-2xl font-semibold text-white uppercase">
        Consultations
      </p>
      <p className="text-2xl font-semibold text-white">
        {Consultations?.length}
      </p>
    </div>
  </div>
    </Link>
  {/* Card */}
  <Link to="/dashboard/allbulletins">
  <div className="flex items-center p-4 bg-green-500 rounded-lg shadow-xs ">
    <div className="p-3 mr-4 bg-whity rounded-full">
     <FaNewspaper className="h-6 w-6 text-blacky"/>
    </div>
    <div>
      <p className="mb-2 text-2xl font-semibold text-white uppercase">
       bulletins
      </p>
      <p className="text-2xl font-semibold text-white">
        {Bulletins?.length}
      </p>
    </div>
  </div>
  </Link>
  
 {/* Card */}
 <Link to="/dashboard/etudiants">
 <div className="flex items-center p-4 bg-secondary rounded-lg shadow-xs">
    <div className="p-3 mr-4 text-blacky bg-whity rounded-full">
      <FaUserGraduate className="h-6 w-6 text-blacky"/>
    </div>
    <div>
      <p className="mb-2 text-2xl font-semibold text-white uppercase">
        Etudiants
      </p>
      <p className="text-2xl font-semibold text-white">
        {Etudiants?.length}
      </p>
    </div>
  </div>
 </Link>
 
   {/* Card */}
   <Link to="/dashboard/users">
   <div className="flex items-center p-4 bg-primary rounded-lg shadow-xs">
    <div className="p-3 mr-4 text-black bg-white rounded-full">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    </div>
    <div>
      <p className="mb-2 text-2xl font-semibold text-white uppercase">
        Utilisateurs
      </p>
      <p className="text-2xl font-semibold text-white">
        {users?.length}
      </p>
    </div>
  </div>
   </Link>
</div>
<div className="flex flex-col my-10 mx-10 bg-white opacity-80 space-y-2 py-5 px-10">
<h1 className="font-bold text-3xl">CONSULTATION / SEXE </h1>
  <div className="flex flex-col items-center space-y-10 md:flex-row md:space-x-10">
    <div className="w-full">
      <Chart type="bar" data={basicData} options={basicOptions} />
    </div>
    <div className="w-full">
      <Chart type="doughnut" data={basicData} options={basicOptions} />
    </div>
    
  </div>

</div>
<div className="flex flex-col my-10 mx-10 bg-white  opacity-80 space-y-2 py-5 px-10">
<h1 className="font-bold text-3xl">Prise en charge / SEXE </h1>
  <div className="flex flex-col items-center space-y-10 md:flex-row md:space-x-10">
    <div className="w-full">
      <Chart type="bar" data={bulletinData} options={basicOptions} />
    </div>
    <div className="w-full">
      <Chart type="doughnut" data={bulletinData} options={basicOptions} />
    </div>
    
  </div>

</div>
    </>
  )
}

export default Statistique