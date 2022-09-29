import { format, parseISO } from "date-fns"
import { fr } from "date-fns/locale"
import { Chip } from "primereact/chip"
import { QRCodeSVG } from "qrcode.react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getBulletinById } from "../services/bulletinservice"


function Bulletin() {
    const {id} = useParams()
    const key = ['get_Bulletin',id]
    const {data} = useQuery(key, () => getBulletinById(id))
  return (
    <>
     <div className="bg-white">
           <div className="p-10 border-b-0 rounded-t-2xl">
      <div className="flex">
        <div className="flex items-center  w-full md:w-8/12 md:flex-none">
          <h6 className="font-bold text-3xl">BULLETIN DE PRIS EN CHARGE</h6>
        </div>
      </div>
    </div>
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
    </>
  )
}

export default Bulletin