import { Text } from "@mantine/core";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Divider } from "primereact/divider";
import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";

export const BulletinPrint = forwardRef(({ bulletin }, ref) => {
  // console.log(bulletin)

  return (
    <div ref={ref} className="bg-white">
      <div className="m-4">
        <div className="flex items-center justify-between py-2 mx-10 bg-white">
          <div className="flex flex-col items-center space-y-1">
            <div className="flex flex-col items-center">
              <Text fw="bol" size={12}>
                REPUBLIQUE DU SENEGAL
              </Text>
              <Text fw="bold" size={10}>
                un peuple - un But - Une Foi
              </Text>
              <Text size={8}>------------------</Text>
              <img
                src="/imgs/drapeau.png"
                alt="logo"
                className="h-16 w-16 object-cover"
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <Text size={12}>
                MINISTERE DE L'ENSEIGNEMENT SUPPERIEUR DE LA RECHERCHE ET DE
                L'INNOVATION
              </Text>
              <Text size={8}>------------------</Text>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="flex">
                <Text size={14}>N° _____________</Text>{" "}
                <Text size={14} color="blue" fw="bold">
                  {" "}
                  /MESRI/CROUSZ/DIR/CSA/DMS
                </Text>
              </div>
              <Text size={12}>
                CENTRE REGIONAL DES OEUVRE UNIVERSITAIRES SOCIALES DE ZIGUINCHOR
              </Text>
              <img
                src="/imgs/logo_crousz.png"
                alt="logo"
                className="h-16 w-16 object-cover"
              />
              <Text size={10}>DIVISION MEDICO SOCIALE</Text>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex items-center justify-center py-2 bg-green-400">
          <Text
            size={20}
            fw="bold"
            className="font-roboto text-white uppercase"
          >
            bulletin de prise en charge
          </Text>
        </div>
        <Divider />
        <div className="flex flex-col my-20 mx-10">
          <div className="flex flex-col space-y-10">
            <Text size={18} fw="bold" className="font-roboto">
              BENEFICIAIRE
            </Text>
            <div className="overflow-x-hiden relative">
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr>
                    <td className="px-6 font-bold text-xs">PRENOM(S) :</td>
                    <td className="px-6 font-semibold text-xs">
                      {bulletin?.dossier?.etudiant?.prenom}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 font-bold text-xs">NOM :</td>
                    <td className="px-6 font-semibold text-xs">
                      {bulletin?.dossier?.etudiant?.nom}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 font-bold text-xs">FORMATION:</td>
                    <td className="px-6 font-semibold text-xs">
                      {bulletin?.dossier?.etudiant?.formation ?? "néant"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 font-bold text-xs">
                      N° CARTE ETUDIANT:
                    </td>
                    <td className="px-6 font-semibold text-xs">
                      {bulletin?.dossier?.etudiant?.nce ?? "néant"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col space-y-5">
            <Text size={18} fw="bold" className="font-roboto">
              RENSEIGNEMENTS MEDICAUX
            </Text>
            <div className="overflow-x-auto relative">
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr>
                    <td className="px-6 font-bold text-xs">
                      EXAMENS DEMANDES :
                    </td>
                    <td className="px-6 font-semibold text-xs">
                      {bulletin?.examensDemandes ?? "néant"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 font-bold text-xs">
                      ETABLISSEMENT DE SOINS :
                    </td>
                    <td className="px-6 font-semibold text-xs">
                      {bulletin?.etablissement}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 font-bold text-xs">SERVICE MEDICAL:</td>
                    <td className="px-6 font-semibold text-xs">
                      {bulletin?.service ?? "néant"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <h1 className="font-semibold text-lg">
            Part à charge du CROUS/Z 5/5
          </h1>
        </div>
        <div className="flex items-center justify-around mt-10 mx-20 font-roboto">
          <Text size={16} fw="bold">
            LE MEDECIN CHEF
          </Text>
          <Text size={16} fw="bold">
            LE DIRECTEUR
          </Text>
        </div>

        <div className="flex items-center justify-between mt-32">
          <QRCodeSVG value={bulletin?.code} fgColor="#25BE45" size={60} />
          <div className="flex flex-col">
            {bulletin?.date && (
              <Text size={10}>
                Ziguinchor, le :{" "}
                {format(parseISO(bulletin?.date), "dd-MMMM-yyyy", {
                  locale: fr,
                })}
              </Text>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center my-2 mx-5">
          <Text size={12} fw="bold">
            CENTRE REGIONAL DES OEUVRES UNIVERSITAIRES SOCIALES DE ZIGUINCHOR
          </Text>
        </div>
        <div className="mt-2">
          <Divider />
          <Text size={12} fw="bold" className="text-center">
            Kénia sur la route de l'université - BP 1012 - TEL: 33 990 17 20 -
            FAX: 33 990 17 35{" "}
          </Text>
        </div>
      </div>
    </div>
  );
});
