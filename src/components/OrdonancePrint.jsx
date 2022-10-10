import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { QRCodeSVG } from "qrcode.react"
import { forwardRef } from "react";

export const OrdonnancePrint = forwardRef(({consultation},ref) => {

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
   <div ref={ref} className="bg-white">
        <div className="flex items-center justify-between py-5 mx-10 bg-white">
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
            {consultation?.date && <h1 className="font-bold text-lg">DATE : {format(parseISO(consultation?.date),'dd-MMMM-yyyy H:m:s', {locale: fr})}</h1>}
        </div>
        <h1>Ziguinchor, le </h1>
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