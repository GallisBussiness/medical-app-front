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
    <div className="flex items-center justify-between py-2 mx-10 bg-white">
       <div className="flex flex-col items-center space-y-1">
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-lg">REPUBLIQUE DU SENEGAL</h1>
            <h1>un peuple - un But - Une Foi</h1>
            <h1>------------------</h1>
            <img src="/imgs/drapeau.png" alt="logo" className="h-16 w-16 object-cover"/>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-lg">MINISTERE DE L'ENSEIGNEMENT SUPPERIEUR <br /> DE LA RECHERCHE ET DE L'INNOVATION</h1>
            <h1>------------------</h1>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-lg">CENTRE REGIONAL DES OEUVRES <br />
                        UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</h1>
                        <img src="/imgs/logo_crousz.png" alt="logo" className="h-24 w-24 object-cover"/>
            <h1 className="font-bold text-lg uppercase underline">DIVISION MEDICO SOCIALE</h1>
        </div>
       </div>
       <div className="flex flex-col space-y-3">
       <div className="flex flex-col">
            <h1 className="font-bold text-lg">EFFECTUEE PAR : Dr. {consultation?.user?.prenom} {consultation?.user?.nom}</h1>
            <h1 className="font-bold text-lg">EXERCICE : {new Date().getFullYear()}</h1>
            {consultation?.dateDeConsultation && <h1 className="font-bold text-lg">DATE : {format(parseISO(consultation?.dateDeConsultation),'dd-MMMM-yyyy H:m:s', {locale: fr})}</h1>}
        </div>
        <h1>Ziguinchor, le </h1>
       </div>
    </div>
    <Divider/>
    <div className="flex items-center justify-center py-2 bg-green-400">
    <h1 className="font-bold text-2xl text-white uppercase">Fiche de consultation {consultation?.type}</h1>
    </div>
    <Divider/>
    <div className="flex my-5 items-center justify-between mx-5">
    <div className="flex flex-col space-y-5">
    <h1 className="font-bold text-2xl">INFORMATION DU PATIENT</h1>
    <div className="overflow-x-auto relative">
    <table className="w-full text-lg text-left">
      <tbody>
        <tr>
          <td className="px-6 font-bold text-lg">
            PRENOM & NOM :
          </td>
          <td className="px-6 font-semibold text-lg">
            {consultation?.etudiant?.prenom} {consultation?.etudiant?.nom}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            SEXE :  
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.etudiant?.sexe === 'M' ? 'HOMME' : 'FEMME'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            NE(E) LE:
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.etudiant?.dateDeNaissance ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            A :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.etudiant?.lieuDeNaissance ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            FORMATION :
          </td>
          <td className="px-6 font-semibold text-lg">
            {consultation?.etudiant?.formation?.niveau?.nom} {consultation?.etudiant?.formation?.departement?.nom}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            ADRESSE :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.etudiant?.adresse ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            TELEPHONE :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.etudiant?.telephone ?? 'néant'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
    <Divider layout="vertical"/>
    <div className="flex flex-col space-y-5">
    <h1 className="font-bold text-2xl">DOSSIER MEDICAL</h1>
    <div className="overflow-x-auto relative">
    <table className="w-full text-lg text-left">
      <tbody>
        <tr>
          <td className="px-6 font-bold text-lg">
            GROUPE SANGUIN :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.etudiant?.dossier?.groupe_sanguin ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            ALLERGIES :
          </td>
          <td className="px-6 font-semibold text-lg">
            {consultation?.etudiant?.dossier?.allergies ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            HANDICAP :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.etudiant?.dossier?.handicap_particulier ?? "néant"}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            MALADIES CHRONIQUES :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.etudiant?.dossier?.maladie_chronique ?? 'néant'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
    </div>
    <div className="flex flex-col space-y-5 mx-10">
    <h1 className="font-bold text-2xl">DETAIL DE LA CONSULTATION</h1>
    <div className="overflow-x-auto relative">
      <table>
        <tbody>
        <tr className="my-2">
          <td className="px-6 font-bold text-lg">
            POIDS :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.poids ? <Chip label={`${consultation?.poids} kg`} className="bg-amber-300"/> : 'néant'}
          </td>
          <td className="px-6 font-bold text-lg">
            TENSION :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.tension ? <Chip label={`${consultation?.tension} `} className="bg-amber-300"/> : 'néant'}
          </td>
          <td className="px-6 font-bold text-lg">
            TEMPERATURE:
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.temperature ? <Chip label={`${consultation?.temperature}`} className="bg-amber-300"/> : 'néant'}
          </td>
        </tr>
      
        <tr>
          <td className="px-6 font-bold text-lg">
            POULS :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.poule ? <Chip label={`${consultation?.poule} `} className="bg-amber-300"/> : 'néant'}
          </td>
          <td className="px-6 font-bold text-lg">
          GLYCEMIE :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.glycemie ? <Chip label={`${consultation?.glycemie}`} className="bg-amber-300"/> : 'néant'}
          </td>
          <td className="px-6 font-bold text-lg">
          CORPS CETONIQUES ::
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.corps_cetonique ? <Chip label={`${consultation?.corps_cetonique}`} className="bg-amber-300"/> : 'néant'}
          </td>
        </tr>
        </tbody>
      </table>
    <table className="w-full text-lg text-left">
      <tbody>
        <tr>
          <td className="px-6 font-bold text-lg">
            AUTRES :
          </td>
          <td className="px-6 font-semibold text-lg">
            {consultation?.autres ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            PLAINTE DU JOUR :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.plainte_du_jour ?? "néant"}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            BILAN :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.bilan ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            REFERENCE :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.reference ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className="px-6 font-bold text-lg">
            PROCHAIN RENDEZ-VOUS :
          </td>
          <td className="px-6 font-semibold text-lg">
          {consultation?.prochain_rv && format(parseISO(consultation?.prochain_rv),'dd-MMMM-yyyy H:m:s', {locale: fr})}
          </td>
        </tr>
      </tbody>
    </table>
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
                      <Column field="nombre" header="Posologie" body={nombreTemplate} style={{ minWidth: '14rem' }} />
                      <Column field="frequence" header="Frequence de prise" body={frequenceTemplate} style={{ minWidth: '14rem' }} />
                  </DataTable>
            </div>
            <div className="flex items-center justify-around mt-5 mx-20">
    <h1 className="font-bold text-lg">LE MEDECIN CHEF</h1>
    <h1 className="font-bold text-lg">LE DIRECTEUR</h1>
    </div>
    <div className="flex flex-col items-center justify-end h-96">
    <h1 className="font-bold text-lg">CENTRE REGIONAL DES OEUVRES UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</h1>
    </div>
    <div className="flex items-center justify-end my-5 mx-5">
    <QRCodeSVG value={consultation?.code} fgColor="#25BE45" size={100}/>
    </div>
    </div>
  );
});