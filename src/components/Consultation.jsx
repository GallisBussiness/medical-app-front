import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getConsultationById } from "../services/consultationservice";
import { QRCodeSVG } from "qrcode.react";
import "./bg.css";
import { AiFillPrinter } from "react-icons/ai";
import { ConsultationPrint } from "./ConsultationPrint";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { OrdonnancePrint } from "./OrdonancePrint";
import { Button, LoadingOverlay } from "@mantine/core";

function Consultation() {
  const { id } = useParams();
  const key = ["get_Consultation", id];
  const { data, isLoading } = useQuery(key, () => getConsultationById(id));
  const componentRef = useRef();
  const ordonnanceRef = useRef();

  const nombreTemplate = (row) => {
    return (
      <div>
        <Chip label={`${row.nombre} X`} className="bg-amber-300" />
      </div>
    );
  };
  const frequenceTemplate = (row) => {
    return (
      <div>
        <Chip label={`Par ${row.frequence}`} className="bg-green-300" />
      </div>
    );
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <section className="bg-white">
        <div className="container flex flex-col items-center px-4 py-5 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-800 xl:text-4xl">
            CONSULTATION {data?.type?.toUpperCase()}
          </h2>
          <div className="mt-6">
            <div className="flex items-center space-x-2 mx-5">
              <div className="flex items-center  w-full space-x-5">
                <ReactToPrint
                  trigger={() => (
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      leftIcon={<AiFillPrinter className="text-white" />}
                    >
                      {" "}
                      IMPRIMER LA CONSULTATION
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </div>
              <div>
                <ReactToPrint
                  trigger={() => (
                    <Button
                      className="bg-blue-500 hover:bg-blue-600"
                      leftIcon={<AiFillPrinter className="text-white" />}
                    >
                      {" "}
                      IMPRIMER L'ORDONANCE
                    </Button>
                  )}
                  content={() => ordonnanceRef.current}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-pattern">
        <div className="flex justify-between bg-white">
          {data && (
            <div className="p-10 bg-white flex items-center justify-center">
              <ul className="flex flex-col mb-0 rounded-lg w-full">
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">
                    Date de Consultation:
                  </strong>{" "}
                  &nbsp;{" "}
                  {format(
                    parseISO(data?.dateDeConsultation),
                    "dd-MMMM-yyyy H:m:s",
                    { locale: fr }
                  )}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Poids:</strong> &nbsp;{" "}
                  {data?.poids} kg
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Taille:</strong> &nbsp;{" "}
                  {data?.taille} cm
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Tension:</strong> &nbsp;{" "}
                  {data?.tension}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Temperature:</strong>{" "}
                  &nbsp; {data?.temperature} °C
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Pouls:</strong> &nbsp;{" "}
                  {data?.poule}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Glycemie:</strong> &nbsp;{" "}
                  {data?.glycemie}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Corps Cetonique:</strong>{" "}
                  &nbsp; {data?.corps_cetonique}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Autres:</strong> &nbsp;{" "}
                  {data?.autres}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Examen:</strong> &nbsp;{" "}
                  {data?.examen}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Diagnostique:</strong>{" "}
                  &nbsp; {data?.diagnostique}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Bilan:</strong> &nbsp;{" "}
                  {data?.bilan}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">
                    Prochain Rendez-vous:
                  </strong>{" "}
                  &nbsp;{" "}
                  {format(parseISO(data?.prochain_rv), "dd-MMMM-yyyy H:m:s", {
                    locale: fr,
                  })}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Reference:</strong> &nbsp;{" "}
                  {data?.reference}
                </li>
                <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal  text-lg text-inherit">
                  <strong className="text-green-700">Plainte Du Jour:</strong>{" "}
                  &nbsp; {data?.plainte_du_jour}
                </li>
                <li>
                  <div className="flex my-5">
                    <QRCodeSVG value={data?.code} fgColor="#25BE45" />
                  </div>
                </li>
              </ul>
            </div>
          )}
          <div>
            <div className="my-2">
              <div className="flex items-center justify-center">
                <h6 className="font-bold text-lg my-10">TRAITEMENT PRESCRIT</h6>
              </div>
              <DataTable
                value={data?.traitement}
                size="small"
                dataKey="medicament"
                rowHover
                responsiveLayout="scroll"
                emptyMessage="Aucun médicament prescrit"
              >
                <Column
                  field="medicament"
                  header="Medicament"
                  style={{ minWidth: "14rem" }}
                />
                <Column
                  field="nombre"
                  header="Posologie"
                  body={nombreTemplate}
                  style={{ minWidth: "14rem" }}
                />
                <Column
                  field="frequence"
                  header="Frequence de prise"
                  body={frequenceTemplate}
                  style={{ minWidth: "14rem" }}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white hidden print:block">
        {data && <ConsultationPrint ref={componentRef} consultation={data} />}
        {data && <OrdonnancePrint ref={ordonnanceRef} consultation={data} />}
      </div>
    </>
  );
}

export default Consultation;
