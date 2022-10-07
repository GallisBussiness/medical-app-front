import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Divider } from 'primereact/divider'
import { QRCodeSVG } from "qrcode.react"
import { forwardRef } from "react";

export const OrdonnancePrint = forwardRef(({consultation},ref) => {
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
   </div> 
);
});