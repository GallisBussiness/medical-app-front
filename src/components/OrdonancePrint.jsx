import { Text } from "@mantine/core";
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
    <div className="my-2 px-5">
            <div className="flex items-center justify-center">
            <Text size={12} fw="bold">TRAITEMENT PRESCRIT</Text>
            </div>
            <DataTable value={consultation?.traitement}
                       size="small"
                      dataKey="medicament"
                      responsiveLayout="scroll"
                      emptyMessage="Aucun médicament prescrit"
                      >
                      
                      <Column field="medicament" header="Medicament" style={{ minWidth: '4rem' }} />
                      <Column field="nombre" header="Posologie" body={nombreTemplate} style={{ minWidth: '4rem' }} />
                      <Column field="frequence" header="Frequence de prise" body={frequenceTemplate} style={{ minWidth: '4rem' }} />
                  </DataTable>
            </div>
    <div className="flex flex-col items-center justify-end h-96">
    <Text size={14} fw="bold">CENTRE REGIONAL DES OEUVRES UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</Text>
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