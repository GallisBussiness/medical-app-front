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
    cni: yup.string()
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
  const defaultValues = {_id: etudiant?._id,nce: parseInt(etudiant?.nce), cni: etudiant?.cni ?? '', nom: etudiant?.nom,
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


  const formations = [
    { value: 'SS MEDECINE GENERALE NIVEAU 1', label: 'SS MEDECINE GENERALE NIVEAU 1', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS MEDECINE GENERALE NIVEAU 2', label: 'SS MEDECINE GENERALE NIVEAU 2', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS MEDECINE GENERALE NIVEAU 3', label: 'SS MEDECINE GENERALE NIVEAU 3', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS MEDECINE GENERALE NIVEAU 4', label: 'SS MEDECINE GENERALE NIVEAU 4', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS MEDECINE GENERALE NIVEAU 5', label: 'SS MEDECINE GENERALE NIVEAU 5', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS MEDECINE GENERALE NIVEAU 6', label: 'SS MEDECINE GENERALE NIVEAU 6', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS MEDECINE GENERALE NIVEAU 7', label: 'SS MEDECINE GENERALE NIVEAU 7', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS MEDECINE GENERALE NIVEAU 8', label: 'SS MEDECINE GENERALE NIVEAU 8', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE PROFESSIONNELLE BIOLOGIE MÉDICALE NIVEAU 1', label: 'SS LICENCE PROFESSIONNELLE BIOLOGIE MÉDICALE NIVEAU 1', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE PROFESSIONNELLE BIOLOGIE MÉDICALE NIVEAU 2', label: 'SS LICENCE PROFESSIONNELLE BIOLOGIE MÉDICALE NIVEAU 2', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE PROFESSIONNELLE BIOLOGIE MÉDICALE NIVEAU 3', label: 'SS LICENCE PROFESSIONNELLE BIOLOGIE MÉDICALE NIVEAU 3', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE SCIENCES OBSTÉTRICALES NIVEAU 1', label: 'SS LICENCE SCIENCES OBSTÉTRICALES NIVEAU 1', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE SCIENCES OBSTÉTRICALES NIVEAU 2', label: 'SS LICENCE SCIENCES OBSTÉTRICALES NIVEAU 2', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE SCIENCES OBSTÉTRICALES NIVEAU 3', label: 'SS LICENCE SCIENCES OBSTÉTRICALES NIVEAU 3', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE SOINS INFIRMIERS NIVEAU 1', label: 'SS LICENCE SOINS INFIRMIERS NIVEAU 1', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE SOINS INFIRMIERS NIVEAU 2', label: 'SS LICENCE SOINS INFIRMIERS NIVEAU 2', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS LICENCE SOINS INFIRMIERS NIVEAU 3', label: 'SS LICENCE SOINS INFIRMIERS NIVEAU 3', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SS MASTER THÉRAPIES DE SUPPLÉANCE RÉNALE NIVEAU 4', label: 'SS MASTER THÉRAPIES DE SUPPLÉANCE RÉNALE NIVEAU 4', group: 'UFR DES SCIENCES DE LA SANTE' },
    { value: 'SES LICENCE SCIENCES JURIDIQUES NIVEAU 1', label: 'SES LICENCE SCIENCES JURIDIQUES NIVEAU 1', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE SCIENCES JURIDIQUES NIVEAU 2', label: 'SES LICENCE SCIENCES JURIDIQUES NIVEAU 2', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE DROIT DES AFFAIRES NIVEAU 3', label: 'SES LICENCE DROIT DES AFFAIRES NIVEAU 3', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE DROIT PUBLIC ÉCONOMIQUE NIVEAU 3', label: 'SES LICENCE DROIT PUBLIC ÉCONOMIQUE NIVEAU 3', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER DROIT PRIVÉ NIVEAU 4', label: 'SES MASTER DROIT PRIVÉ NIVEAU 4', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER DROIT PRIVÉ SPÉCIALITÉ DROIT PRIVÉ FONDAMENTAL NIVEAU 5', label: 'SES MASTER DROIT PRIVÉ SPÉCIALITÉ DROIT PRIVÉ FONDAMENTAL NIVEAU 5', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER DROIT PRIVÉ SPÉCIALITÉ DROIT DES ACTIVITÉS ÉCONOMIQUES NIVEAU 5', label: 'SES MASTER DROIT PRIVÉ SPÉCIALITÉ DROIT DES ACTIVITÉS ÉCONOMIQUES NIVEAU 5', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER DROIT PUBLIC SPÉCIALITÉ DROIT ET ADMINISTRATION DES COLLECTIVITÉS TERRITORIALES NIVEAU 4', label: 'SES MASTER DROIT PUBLIC SPÉCIALITÉ DROIT ET ADMINISTRATION DES COLLECTIVITÉS TERRITORIALES NIVEAU 4', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER DROIT PUBLIC SPÉCIALITÉ DROIT ET ADMINISTRATION DES COLLECTIVITÉS TERRITORIALES NIVEAU 5', label: 'SES MASTER DROIT PUBLIC SPÉCIALITÉ DROIT ET ADMINISTRATION DES COLLECTIVITÉS TERRITORIALES NIVEAU 5', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE ECONOMIE GESTION NIVEAU 1', label: 'SES LICENCE ECONOMIE GESTION NIVEAU 1', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE ECONOMIE GESTION NIVEAU 2', label: 'SES LICENCE ECONOMIE GESTION NIVEAU 2', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE GESTION DES ENTREPRISES NIVEAU 3', label: 'SES LICENCE GESTION DES ENTREPRISES NIVEAU 3', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE ANALYSE ET POLITIQUE ÉCONOMIQUE NIVEAU 3', label: 'SES LICENCE ANALYSE ET POLITIQUE ÉCONOMIQUE NIVEAU 3', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER FINDEV SPÉCIALITÉ EVALUATION D\'IMPACT DES POLITIQUES DE DÉVELOPPEMENT NIVEAU 4', label: 'SES MASTER FINDEV SPÉCIALITÉ EVALUATION D\'IMPACT DES POLITIQUES DE DÉVELOPPEMENT NIVEAU 4', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER FINDEV SPÉCIALITÉ EVALUATION D\'IMPACT DES POLITIQUES DE DÉVELOPPEMENT NIVEAU 5', label: 'SES MASTER FINDEV SPÉCIALITÉ EVALUATION D\'IMPACT DES POLITIQUES DE DÉVELOPPEMENT NIVEAU 5', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER FINDEV SPÉCIALITÉ FINANCE NIVEAU 4', label: 'SES MASTER FINDEV SPÉCIALITÉ FINANCE NIVEAU 4', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER FINDEV SPÉCIALITÉ FINANCE NIVEAU 5', label: 'SES MASTER FINDEV SPÉCIALITÉ FINANCE NIVEAU 5', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE MANAGEMENT INFORMATISÉ DES ORGANISATIONS NIVEAU 1', label: 'SES LICENCE MANAGEMENT INFORMATISÉ DES ORGANISATIONS NIVEAU 1', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE MANAGEMENT INFORMATISÉ DES ORGANISATIONS NIVEAU 2', label: 'SES LICENCE MANAGEMENT INFORMATISÉ DES ORGANISATIONS NIVEAU 2', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE MANAGEMENT INFORMATISÉ DES ORGANISATIONS NIVEAU 3', label: 'SES LICENCE MANAGEMENT INFORMATISÉ DES ORGANISATIONS NIVEAU 3', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER GESTION SPÉCIALITÉ MANAGEMENT DES SYSTÈMES D\'INFORMATION AUTOMATISÉS NIVEAU 4', label: 'SES MASTER GESTION SPÉCIALITÉ MANAGEMENT DES SYSTÈMES D\'INFORMATION AUTOMATISÉS NIVEAU 4', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER GESTION SPÉCIALITÉ MANAGEMENT DES SYSTÈMES D\'INFORMATION AUTOMATISÉS NIVEAU 5', label: 'SES MASTER GESTION SPÉCIALITÉ MANAGEMENT DES SYSTÈMES D\'INFORMATION AUTOMATISÉS NIVEAU 5', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE PROFESSIONNELLE DUT+1 GESTION DE PROJETS ET CRÉATION D\'ENTREPRISE NIVEAU 3', label: 'SES LICENCE PROFESSIONNELLE DUT+1 GESTION DE PROJETS ET CRÉATION D\'ENTREPRISE NIVEAU 3', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE SOCIOLOGIE NIVEAU 1', label: 'SES LICENCE SOCIOLOGIE NIVEAU 1', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE SOCIOLOGIE NIVEAU 2', label: 'SES LICENCE SOCIOLOGIE NIVEAU 2', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE SOCIOLOGIE NIVEAU 3', label: 'SES LICENCE SOCIOLOGIE NIVEAU 3', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER SOCIOLOGIE/POLITIQUES PUBLIQUES, CULTURES ET DÉVELOPPEMENT NIVEAU 4', label: 'SES MASTER SOCIOLOGIE/POLITIQUES PUBLIQUES, CULTURES ET DÉVELOPPEMENT NIVEAU 4', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER SOCIOLOGIE SPÉCIALITÉ MIGRATION, SANTÉ ET DÉVELOPPEMENT NIVEAU 5', label: 'SES MASTER SOCIOLOGIE SPÉCIALITÉ MIGRATION, SANTÉ ET DÉVELOPPEMENT NIVEAU 5', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE TOURISME NIVEAU 1', label: 'SES LICENCE TOURISME NIVEAU 1', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE TOURISME NIVEAU 2', label: 'SES LICENCE TOURISME NIVEAU 2', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES LICENCE TOURISME NIVEAU 3', label: 'SES LICENCE TOURISME NIVEAU 3', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER TOURISME SPÉCIALITÉ MANAGEMENT DES ACTIVITÉS DU TOURISME ET DE LA CULTURE NIVEAU 4', label: 'SES MASTER TOURISME SPÉCIALITÉ MANAGEMENT DES ACTIVITÉS DU TOURISME ET DE LA CULTURE NIVEAU 4', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'SES MASTER TOURISME SPÉCIALITÉ MANAGEMENT DES ACTIVITÉS DU TOURISME ET DE LA CULTURE NIVEAU 5', label: 'SES MASTER TOURISME SPÉCIALITÉ MANAGEMENT DES ACTIVITÉS DU TOURISME ET DE LA CULTURE NIVEAU 5', group: 'UFR SCIENCES ECONOMIQUES ET SOCIALES' },
    { value: 'ST LICENCE PHYSIQUE CHIMIE NIVEAU 1', label: 'ST LICENCE PHYSIQUE CHIMIE NIVEAU 1', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE PHYSIQUE CHIMIE NIVEAU 2', label: 'ST LICENCE PHYSIQUE CHIMIE NIVEAU 2', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE MATHEMATIQUES PHYSIQUE INFORMATIQUE NIVEAU 1', label: 'ST LICENCE MATHEMATIQUES PHYSIQUE INFORMATIQUE NIVEAU 1', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE MATHEMATIQUES PHYSIQUE INFORMATIQUE NIVEAU 2', label: 'ST LICENCE MATHEMATIQUES PHYSIQUE INFORMATIQUE NIVEAU 2', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE MATHÉMATIQUES NIVEAU 3', label: 'ST LICENCE MATHÉMATIQUES NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE INFORMATIQUE NIVEAU 3', label: 'ST LICENCE INFORMATIQUE NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE CHIMIE NIVEAU 3', label: 'ST LICENCE CHIMIE NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE INGÉNIERIE INFORMATIQUE NIVEAU 1', label: 'ST LICENCE INGÉNIERIE INFORMATIQUE NIVEAU 1', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE INGÉNIERIE INFORMATIQUE NIVEAU 2', label: 'ST LICENCE INGÉNIERIE INFORMATIQUE NIVEAU 2', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE INGÉNIERIE INFORMATIQUE NIVEAU 3', label: 'ST LICENCE INGÉNIERIE INFORMATIQUE NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE AGROFORESTERIE NIVEAU 1', label: 'ST LICENCE AGROFORESTERIE NIVEAU 1', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE AGROFORESTERIE NIVEAU 2', label: 'ST LICENCE AGROFORESTERIE NIVEAU 2', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE AGROFORESTERIE NIVEAU 3', label: 'ST LICENCE AGROFORESTERIE NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE GEOGRAPHIE NIVEAU 1', label: 'ST LICENCE GEOGRAPHIE NIVEAU 1', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE GEOGRAPHIE NIVEAU 2', label: 'ST LICENCE GEOGRAPHIE NIVEAU 2', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE GEOGRAPHIE NIVEAU 3', label: 'ST LICENCE GEOGRAPHIE NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE PROFESSIONNELLE AGRORESSOURCES VÉGÉTALES ET ENTREPRENARIAT NIVEAU 3', label: 'ST LICENCE PROFESSIONNELLE AGRORESSOURCES VÉGÉTALES ET ENTREPRENARIAT NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE PROFESSIONNELLE ENERGIES RENOUVELABLES ET EFFICACITE ENERGÉTIQUE NIVEAU 3', label: 'ST LICENCE PROFESSIONNELLE ENERGIES RENOUVELABLES ET EFFICACITE ENERGÉTIQUE NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE PROFESSIONNELLE CREATION MULTIMEDIA NIVEAU 1', label: 'ST LICENCE PROFESSIONNELLE CREATION MULTIMEDIA NIVEAU 1', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE PROFESSIONNELLE CREATION MULTIMEDIA NIVEAU 2', label: 'ST LICENCE PROFESSIONNELLE CREATION MULTIMEDIA NIVEAU 2', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST LICENCE PROFESSIONNELLE CREATION MULTIMEDIA NIVEAU 3', label: 'ST LICENCE PROFESSIONNELLE CREATION MULTIMEDIA NIVEAU 3', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER AGROFORESTERIE SPECIALITE AMENAGEMENT ET GESTION DURABLE DES ECOSYSTEMES FORESTIERS ET AGROFORESTIERS NIVEAU 4', label: 'ST MASTER AGROFORESTERIE SPECIALITE AMENAGEMENT ET GESTION DURABLE DES ECOSYSTEMES FORESTIERS ET AGROFORESTIERS NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER AGROFORESTERIE SPECIALITE AMENAGEMENT ET GESTION DURABLE DES ECOSYSTEMES FORESTIERS ET AGROFORESTIERS NIVEAU 5', label: 'ST MASTER AGROFORESTERIE SPECIALITE AMENAGEMENT ET GESTION DURABLE DES ECOSYSTEMES FORESTIERS ET AGROFORESTIERS NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER CHIMIE SPÉCIALITE CHIMIE DU SOLIDE ET DES MATERIAUX NIVEAU 4', label: 'ST MASTER CHIMIE SPÉCIALITE CHIMIE DU SOLIDE ET DES MATERIAUX NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER CHIMIE SPÉCIALITE CHIMIE DU SOLIDE ET DES MATERIAUX NIVEAU 5', label: 'ST MASTER CHIMIE SPÉCIALITE CHIMIE DU SOLIDE ET DES MATERIAUX NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER CHIMIE SPECIALITE SYNTHESE ORGANIQUE ET PRODUITS NATURELS NIVEAU 4', label: 'ST MASTER CHIMIE SPECIALITE SYNTHESE ORGANIQUE ET PRODUITS NATURELS NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER CHIMIE SPECIALITE SYNTHESE ORGANIQUE ET PRODUITS NATURELS NIVEAU 5', label: 'ST MASTER CHIMIE SPECIALITE SYNTHESE ORGANIQUE ET PRODUITS NATURELS NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER GÉOGRAPHIE / ESPACES, SOCIÉTÉS ET DÉVELOPPEMENT NIVEAU 4', label: 'ST MASTER GÉOGRAPHIE / ESPACES, SOCIÉTÉS ET DÉVELOPPEMENT NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER GEOGRAPHIE SPÉCIALITÉ AMÊNAGEMENT ET TERRITOIRES NIVEAU 4', label: 'ST MASTER GEOGRAPHIE SPÉCIALITÉ AMÊNAGEMENT ET TERRITOIRES NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER GEOGRAPHIE SPÉCIALITÉ AMÊNAGEMENT ET TERRITOIRES NIVEAU 5', label: 'ST MASTER GEOGRAPHIE SPÉCIALITÉ AMÊNAGEMENT ET TERRITOIRES NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER GÉOGRAPHIE SPÉCIALITÉ ENVIRONNEMENT ET DÉVELOPPEMENT NIVEAU 5', label: 'ST MASTER GÉOGRAPHIE SPÉCIALITÉ ENVIRONNEMENT ET DÉVELOPPEMENT NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER INFORMATIQUE SPÉCIALITÉ GÉNIE LOGICIEL NIVEAU 4', label: 'ST MASTER INFORMATIQUE SPÉCIALITÉ GÉNIE LOGICIEL NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER INFORMATIQUE SPÉCIALITÉ GÉNIE LOGICIEL NIVEAU 5', label: 'ST MASTER INFORMATIQUE SPÉCIALITÉ GÉNIE LOGICIEL NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER INFORMATIQUE SPÉCIALITÉ RÉSEAUX ET SYSTÈMES NIVEAU 4', label: 'ST MASTER INFORMATIQUE SPÉCIALITÉ RÉSEAUX ET SYSTÈMES NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER INFORMATIQUE SPÉCIALITÉ RÉSEAUX ET SYSTÈMES NIVEAU 5', label: 'ST MASTER INFORMATIQUE SPÉCIALITÉ RÉSEAUX ET SYSTÈMES NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER MATHÉMATIQUES ET APPLICATIONS SPÉCIALITÉ MATHÉMATIQUES APPLIQUÉES NIVEAU 4', label: 'ST MASTER MATHÉMATIQUES ET APPLICATIONS SPÉCIALITÉ MATHÉMATIQUES APPLIQUÉES NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER MATHÉMATIQUES ET APPLICATIONS SPÉCIALITÉ MATHÉMATIQUES APPLIQUÉES NIVEAU 5', label: 'ST MASTER MATHÉMATIQUES ET APPLICATIONS SPÉCIALITÉ MATHÉMATIQUES APPLIQUÉES NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER PHYSIQUE SPECIALITE INTERUNIVERSITAIRE EN ENERGIE RENOUVELABLE NIVEAU 4', label: 'ST MASTER PHYSIQUE SPECIALITE INTERUNIVERSITAIRE EN ENERGIE RENOUVELABLE NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER PHYSIQUE SPECIALITE INTERUNIVERSITAIRE EN ENERGIE RENOUVELABLE NIVEAU 5', label: 'ST MASTER PHYSIQUE SPECIALITE INTERUNIVERSITAIRE EN ENERGIE RENOUVELABLE NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER PHYSIQUE SPECIALITE PHYSIQUE DES MATÉRIAUX NIVEAU 4', label: 'ST MASTER PHYSIQUE SPECIALITE PHYSIQUE DES MATÉRIAUX NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER PHYSIQUE SPECIALITE PHYSIQUE DES MATÉRIAUX NIVEAU 5', label: 'ST MASTER PHYSIQUE SPECIALITE PHYSIQUE DES MATÉRIAUX NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER PHYSIQUE SPECIALITE SCIENCE DE L\'ATMOSPHÈRE ET D\'OCÉANOGRAPHIE NIVEAU 4', label: 'ST MASTER PHYSIQUE SPECIALITE SCIENCE DE L\'ATMOSPHÈRE ET D\'OCÉANOGRAPHIE NIVEAU 4', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'ST MASTER PHYSIQUE SPECIALITE SCIENCE DE L\'ATMOSPHÈRE ET D\'OCÉANOGRAPHIE NIVEAU 5', label: 'ST MASTER PHYSIQUE SPECIALITE SCIENCE DE L\'ATMOSPHÈRE ET D\'OCÉANOGRAPHIE NIVEAU 5', group: 'UFR SCIENCES ET TECHNOLOGIES' },
    { value: 'LASHU LICENCE HISTOIRE ET CIVILISATIONS NIVEAU 1', label: 'LASHU LICENCE HISTOIRE ET CIVILISATIONS NIVEAU 1', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU LICENCE HISTOIRE ET CIVILISATIONS NIVEAU 2', label: 'LASHU LICENCE HISTOIRE ET CIVILISATIONS NIVEAU 2', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU LICENCE HISTOIRE ET CIVILISATIONS NIVEAU 3', label: 'LASHU LICENCE HISTOIRE ET CIVILISATIONS NIVEAU 3', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU LICENCE LANGUES ETRANGERES APPLIQUEES NIVEAU 1', label: 'LASHU LICENCE LANGUES ETRANGERES APPLIQUEES NIVEAU 1', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU LICENCE LANGUES ETRANGERES APPLIQUEES NIVEAU 2', label: 'LASHU LICENCE LANGUES ETRANGERES APPLIQUEES NIVEAU 2', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU LICENCE LANGUES ETRANGERES APPLIQUEES NIVEAU 3', label: 'LASHU LICENCE LANGUES ETRANGERES APPLIQUEES NIVEAU 3', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU LICENCE LETTRES MODERNES NIVEAU 1', label: 'LASHU LICENCE LETTRES MODERNES NIVEAU 1', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU LICENCE LETTRES MODERNES NIVEAU 2', label: 'LASHU LICENCE LETTRES MODERNES NIVEAU 2', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU LICENCE LETTRES MODERNES NIVEAU 3', label: 'LASHU LICENCE LETTRES MODERNES NIVEAU 3', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU MASTER LEA SPECIALITÉ COOPÉRATION INTERNATIONALE ET DÉVELOPPEMENT NIVEAU 4', label: 'LASHU MASTER LEA SPECIALITÉ COOPÉRATION INTERNATIONALE ET DÉVELOPPEMENT NIVEAU 4', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU MASTER LEA SPECIALITÉ COOPÉRATION INTERNATIONALE ET DÉVELOPPEMENT NIVEAU 5', label: 'LASHU MASTER LEA SPECIALITÉ COOPÉRATION INTERNATIONALE ET DÉVELOPPEMENT NIVEAU 5', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU MASTER LETTRES MODERNES SPÉCIALITÉ ETUDES LITTÉRAIRES NIVEAU 4', label: 'LASHU MASTER LETTRES MODERNES SPÉCIALITÉ ETUDES LITTÉRAIRES NIVEAU 4', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU MASTER LETTRES MODERNES SPÉCIALITÉ ETUDES LITTÉRAIRES NIVEAU 5', label: 'LASHU MASTER LETTRES MODERNES SPÉCIALITÉ ETUDES LITTÉRAIRES NIVEAU 5', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU MASTER LETTRES MODERNES SPÉCIALITÉ SCIENCE DU LANGAGE NIVEAU 4', label: 'LASHU MASTER LETTRES MODERNES SPÉCIALITÉ SCIENCE DU LANGAGE NIVEAU 4', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU MASTER LETTRES MODERNES SPÉCIALITÉ SCIENCE DU LANGAGE NIVEAU 5', label: 'LASHU MASTER LETTRES MODERNES SPÉCIALITÉ SCIENCE DU LANGAGE NIVEAU 5', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU MASTER SCIENCES HISTORIQUES NIVEAU 4', label: 'LASHU MASTER SCIENCES HISTORIQUES NIVEAU 4', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
    { value: 'LASHU MASTER SCIENCES HISTORIQUES NIVEAU 5', label: 'LASHU MASTER SCIENCES HISTORIQUES NIVEAU 5', group: 'UFR LETTRES, ARTS ET SCIENCES HUMAINES' },
  ];

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
            <Controller control={control} name="cni" render={({field}) => (
              <TextInput value={field.value} onChange={field.onChange}
              label="CNI" error={errors.cni && errors.cni.message}
              placeholder="CNI de l'étudiant"
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
                    data={formations}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.formation && errors.formation.message}
                  />
              )} />
            </div>
            <div className="flex items-center justify-between">
              <div>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">Modifer L'ETUDIANT</Button>
              </div>
            </div>
            
          </form>
        </Dialog>
    
    </>
  )
}

export default create(UpdateEtudiantModal)