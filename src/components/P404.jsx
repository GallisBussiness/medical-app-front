import { Link } from "react-router-dom"

const P404 = () => {
  return (
    <>
   <div className="error-page d-flex align-items-center flex-wrap justify-content-center pd-20">
  <div className="pd-10">
    <div className="error-page-wrap text-center">
      <img src="/imgs/404.png" alt="404" className="w-full h-1/3 object-cover opacity-70"/>
      <div className="pt-20 mx-auto max-w-200">
        <Link to="/" className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">Retouner à l'accueil</Link>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default P404