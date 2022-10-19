import { Link } from 'react-router-dom'
import { BiStats } from 'react-icons/bi'
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
              backgroundColor: [`#${Math.floor(Math.random()*16777215).toString(16)}`,`#${Math.floor(Math.random()*16777215).toString(16)}`],
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
                color: '#495057'
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
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-whity shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
        <Link  to="/">
        <img src="/imgs/logo_crousz.png" className="h-20 w-20 mx-auto object-cover" alt="logo" />
      </Link>
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full">
              <h5 className="font-bold text-3xl">Statistiques</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/imgs/stats.svg" alt="Statistiques" />
            </div>
          </div>
          <div className="max-w-full h-40 px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 hidden lg:block">
            <div className="h-full bg-gradient-to-tl from-primary to-blue-300 rounded-xl">
              <div className="relative flex items-center justify-center h-full">
                        <BiStats className="h-32 w-32 bg-white text-danger rounded-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 my-10">
  {/* Card */}
   
  <div className="flex items-center p-4 bg-blue-500 rounded-lg shadow-xs">
    <div className="p-3 mr-4 text-black bg-white rounded-full">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    </div>
    <div>
      <p className="mb-2 text-3xl font-semibold text-white uppercase">
        Total Utilisateurs
      </p>
      <p className="text-3xl font-semibold text-white">
        {users?.length}
      </p>
    </div>
  </div>
  {/* Card */}
  <div className="flex items-center p-4 bg-fuchsia-500 rounded-lg shadow-xs">
    <div className="p-3 mr-4 text-teal-800 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-800">
      <FaUserGraduate className="h-6 w-6 text-white"/>
    </div>
    <div>
      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Total Etudiants
      </p>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {Etudiants?.length}
      </p>
    </div>
  </div>
  {/* Card */}
  <div className="flex items-center p-4 bg-red-400 rounded-lg shadow-xs">
    <div className="p-3 mr-4 text-blue-500 bg-white rounded-full">
     <FaStethoscope className="h-6 w-6 text-black" />
    </div>
    <div>
      <p className="mb-2 text-3xl font-semibold text-white uppercase">
        Consultations
      </p>
      <p className="text-3xl font-semibold text-white">
        {Consultations?.length}
      </p>
    </div>
  </div>
  {/* Card */}
  <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
     <FaNewspaper className="h-6 w-6 text-white"/>
    </div>
    <div>
      <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Total bulletins de pris en charge
      </p>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {Bulletins?.length}
      </p>
    </div>
  </div>

</div>
<div className="flex flex-col my-10 mx-10 bg-white space-y-2 py-5 px-10">
<h1 className="font-bold text-3xl">CONSULTATION / SEXE </h1>
  <div className="flex items-center space-x-10">
    <div className="w-full">
      <Chart type="bar" data={basicData} options={basicOptions} />
    </div>
    <div className="w-full">
      <Chart type="doughnut" data={basicData} options={basicOptions} />
    </div>
    
  </div>

</div>
<div className="flex flex-col my-10 mx-10 bg-white space-y-2 py-5 px-10">
<h1 className="font-bold text-3xl">Prise en charge / SEXE </h1>
  <div className="flex items-center space-x-10">
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