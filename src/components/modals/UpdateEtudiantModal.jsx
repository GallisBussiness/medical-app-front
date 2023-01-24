import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { MaskField } from 'react-mask-field';
import { create } from 'react-modal-promise'
import { Button, Input, NumberInput, Radio, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/fr';
import { parseISO } from 'date-fns';

const schema = yup.object({
    prenom: yup.string()
    .required(),
    nom: yup.string()
    .required(),
    nce: yup.string(),
    ine: yup.string()
    .required(),
    sexe: yup.string()
    .required(),
    dateDeNaissance: yup.string()
    .required(),
    lieuDeNaissance: yup.string()
    .required(),
    adresse: yup.string()
    .required(),
    telephone: yup.string()
    .required(),
    email: yup.string(),
    formation: yup.string()
    .required(),
  }).required();

function UpdateEtudiantModal({ isOpen, onResolve, onReject,etudiant }) {
  const defaultValues = {nce: parseInt(etudiant?.nce), ine: etudiant?.ine, nom: etudiant?.nom,
     prenom: etudiant?.prenom,
     sexe: etudiant?.sexe,dateDeNaissance: etudiant?.dateDeNaissance,lieuDeNaissance: etudiant?.lieuDeNaissance,
     adresse: etudiant?.adresse,telephone: etudiant?.telephone,email: etudiant?.email,formation: etudiant?.formation};
  const {control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    defaultValues
  });

 
const onCreate = data => {
    onResolve(data);
  };


  return (
    <>
        <Dialog header="Modifier un Etudiant" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
        <form  onSubmit={handleSubmit(onCreate)} method="POST">
        <div>
            <Controller control={control} name="nce" render={({field}) => (
            <NumberInput label="Numéro carte d'étudiant" error={errors.nce && errors.nce.message} value={field.value} onChange={field.onChange}/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="ine" render={({field}) => (
              <TextInput value={field.value} onChange={field.onChange}
              label="INE" error={errors.ine && errors.ine.message}
              placeholder="Ine de l'étudiant"
                withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="prenom" render={({field}) => (
              <TextInput value={field.value} onChange={field.onChange}
              label="Prenom" error={errors.nom && errors.nom.message}
              placeholder="prenom de l'étudiant"
                withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="nom" render={({field}) => (
            <TextInput value={field.value} onChange={field.onChange}
            label="Nom" error={errors.nom && errors.nom.message}
            placeholder="Nom de l'étudiant"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="sexe" render={({field}) => (
            <Radio.Group
            value={field.value}
            onChange={field.onChange}
            name="sexe"
            error={errors.sexe && errors.sexe.message}
            label="Selectionnez le sexe"
            withAsterisk
          >
            <Radio value="H" label="HOMME" />
            <Radio value="F" label="FEMME" />
          </Radio.Group>
             )}/>
            </div>
            <div>
            <Controller control={control} name="dateDeNaissance" render={({field}) => (
            <DatePicker placeholder="Choisir la date de Naissance" label="Date de Naissance" withAsterisk locale="fr" value={parseISO(field.value)} onChange={(v) => field.onChange(v.toISOString())} error={errors.dateDeNaissance && errors.dateDeNaissance.message} />
             )}/>
            </div>
            <div>
            <Controller control={control} name="lieuDeNaissance" render={({field}) => (
            <TextInput  value={field.value} onChange={field.onChange}
            label="lieu de Naissance" error={errors.lieuDeNaissance && errors.lieuDeNaissance.message}
            placeholder="Lieu de Naissance"
              withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="adresse" render={({field}) => (
             <TextInput value={field.value} onChange={field.onChange}
             label="Adresse" error={errors.adresse && errors.adresse.message}
             placeholder="Adresse de l'étudiant"
               withAsterisk/>
             )}/>
            </div>
            <div>
            <Controller control={control} name="email" render={({field}) => (
              <TextInput value={field.value} onChange={field.onChange}
              label="EMAIL" error={errors.email && errors.email.message}
              placeholder="Email de l'étudiant"
              />
             )}/>
            </div>
            <div>
            <Controller control={control} name="telephone" render={({field}) => (
            <Input.Wrapper id="tel" label="Téléphone" error={errors.telephone && errors.telephone.message} required>
            <Input component={MaskField} mask="_________" replacement={{ _: /\d/ }} id="tel" placeholder="Numéro de téléphone" value={field.value} onChange={field.onChange}/>
            </Input.Wrapper>
             )}/>
            </div>
            <div className="mb-3">
              <Controller control={control} name="formation" render={({field}) => (
                    <Select
                    label="Formation"
                    placeholder="Selectionnez la formation ..."
                    searchable
                    clearable
                    nothingFound="Pas de formations disponibles"
                    data={['React', 'Angular', 'Svelte', 'Vue']}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.formation && errors.formation.message}
                  />
              )} />
            </div>
            <div className="flex items-center justify-between">
              <div>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">CREER L'ETUDIANT</Button>
              </div>
            </div>
            
          </form>
        </Dialog>
    
    </>
  )
}

export default create(UpdateEtudiantModal)