import { Text } from "@mantine/core";
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
      <div className="m-4">
      <div className="flex items-center justify-between py-2 mx-10 bg-white">
       <div className="flex flex-col items-center space-y-1">
        <div className="flex flex-col items-center">
            <Text fw="bol" size={12}>REPUBLIQUE DU SENEGAL</Text>
            <Text fw="bold" size={10}>un peuple - un But - Une Foi</Text>
            <Text size={8}>------------------</Text>
            <img src="/imgs/drapeau.png" alt="logo" className="h-16 w-16 object-cover"/>
        </div>
        <div className="flex flex-col items-center">
            <Text size={12}>MINISTERE DE L'ENSEIGNEMENT SUPPERIEUR DE LA RECHERCHE ET DE L'INNOVATION</Text>
            <Text size={8}>------------------</Text>
        </div>
       </div>
       <div className="flex flex-col space-y-1">
       <div className="flex flex-col items-center">
            <Text size={12}>CENTRE REGIONAL DES OEUVRE UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</Text>
                        <img src="/imgs/logo_crousz.png" alt="logo" className="h-16 w-16 object-cover"/>
            <Text size={10} >DIVISION MEDICO SOCIALE</Text>
        </div>
       
        <Text fw="bold" size={12}>Ziguinchor, le </Text>
       </div>
    </div>
    <Divider/>
    <div className="flex items-center justify-center py-2 bg-green-400">
    <Text fw="bold" size={14} className="text-white uppercase">Fiche de consultation {consultation?.type}</Text>
    </div>
    <Divider/>
    <div className="flex my-3 items-center justify-between mx-5">
    <div className="flex flex-col space-y-2">
    <Text fw="bol">INFORMATION DU PATIENT</Text>
    <div className="overflow-x-auto relative">
    <table className="w-full text-xs text-left">
      <tbody>
        <tr>
          <td className=" text-xs">
            PRENOM & NOM :
          </td>
          <td className="px-6 font-semibold text-xs">
            {consultation?.dossier?.etudiant?.prenom} {consultation?.dossier?.etudiant?.nom}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            SEXE :  
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.dossier?.etudiant?.sexe === 'M' ? 'HOMME' : 'FEMME'}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            NE(E) LE:
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.dossier?.etudiant?.dateDeNaissance && format(parseISO(consultation?.dossier?.etudiant?.dateDeNaissance),'dd-MMMM-yyyy', {locale: fr})}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            A :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.dossier?.etudiant?.lieuDeNaissance ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            FORMATION :
          </td>
          <td className="px-6 font-semibold text-xs">
            {consultation?.dossier?.etudiant?.formation}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            ADRESSE :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.dossier?.etudiant?.adresse ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            TELEPHONE :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.dossier?.etudiant?.telephone ?? 'néant'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
    <Divider layout="vertical"/>
    <div className="flex flex-col space-y-5">
    <Text size={12} fw="bold">DOSSIER MEDICAL</Text>
    <div className="overflow-x-auto relative">
    <table className="w-full text-xs text-left">
      <tbody>
        <tr>
          <td className=" text-xs">
            GROUPE SANGUIN :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.etudiant?.dossier?.groupe_sanguin ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            ALLERGIES :
          </td>
          <td className="px-6 font-semibold text-xs">
            {consultation?.etudiant?.dossier?.allergies ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            HANDICAP :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.etudiant?.dossier?.handicap_particulier ?? "néant"}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            MALADIES CHRONIQUES :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.etudiant?.dossier?.maladie_chronique ?? 'néant'}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    </div>
    </div>
    <div className="flex flex-col space-y-2 mx-2">
    <Text size={12} fw="bold">DETAIL DE LA CONSULTATION</Text>
    <div className="overflow-hiden relative">
      <table>
        <tbody>
        <tr className="my-2">
          <td className=" text-xs">
            POIDS :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.poids ? <Chip label={`${consultation?.poids} kg`} className="bg-amber-300"/> : 'néant'}
          </td>
          <td className=" text-xs">
            Taille :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.taille ? <Chip label={`${consultation?.taille} cm`} className="bg-blue-300"/> : 'néant'}
          </td>
          <td className=" text-xs">
            TENSION :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.tension ? <Chip label={`${consultation?.tension} `} className="bg-green-300"/> : 'néant'}
          </td>
          <td className=" text-xs">
            TEMPERATURE:
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.temperature ? <Chip label={`${consultation?.temperature}`} className="bg-purple-300"/> : 'néant'}
          </td>
        </tr>
      
        <tr>
          <td className=" text-xs">
            POULS :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.poule ? <Chip label={`${consultation?.poule} `} className="bg-blue-300"/> : 'néant'}
          </td>
          <td className=" text-xs">
          GLYCEMIE :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.glycemie ? <Chip label={`${consultation?.glycemie}`} className="bg-green-300"/> : 'néant'}
          </td>
          <td className=" text-xs">
          CORPS CETONIQUES :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.corps_cetonique ? <Chip label={`${consultation?.corps_cetonique}`} className="bg-amber-300"/> : 'néant'}
          </td>
        </tr>
        </tbody>
      </table>
    <table className="w-full text-xs my-2">
      <tbody>
        <tr>
          <td className=" text-xs">
            AUTRES :
          </td>
          <td className="px-6 font-semibold text-xs">
            {consultation?.autres ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            PLAINTE DU JOUR :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.plainte_du_jour ?? "néant"}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            EXAMEN :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.examen ?? "néant"}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            DIAGNOSTIQUE :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.diagnostique ?? "néant"}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            BILAN :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.bilan ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            REFERENCE :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.reference ?? 'néant'}
          </td>
        </tr>
        <tr>
          <td className=" text-xs">
            PROCHAIN RENDEZ-VOUS :
          </td>
          <td className="px-6 font-semibold text-xs">
          {consultation?.prochain_rv && format(parseISO(consultation?.prochain_rv),'dd-MMMM-yyyy', {locale: fr})}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
 
    </div>
    <div className="my-2 px-5">
            <div className="flex items-center justify-center">
            <Text size={12} fw="bold">TRAITEMENT PRESCRIT</Text>
            </div>
            <DataTable value={consultation?.traitement}
                       size="small"
                      dataKey="medicament"
                      emptyMessage="Aucun médicament prescrit"
                      >
                      
                      <Column field="medicament" header="Medicament" style={{ minWidth: '4rem' }} />
                      <Column field="nombre" header="Posologie" body={nombreTemplate} style={{ minWidth: '4rem' }} />
                      <Column field="frequence" header="Frequence de prise" body={frequenceTemplate} style={{ minWidth: '4rem' }} />
                  </DataTable>
            </div>
    <div className="flex flex-col items-center justify-end h-5  mt-10">
    <h1 className="font-bold text-xs">CENTRE REGIONAL DES OEUVRES UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</h1>
    </div>
    <div className="flex items-center justify-between my-5 mx-5">
    <QRCodeSVG value={consultation?.code} fgColor="#25BE45" size={100}/>
    <div className="flex flex-col">
            <h1 className="font-bold text-xs">EFFECTUEE PAR : Dr. {consultation?.user?.prenom} {consultation?.user?.nom}</h1>
            <h1 className="font-bold text-xs">EXERCICE : {new Date().getFullYear()}</h1>
            {consultation?.dateDeConsultation && <h1 className="font-bold text-xs">DATE : {format(parseISO(consultation?.dateDeConsultation),'dd-MMMM-yyyy H:m:s', {locale: fr})}</h1>}
        </div>
    </div>
      </div>
    </div>
  );
});