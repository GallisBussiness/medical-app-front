import { useEffect, useRef, useState } from 'react';
import { useAuthUser, useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query'
import {Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { login } from '../services/authservice';
import { Button } from 'primereact/button';

const schema = yup.object({
  username: yup.string()
  .email()
  .required(),
 password: yup.string().required(),
}).required();


const Login = () => {

  const toast = useRef();
  const isAuth = useIsAuthenticated();
  const auth = useAuthUser()()
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if(isAuth()) {
      const targetDashboard = '/dashboard';
      navigate(targetDashboard, { replace: true });
    }
    return;
  }, [isAuth,navigate,auth])

  const defaultValues = {username:'',password:''};
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};


  const {isLoading, mutate} = useMutation((data) => login(data), {
    onSuccess(data) { 
      console.log(data);
      toast.current.show({severity: 'success', summary: 'Bienvenu !!!', detail: 'Connexion réussi'});
      if(signIn({token: data?.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {id:data?.id},
           })){ 
            const targetDashboard = '/dashboard';
            navigate(targetDashboard, { replace: true });
            }else {
              toast.current.show({severity: 'error', summary: 'Une erreur s\'est produite !! ', detail: 'Connexion Echoué'});
         }
    },
    onError:(_) => {
      toast.current.show({severity: 'error', summary: 'username et/ou mot de passe incorrect !!!', detail: 'Connexion Echoué'});
    }
  })

  const onConnect = data => {
     mutate(data);
    };

  return (
    <div className="login-page">
      <div>
  <div className="login-header box-shadow">
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <div className="brand-logo">
        <a href="login.html">
          <img src="/imgs/logo_crousz.png" className="h-16 w-16" alt="logo" />
        </a>
      </div>
    </div>
  </div>
  <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 col-lg-7">
          <img src="/imgs/medicine.svg" alt="medecine" />
        </div>
        <div className="col-md-6 col-lg-5">
          <div className="login-box bg-white box-shadow border-radius-10">
            <div className="flex items-center justify-center">
              <img src="/imgs/logo_crousz.png" className="h-52 w-60" alt="logo" />
            </div>
          
            <div className="login-title flex items-center justify-center">
              <h2 className="text-green-500">Se connecter au DME</h2>
            </div>
            <form onSubmit={handleSubmit(onConnect)} method="POST">
              <div className="input-group custom">
              <Controller control={control} name="username" render={({field}) => (
                <>
                <input type="email" {...field} className="form-control form-control-lg" placeholder="Username" />
                <div className="input-group-append custom">
                  <span className="input-group-text"><i className="icon-copy dw dw-user1" /></span>
                </div>
                </>
             )}/>
              {getFormErrorMessage('username')} 
            </div>
              <div className="input-group custom">
              <Controller control={control} name="password" render={({field}) => (
                <>
                <input type={showPassword ? 'text' : 'password'} {...field} className="form-control form-control-lg" placeholder="**********" />
                <div className="input-group-append custom">
                  <span className="input-group-text" onClick={() => setShowPassword(v => !v)}><i className="dw dw-padlock1" /></span>
                </div>
                </>
             )}/>
              {getFormErrorMessage('password')} 
                
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="input-group mb-0">
                    {/*
											use code for form submit
											<input class="btn btn-primary btn-lg btn-block" type="submit" value="Sign In">
										*/}
                    <Button className="btn btn-primary btn-lg btn-block bg-green-600" loading={isLoading} label="Se connecter" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<Toast ref={toast} />
    </div>
  )
}

export default Login