import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getConsultationById } from "../services/consultationservice"


function Consultation() {
    const {id} = useParams()
    const key = ['get_Consultation',id]
    const {data} = useQuery(key, () => getConsultationById(id))
  return (
    <>
     <div>
           <div className="p-4 bg-white border-b-0 rounded-t-2xl">
      <div className="flex">
        <div className="flex items-center w-full md:w-8/12 md:flex-none">
          <h6 className="mb-0">CONSULTATION</h6>
        </div>
      </div>
    </div>

    {data && <div className="p-4 flex items-center justify-center">
      <ul className="flex flex-col mb-0 rounded-lg w-full">
      <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Date de Consultation:</strong> &nbsp; {data?.dateDeConsultation}</li>
        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Poids:</strong> &nbsp; {data?.poids} kg</li>
      </ul>
    </div>} 
        </div>
    </>
  )
}

export default Consultation