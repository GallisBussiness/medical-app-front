import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from 'primereact/divider'
import { QRCodeSVG } from "qrcode.react"
import { forwardRef } from "react";

export  const ConsultationPrint = forwardRef(({consultation},ref) => {

    const nombreTemplate = (row) => {
        return <div>
            <Chip label={`${row.nombre} X`} className="bg-amber-300"/>
        </div>
      }
      const frequenceTemplate = (row) => {
        return <div>
          <Chip label={`Par ${row.frequence}`} className="bg-green-300"/>
        </div>
      }

  return (
    <div ref={ref}>
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
            <h1 className="font-bold text-sm">EFFECTUEE PAR : Dr. {consultation?.user?.prenom} {consultation?.user?.nom}</h1>
            <h1 className="font-bold text-sm">EXERCICE : {new Date().getFullYear()}</h1>
            {consultation?.dateDeConsultation && <h1 className="font-bold text-sm">DATE : {format(parseISO(consultation?.dateDeConsultation),'dd-MMMM-yyyy H:m:s', {locale: fr})}</h1>}
        </div>
        <QRCodeSVG value={consultation?.code} fgColor="#25BE45" size={100}/>
        <h1>Ziguinchor, le </h1>
       </div>
    </div>
    <Divider/>
    <div className="flex items-center justify-center py-2 bg-green-400">
    <h1 className="font-bold text-2xl text-white">Fiche de consultation</h1>
    </div>
    <Divider/>
    <div className="flex my-5 items-center justify-between mx-10">
    <div className="flex flex-col space-y-5">
    <h1 className="font-bold text-2xl">INFORMATION DU PATIENT</h1>
    <div className="overflow-x-auto relative">
    <table className="w-full text-sm text-left">
      <tbody>
        <tr>
          <td className="px-6 font-bold text-sm">
            PRENOM ET NOM :
          </td>
          <td className="px-6 font-semibold text-sm">
            {consultation?.etudiant?.prenom} {consultation?.etudiant?.nom}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            CIVILITE :  
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.etudiant?.sexe === 'M' ? 'HOMME' : 'FEMME'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            DATE DE NAISSANCE:
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.etudiant?.dateDeNaissance ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            LIEU DE NAISSANCE:
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.etudiant?.lieuDeNaissance ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            FORMATION :
          </td>
          <td className="px-6 font-semibold text-sm">
            {consultation?.etudiant?.formation?.niveau?.nom} {consultation?.etudiant?.formation?.departement?.nom}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            ADRESSE :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.etudiant?.adresse ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            TELEPHONE :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.etudiant?.telephone ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            GROUPE SANGUIN :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.etudiant?.dossier?.groupe_sanguin ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            ALLERGIES :
          </td>
          <td className="px-6 font-semibold text-sm">
            {consultation?.etudiant?.dossier?.allergies ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            HANDICAP :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.etudiant?.dossier?.handicap_particulier ?? "néant"}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            MALADIES CHRONIQUES :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.etudiant?.dossier?.maladie_chronique ?? 'néant'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
    <Divider layout="vertical"/>
    <div className="flex flex-col space-y-5">
    <h1 className="font-bold text-2xl">DETAIL DE LA CONSULTATION</h1>
    <div className="overflow-x-auto relative">
    <table className="w-full text-sm text-left">
      <tbody>
        <tr>
          <td className="px-6 font-bold text-sm">
            DATE DE CONSULTATION :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.dateDeConsultation && format(parseISO(consultation?.dateDeConsultation),'dd-MMMM-yyyy H:m:s', {locale: fr})}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            TYPE DE CONSULTATION :  
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.type}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            POIDS:
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.poids ? `${consultation?.poids} kg` : 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            TENSION:
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.tension ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            TEMPERATURE :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.temperature ? `${consultation?.temperature} °C` : 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            POULE :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.poule ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            GLYCEMIE :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.glycemie ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            CORPS CETONIQUES :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.corps_cetonique ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            AUTRES :
          </td>
          <td className="px-6 font-semibold text-sm">
            {consultation?.autres ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            PLAINTE DU JOUR :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.plainte_du_jour ?? "néant"}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            BILAN :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.bilan ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            REFERENCE :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.reference ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-sm">
            PROCHAIN RENDEZ-VOUS :
          </td>
          <td className="px-6 font-semibold text-sm">
          {consultation?.prochain_rv && format(parseISO(consultation?.prochain_rv),'dd-MMMM-yyyy H:m:s', {locale: fr})}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
 
    </div>
    
    </div>
    <div className="my-2 px-5">
            <div className="flex items-center justify-center">
            <h6 className="font-bold text-lg my-10">TRAITEMENT PRESCRIT</h6>
            </div>
            <DataTable value={consultation?.traitement}
                       size="small"
                      dataKey="medicament" rowHover 
                      responsiveLayout="scroll"
                      emptyMessage="Aucun médicament prescrit"
                      >
                      
                      <Column field="medicament" header="Medicament" style={{ minWidth: '14rem' }} />
                      <Column field="nombre" header="Nombre" body={nombreTemplate} style={{ minWidth: '14rem' }} />
                      <Column field="frequence" header="Frequence de prise" body={frequenceTemplate} style={{ minWidth: '14rem' }} />
                  </DataTable>
            </div>
            <div className="flex items-center justify-around mt-5 mx-20">
    <h1 className="font-bold text-sm">Le MEDECIN CHEF</h1>
    <h1 className="font-bold text-sm">Le DIRECTEUR</h1>
    </div>
    <div className="flex items-center justify-center mt-32">
    <h1 className="font-bold text-sm">CENTRE REGIONAL DES OEUVRES UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</h1>
    </div>
    </div>
  );
});