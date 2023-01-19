import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Chip } from "primereact/chip"
import { QRCodeSVG } from "qrcode.react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getBulletinById } from "../services/bulletinservice"
import { BulletinPrint } from "./BulletinPrint"
import ReactToPrint from 'react-to-print';
import { useRef } from "react"
import { AiFillPrinter } from "react-icons/ai"
import { Button } from "@mantine/core"


function Bulletin() {
    const {id} = useParams()
    const key = ['get_Bulletin',id]
    const {data} = useQuery(key, () => getBulletinById(id))
    const componentRef = useRef();

  return (
    <>
     <div className="bg-white">
     <section className="bg-white">
  <div className="container flex flex-col items-center px-4 py-5 mx-auto text-center">
    <h2 className="text-3xl font-bold tracking-tight text-gray-800 xl:text-4xl">
    BULLETIN DE PRIS EN CHARGE
    </h2>
    <div className="mt-6">
    <div className="flex items-center space-x-2 mx-5">
        <div className="flex items-center  w-full space-x-5">
        <ReactToPrint
        trigger={() => <Button className="bg-green-500 hover:bg-green-600" leftIcon={<AiFillPrinter className="text-white"/>}> IMPRIMER LE BULLETIN</Button>}
        content={() => componentRef.current}
      />
        </div>
      </div>
    </div>
  </div>
</section>

     <div className="flex justify-between mx-10">
      {data && <div className="p-10 bg-white flex items-center justify-center">
      <ul className="flex flex-col mb-0 rounded-lg w-full">
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Date:</strong> &nbsp; {format(parseISO(data?.date),'dd-MMMM-yyyy H:m:s', {locale: fr})}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Etablissement:</strong> &nbsp; {data?.etablissement?.nom}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Service:</strong> &nbsp; {data?.service}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Examens Demandés:</strong> &nbsp; {data?.examensDemandes?.split(',').map((e,i) => <Chip key={i} label={e} className="bg-red-200"/>)}</li>
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Par :</strong> &nbsp;DR. {data?.user?.prenom} {data?.user?.nom}</li>
      <li>
      <div className="flex my-5">
      <QRCodeSVG value={data?.code} fgColor="#25BE45"/>
      </div>
      </li>
      </ul>
    </div>} 
     </div>
    
        </div>
        <div className="hidden print:block">
           {data && <BulletinPrint bulletin={data} ref={componentRef}/>}
        </div>
       
    </>
  )
}

export default Bulletin