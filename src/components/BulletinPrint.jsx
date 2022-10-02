import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Divider } from 'primereact/divider'
import { QRCodeSVG } from "qrcode.react"
import { forwardRef } from "react";

export  const BulletinPrint = forwardRef(({bulletin},ref) => {

  return (
    <div ref={ref} className="bg-white">
    <div className="flex items-center justify-between py-5 mx-10 bg-white">
       <div className="flex flex-col items-center space-y-1">
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-sm">REPUBLIQUE DU SENEGAL</h1>
            <h1>un peuple - un But - Une Foi</h1>
            <h1>------------------</h1>
            <img src="/imgs/drapeau.png" alt="logo" className="h-16 w-16 object-cover"/>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-sm">MINISTERE DE L'ENSEIGNEMENT SUPPERIEUR <br /> DE LA RECHERCHE ET DE L'INNOVATION</h1>
            <h1>------------------</h1>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-sm">CENTRE REGIONAL DES OEUVRES <br />
                        UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</h1>
                        <img src="/imgs/logo_crousz.png" alt="logo" className="h-24 w-24 object-cover"/>
            <h1 className="font-bold text-sm uppercase underline">DIVISION MEDICO SOCIALE</h1>
        </div>
       </div>
       <div className="flex flex-col space-y-3">
       <div className="flex flex-col">
            <h1 className="font-bold text-sm">EFFECTUEE PAR : Dr. {bulletin?.user?.prenom} {bulletin?.user?.nom}</h1>
            <h1 className="font-bold text-sm">EXERCICE : {new Date().getFullYear()}</h1>
            {bulletin?.date && <h1 className="font-bold text-sm">DATE : {format(parseISO(bulletin?.date),'dd-MMMM-yyyy H:m:s', {locale: fr})}</h1>}
        </div>
        <QRCodeSVG value={bulletin?.code} fgColor="#25BE45" size={100}/>
        <h1>Ziguinchor, le </h1>
       </div>
    </div>
    <Divider/>
    <div className="flex items-center justify-center py-2 bg-green-400">
    <h1 className="font-bold text-2xl text-white uppercase">bulletin de prise en charge</h1>
    </div>
    <Divider/>
    <div className="flex my-5 items-center justify-between mx-10">
    <div className="flex flex-col space-y-5">
    <h1 className="font-bold text-2xl">BENEFICIAIRE</h1>
    <div className="overflow-x-auto relative">
    <table className="w-full text-sm text-left">
      <tbody>
        <tr>
          <td className="px-6 font-bold text-sm">
            PRENOM(S) :
          </td>
          <td className="px-6 font-semibold text-sm">
            {bulletin?.etudiant?.prenom} 
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            NOM :  
          </td>
          <td className="px-6 font-semibold text-sm">
          {bulletin?.etudiant?.nom}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            NIVEAU:
          </td>
          <td className="px-6 font-semibold text-sm">
          {bulletin?.etudiant?.formation?.niveau?.nom ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            DEPARTEMENT:
          </td>
          <td className="px-6 font-semibold text-sm">
          {bulletin?.etudiant?.formation?.departement?.nom ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            UFR:
          </td>
          <td className="px-6 font-semibold text-sm">
          {bulletin?.etudiant?.formation?.departement?.ufr?.nom ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            N° CARTE ETUDIANT:
          </td>
          <td className="px-6 font-semibold text-sm">
          {bulletin?.etudiant?.nce ?? 'néant'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
    <Divider layout="vertical"/>
    <div className="flex flex-col space-y-5">
    <h1 className="font-bold text-2xl">RENSEIGNEMENTS MEDICAUX</h1>
    <div className="overflow-x-auto relative">
    <table className="w-full text-sm text-left">
      <tbody>
        <tr>
          <td className="px-6 font-bold text-sm">
            EXAMENS DEMANDES :
          </td>
          <td className="px-6 font-semibold text-sm">
          {bulletin?.examensDemandes ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            ETABLISSEMENT DE SOINS :  
          </td>
          <td className="px-6 font-semibold text-sm">
          {bulletin?.etablissement?.nom}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            SERVICE MEDICAL:
          </td>
          <td className="px-6 font-semibold text-sm">
          {bulletin?.service ?? 'néant'}
          </td>
        </tr>
    
      </tbody>
    </table>
  </div>
    </div>
    </div>
    <div className="flex justify-center mt-2">
    <h1 className="font-semibold text-sm">Part à charge du CROUS/Z 5/5</h1>
    </div>
    <div className="flex items-center justify-around mt-5 mx-20">
    <h1 className="font-bold text-sm">LE MEDECIN CHEF</h1>
    <h1 className="font-bold text-sm">LE DIRECTEUR</h1>
    </div>
    <div className="flex items-center justify-center mt-96">
    <h1 className="font-bold text-sm">CENTRE REGIONAL DES OEUVRES UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</h1>
    </div>
    </div>
  );
});