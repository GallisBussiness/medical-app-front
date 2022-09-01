import { Dialog } from 'primereact/dialog';
import { Password } from 'primereact/password';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import { create } from 'react-modal-promise'
import { Dropdown } from 'primereact/dropdown';

const schema = yup.object({
    prenom: yup.string()
    .required(),
    nom: yup.string()
    .required(),
   email: yup.string().required(),
   password: yup.string().required(),
   role: yup.string().required()
  }).required();

const UpdateUserModal = ({ isOpen, onResolve, onReject,user }) => {

    const defaultValues = {nom: user.nom, prenom: user.prenom,email: user.email, password: user.password, role: user.role};
    const {control,setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      defaultValues
    });

    const roles = [
      {label: 'Utilisateur',value: 'user'},
      {label: 'Administrateur',value: 'admin'}
    ];
    const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const generatePassword = (e) =>  {
      e.preventDefault();
      setValue("password",(Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0,9))
  }
  
  const onUpdate = data => {
      onResolve({_id:user._id,...data});
    };

  return (
    <>
       <Dialog header="Modifier un utilisateur" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onUpdate)} method="POST">
    <div className="mb-3">
            <label htmlFor="prenom" className="form-label">Prenom</label>
            <Controller control={control} name="prenom" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="prenom" placeholder="Entrer le prenom" />
             )}/>
              {getFormErrorMessage('prenom')} 
            </div>
            <div className="mb-3">
            <label htmlFor="nom" className="form-label">Nom</label>
            <Controller control={control} name="nom" render={({field}) => (
            <input type="text" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="nom" placeholder="Entrer le nom" autoFocus />
             )}/>
              {getFormErrorMessage('nom')} 
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">email</label>
            <Controller control={control} name="email" render={({field}) => (
            <input type="email" {...field} className="focus:shadow-soft-primary-outline text-sm leading-5.6 
            ease-soft block w-full appearance-none rounded-lg border border-solid border-green-300
             bg-white bg-clip-padding px-3 py-2 font-normal text-green-700 outline-none transition-all
              placeholder:text-green-500 focus:border-green-300 focus:outline-none" id="email" placeholder="Email" />
             )}/>
              {getFormErrorMessage('email')} 
            </div>
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="role" className="form-label">Role</label>
              <Controller control={control} name="role" render={({field}) => (
                   <Dropdown className="w-full" value={field.value} options={roles} onChange={(e) => field.onChange(e.value)} placeholder="Selectionnez le role"/>
              )} />
              {getFormErrorMessage('role')} 
            </div>
            <div className="mb-3 w-full">
            <label htmlFor="password" className="form-label">Mot de passe</label>           
                  <Controller control={control} name="password" render={({field}) => (
                    <div className="flex items-center space-x-4 w-full">
                       <Password {...field}  placeholder="Mot de passe*" toggleMask />
                       <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs mr-2" onClick={generatePassword} > Générer mot de passe</button>
                    </div>
                    
                    )} />
                      {getFormErrorMessage('password')}
                  </div>
            
            <button type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2">mettre à jour</button>
    <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> Annuler</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(UpdateUserModal)