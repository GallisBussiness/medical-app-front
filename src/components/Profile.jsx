// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import {Controller, useForm } from 'react-hook-form';
// import { Button } from "primereact/button"
import { FaUserCircle } from 'react-icons/fa';

// const schema = yup.object({
//     email: yup.string()
//     .email()
//     .required(),
//    prenom: yup.string().required(),
//   }).required();
  

const Profile = ({auth}) => {


//     const defaultValues = {email:auth?.email,prenom:''};
//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues
//   });
//   const getFormErrorMessage = (name) => {
//     return errors[name] && <small className="p-error">{errors[name].message}</small>
// };

// const onUpdate = (data) => {}

  return (
    <>
     <div className="flex flex-wrap">
    <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
      <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
              <div className="flex items-center justify-center h-full">
                <h5 className="font-bold text-3xl">Mon Profil</h5>
                <img className="relative z-20 w-32 pt-6 h-32" src="/imgs/users.svg" alt="Profil" />
              </div>
            </div>
            <div className="max-w-full h-40 px-3 mt-12  text-center lg:mt-0 lg:w-5/12 hidden lg:block">
              <div className="h-full bg-gradient-to-tl from-green-700 to-green-300 rounded-xl">
                <div className="relative flex items-center justify-center h-full">
                          <FaUserCircle className="h-32 w-32 bg-white text-green-500 rounded-full"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 <div className="py-32 mx-5">
  <div className="flex flex-col h-full bg-white border-0 shadow-soft-xl rounded-2xl">
    <div className="p-4 bg-white border-b-0 rounded-t-2xl">
      <div className="flex">
        <div className="flex items-center w-full md:w-8/12 md:flex-none">
          <h6 className="mb-0 font-bold text-3xl">Mes Informations</h6>
        </div>
      </div>
    </div>

    <div className="p-4 flex items-center justify-center">
      <ul className="flex flex-col mb-0 rounded-lg w-full">
        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Prenom:</strong> &nbsp; {auth?.prenom}</li>
        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Nom:</strong> &nbsp; {auth?.nom}</li>
        <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit"><strong className="text-slate-700">Email:</strong> &nbsp; {auth?.email}</li>
        <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit"><strong className="text-slate-700">Role:</strong> &nbsp; {auth?.role}</li>
      </ul>
  </div>
  </div>
</div>
    </>
  )
}

export default Profile