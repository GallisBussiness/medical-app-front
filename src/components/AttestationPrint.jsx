import { Divider, Text } from "@mantine/core";
import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { QRCodeSVG } from "qrcode.react"
import { forwardRef } from "react";

export  const AttestationPrint = forwardRef(({dossier},ref) => {


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
        <div className="flex flex-col items-center text-center">
            <Text size={12}>MINISTERE DE L'ENSEIGNEMENT SUPPERIEUR DE LA RECHERCHE ET DE L'INNOVATION</Text>
            <Text size={8}>------------------</Text>
        </div>
       </div>
       <div className="flex flex-col space-y-1">
       <div className="flex flex-col items-center text-center">
            <Text size={12}>CENTRE REGIONAL DES OEUVRE UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</Text>
                        <img src="/imgs/logo_crousz.png" alt="logo" className="h-16 w-16 object-cover"/>
            <Text size={10} >DIVISION MEDICO SOCIALE</Text>
        </div>
  
       </div>
    </div>
    <div className="flex items-center justify-center py-2 bg-green-400 mt-20">
    <Text size={20} fw="bold" className="text-white font-roboto uppercase">Attestation de visite médicale</Text>
    </div>
    <div className="mx-10 my-24">
        <Text size={20} className="font-roboto">
            Je soussigné, <span className="font-bold"> DR. Amadou P. K. Koïta</span>, Medecin Chef du CROUS/Z atteste que {dossier?.etudiant?.sexe === "H" ? "Me " : "Mme " } <span className="font-bold">{dossier?.etudiant?.prenom} {dossier?.etudiant?.nom} </span>  {' '}
            {dossier?.etudiant?.sexe === "H" ? "Né " : "Née " } le {format(parseISO(dossier?.etudiant?.dateDeNaissance), "dd/MM/yyyy", {locale: fr})} à {dossier?.etudiant?.lieuDeNaissance} et de numéro de carte d'identité nationale {' '}
             <span className="font-bold">{dossier?.etudiant?.cni} </span>  a effectué  sa visite médicale. <br />
             Par conséquent, {dossier?.etudiant?.sexe === "H" ? "il " : "elle " } est {dossier?.etudiant?.sexe === "H" ? "déclaré " : "déclarée " } apte. <br /><br />
             En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.
        </Text>
    </div>
      <div className="flex justify-end mx-10">
            {dossier?.createdAt && <Text size={18} fw="bold">Ziguinchor, le : {format(parseISO(dossier?.createdAt),'dd-MMMM-yyyy', {locale: fr})}</Text>}
        </div>
    <div className="flex items-center justify-end mt-5 mx-20">
    <Text size={22} className="font-roboto">LE MEDECIN CHEF</Text>
    </div>
    <div className="flex items-center justify-start mt-32">
    <QRCodeSVG value={`/dashbord/etudiants/${dossier?.etudiant?._id}`} fgColor="#25BE45" size={60}/>
    
    </div>
    <div className="flex items-center justify-center my-2 mx-5">
    <Text size={12} fw="bold">CENTRE REGIONAL DES OEUVRES UNIVERSITAIRES SOCIALES DE ZIGUINCHOR</Text>
    </div>
       <div className="mt-2">
        <Divider />
        <Text size={12} fw="bold" className="text-center">Kénia sur la route de l'université - BP 1012 - TEL: 33 990 17 20 - FAX: 33 990 17 35 </Text>
       </div>
      </div>
    </div>
  );
});