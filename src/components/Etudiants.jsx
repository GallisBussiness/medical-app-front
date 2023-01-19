import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { ConfirmPopup } from 'primereact/confirmpopup'; 
import { confirmPopup } from 'primereact/confirmpopup'; 
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ModalContainer from 'react-modal-promise'
import { InputText } from 'primereact/inputtext'
import { BsEye, BsPencilSquare } from 'react-icons/bs'
import CreateEtudiantModal from './modals/CreateEtudiantModal'
import UpdateEtudiantModal from './modals/UpdateEtudiantModal'
import RemplirDossierModal from './modals/RemplirDossierModal'
import './datatable.css'
import { createEtudiant, getEtudiants, removeEtudiant, updateEtudiant } from '../services/etudiantservice'
import {FaUserGraduate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { ActionIcon, Button } from '@mantine/core'
import { format, parseISO } from 'date-fns'

function Etudiants() {

  const [selectedEtudiants, setSelectedEtudiants] = useState(null);
    const qc = useQueryClient()
    const navigate = useNavigate()
    const toast = useRef();
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'prenom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const qk = ['get_Etudiants']

    const {data: Etudiants, isLoading } = useQuery(qk, () => getEtudiants());

    const {mutate: create} = useMutation((data) => createEtudiant(data), {
        onSuccess: (_) => {
        toast.current.show({severity: 'success', summary: 'Creation Etudiant', detail: 'Création réussie !!'});
          RemplirDossierModal({etudiant: _._id}).then(console.log).catch((e) => console.log("creation rejected !",e))
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            toast.current.show({severity: 'error', summary: 'Create Etudiant', detail: 'Creation échouée !!'});
        }
    })

    const {mutate: deleteD} = useMutation((id) => removeEtudiant(id), {
        onSuccess: (_) => {
        toast.current.show({severity: 'success', summary: 'Suppréssion Etudiant', detail: 'Suppréssion réussie !!'});
         qc.invalidateQueries(qk);
        },
        onError: (_) => {
            toast.current.show({severity: 'error', summary: 'Suppréssion Etudiant', detail: 'Suppréssion échouée !!'});
        }
    })

    const {mutate: update} = useMutation((data) => updateEtudiant(data._id, data.data), {
        onSuccess: (_) => {
            toast.current.show({severity: 'success', summary: 'Mise à jour Etudiant', detail: 'Mis à jour réussie !!'});
            qc.invalidateQueries(qk);
           },
           onError: (_) => {
            toast.current.show({severity: 'error', summary: 'Mis à jour Etudiant', detail: 'Mis à jour échouée !!'});
           }
    })

    const leftToolbarTemplate = () => {
        return (
            <div className="flex items-center justify-center space-x-2">
                <Button className="bg-green-500 hover:bg-green-700" onClick={handleCreateEtudiant} leftIcon={<AiOutlinePlus />}>Nouveau</Button>
                <Button className="bg-red-500 hover:bg-red-700" disabled={!selectedEtudiants || !selectedEtudiants.length} onClick={(ev) => handleDelete(ev)} leftIcon={<MdDelete />}> Supprimer</Button>
            </div>
        )
    }


    const handleUpdateEtudiant = (d) => {
        UpdateEtudiantModal({etudiant: d}).then((dt => {
            const {_id,...rest} = dt;
            update({_id,data: rest});
        }));
    }

    const handleViewEtudiant = (d) => {
      navigate(`${d._id}`)
  }
    const handleCreateEtudiant = () => {
        CreateEtudiantModal().then(create);
    }

    const handleDelete = async (event) => {
      confirmPopup({
        target: event.currentTarget,
        message: 'Etes vous sur de vouloir supprimer ?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Supprimer',
        acceptClassName: 'bg-red-500 hover:bg-red-700 border-none ring-node focus:ring-none',
        accept: () => {
          for(let i = 0; i < selectedEtudiants?.length; i++) {
            deleteD(selectedEtudiants[i]?._id);
         }
        },
        reject: () => {}
    });
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h5 className="m-0">Liste des Etudiants</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
                </span>
            </div>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return <div className="flex items-center justify-center space-x-1">
        <ActionIcon color="green" size="lg" onClick={() => handleUpdateEtudiant(rowData)}>
      <BsPencilSquare size={26} />
    </ActionIcon>
    <ActionIcon color="blue" size="lg" onClick={() => handleViewEtudiant(rowData)}>
      <BsEye size={26} />
    </ActionIcon>
        </div>;
        
    }

    const header = renderHeader();
    const dateTemplate = (row) => format(parseISO(row.dateDeNaissance),'dd-MM-yyyy');

  return (
    <>
      <div className="flex flex-wrap bg-whity">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-start h-full">
              <h5 className="font-bold text-3xl">Gestion des Etudiants</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/imgs/etudiant.svg" alt="Etudiants" />
            </div>
          </div>
          <div className="max-w-full h-40 px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 hidden lg:block">
            <div className="h-full bg-gradient-to-tl from-primary to-blue-300 rounded-xl">
              <div className="relative flex items-center justify-center h-full">
                        <FaUserGraduate className="h-32 w-32 bg-whity text-green-500 rounded-full"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="datatable-doc mt-4 mx-10">
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={Etudiants} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedEtudiants} onSelectionChange={e => setSelectedEtudiants(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['nom', 'prenom','nce']} emptyMessage="Aucun Etudiant trouvé"
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} utilisateurs">
                    <Column selectionMode="multiple" headerStyle={{ width: '2em' }}></Column>
                    <Column field="nce" header="NCE" sortable style={{ minWidth: '6rem' }} />
                    <Column field="ine" header="INE" style={{ minWidth: '6rem' }} />
                    <Column field="prenom" header="Prenom" sortable style={{ minWidth: '6rem' }} />
                    <Column field="nom" header="Nom" sortable style={{ minWidth: '6rem' }} />
                    <Column field="dateDeNaissance" header="Date de Naissance" body={dateTemplate} sortable  style={{ minWidth: '3rem' }}/>
                    <Column field="lieuDeNaissance" header="Lieu de Naissance" sortable  style={{ minWidth: '3rem' }}/>
                    <Column field="telephone" header="Telephone" sortable  style={{ minWidth: '6rem' }}/>
                    <Column field="adresse" header="Adresse" sortable  style={{ minWidth: '4rem' }}/>
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <Toast ref={toast} />
        <ConfirmPopup />
    <ModalContainer />
    </>
  )
}

export default Etudiants