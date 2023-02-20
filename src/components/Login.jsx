import { useEffect, useRef } from 'react';
import { useAuthUser, useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from 'react-query'
import {Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import { login } from '../services/authservice';
import { Group, PasswordInput, Stack, TextInput,Button, LoadingOverlay } from '@mantine/core';

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


  const {isLoading, mutate} = useMutation((data) => login(data), {
    onSuccess(data) { 
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
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
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
  <div className="flex items-center justify-center">
        <div className="w-1/2 mx-auto">
          <div className="bg-white shadow-md rounded-md border w-8/12 mx-auto p-8">
            <div className="flex items-center justify-center">
              <img src="/imgs/logo_crousz.png" className="h-52 w-60" alt="logo" />
            </div>
          
            <div className="login-title flex items-center justify-center">
              <h2 className="text-green-500">Se connecter au DME</h2>
            </div>
            <form onSubmit={handleSubmit(onConnect)} method="POST">
            <Stack>
        <Controller control={control} name="username" render={({field}) => (
                    <>
                     <TextInput
                    required
                    label="Email"
                    placeholder="gallis@child.dev"
                    value={field.value}
                    onChange={(event) => field.onChange(event.currentTarget.value)}
                    error={errors.username && 'Invalid email'}
                        />
                    </>
                     )}/>
         
         <Controller control={control} name="password" render={({field}) => (
                    <>
                        <PasswordInput
                        required
                        label="Mot de Passe"
                        placeholder="Votre mot de passe"
                        value={field.value}
                        onChange={(event) => field.onChange(event.currentTarget.value)}
                        error={errors.password && 'Password invalid !!'}
                    />
                    </>
                     )}/>
        
        </Stack>

        <Group position="apart" mt="xl">
          <Button type="submit" className="bg-green-500 hover:bg-green-600">Se Connecter</Button>
        </Group>
            </form>
          </div>
        </div>
      </div>
</div>
<Toast ref={toast} />
    </div>
  )
}

export default Login