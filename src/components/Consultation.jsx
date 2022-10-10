import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Chip } from "primereact/chip"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getConsultationById } from "../services/consultationservice"
import {QRCodeSVG} from 'qrcode.react';
import "./bg.css"
import { AiFillPrinter } from "react-icons/ai"
import {ConsultationPrint} from "./ConsultationPrint"
import ReactToPrint from 'react-to-print';
import { useRef } from "react"


function Consultation() {
    const {id} = useParams()
    const key = ['get_Consultation',id]
    const {data} = useQuery(key, () => getConsultationById(id))
    const componentRef = useRef();

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
    <>
     <div className="bg-pattern">
           <div className="p-10 border-b-0 rounded-t-2xl bg-white">
      <div className="flex items-center justify-between mx-5">
        <div className="flex items-center  w-full md:w-8/12 md:flex-none">
          <h6 className="font-bold text-3xl">CONSULTATION {data?.type?.toUpperCase()}</h6>
        </div>
        <div>
        <ReactToPrint
        trigger={() => <button className="inline-block px-6 py-2 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" >IMPRIMER <AiFillPrinter className="h-6 w-6 text-white inline"/></button>}
        content={() => componentRef.current}
      />
        </div>
      </div>
    </div>
     <div className="flex justify-between mx-10 bg-white">
      {data && <div className="p-10 bg-white flex items-center justify-center">
      <ul className="flex flex-col mb-0 rounded-lg w-full">
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Date de Consultation:</strong> &nbsp; {format(parseISO(data?.dateDeConsultation),'dd-MMMM-yyyy H:m:s', {locale: fr})}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Poids:</strong> &nbsp; {data?.poids} kg</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Tension:</strong> &nbsp; {data?.tension}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Temperature:</strong> &nbsp; {data?.temperature}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Poule:</strong> &nbsp; {data?.poule}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Glycemie:</strong> &nbsp; {data?.glycemie}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Corps Cetonique:</strong> &nbsp; {data?.corps_cetonique}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Autres:</strong> &nbsp; {data?.autres}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Bilan:</strong> &nbsp; {data?.bilan}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Prochain Rendez-vous:</strong> &nbsp; {format(parseISO(data?.prochain_rv),'dd-MMMM-yyyy H:m:s', {locale: fr})}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Reference:</strong> &nbsp; {data?.reference}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Plainte Du Jour:</strong> &nbsp; {data?.plainte_du_jour}</li>
      <li>
         <div className="flex my-5">
      <QRCodeSVG value={data?.code} fgColor="#25BE45"/>
      </div>
      </li>
      </ul>
    </div>} 
    <div>
    <div className="my-2">
            <div className="flex items-center justify-center">
            <h6 className="font-bold text-lg my-10">TRAITEMENT PRESCRIT</h6>
            </div>
            <DataTable value={data?.traitement}
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
    </div>
    
     </div>
    
        </div>
        <div className="bg-white hidden print:block">
        {data && <ConsultationPrint ref={componentRef} consultation={data}/>}
        </div>
        
    </>
  )
}

export default Consultation