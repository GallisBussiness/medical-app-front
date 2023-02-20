import { FilterMatchMode } from 'primereact/api'
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
import { BsPencilSquare } from 'react-icons/bs'
import CreateBulletinModal from './modals/CreateBulletinModal'
import UpdateBulletinModal from './modals/UpdateBulletinModal'
import './datatable.css'
import { createBulletin, getBulletinByDossier, removeBulletin, updateBulletin } from '../services/bulletinservice'
import { useAuthUser } from 'react-auth-kit'
import { FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Chip } from 'primereact/chip'
import { getDossierByEtudiant } from '../services/dossier-service'
import { ConfirmPopup } from 'primereact/confirmpopup'; 
import { confirmPopup } from 'primereact/confirmpopup'; 
import { ActionIcon, Button, LoadingOverlay } from '@mantine/core'

function PrisEnCharges({etudiant}) {

  const auth = useAuthUser()();
    const navigate = useNavigate()
  const [selectedBulletins, setSelectedBulletins] = useState(null);
  const qc = useQueryClient()
  const toast = useRef();
  const [filters, setFilters] = useState({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };
      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  }

  const qk = ['get_Dossier',etudiant?._id]
  const qk2 = ['get_Bulletins',etudiant?._id]

  const {data: Dossier, isLoading: isLoadingDossier } = useQuery(qk, () => getDossierByEtudiant(etudiant?._id));

  const {data: Bulletins, isLoading} = useQuery(qk2, () => getBulletinByDossier(Dossier?._id), {
    enabled: Dossier !== undefined
  });

  const {mutate: create, isLoading: isLoadingCreate} = useMutation((data) => createBulletin(data), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Creation Bulletin', detail: 'Création réussie !!'});
       qc.invalidateQueries(qk2);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Create Bulletin', detail: 'Creation échouée !!'});
      }
  })

  const {mutate: deleteD,isLoading: isLoadingDelete} = useMutation((id) => removeBulletin(id), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Suppréssion Bulletin', detail: 'Suppréssion réussie !!'});
       qc.invalidateQueries(qk2);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Suppréssion Bulletin', detail: 'Suppréssion échouée !!'});
      }
  })

  const {mutate: update, isLoading: isLoadingUpdate} = useMutation((data) => updateBulletin(data._id, data.data), {
      onSuccess: (_) => {
          toast.current.show({severity: 'success', summary: 'Mise à jour Bulletin', detail: 'Mis à jour réussie !!'});
          qc.invalidateQueries(qk2);
         },
         onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Mis à jour Bulletin', detail: 'Mis à jour échouée !!'});
         }
  })

  const leftToolbarTemplate = () => {
      return (
          <div className="flex items-center justify-center space-x-2">
              <Button className="bg-green-500 hover:bg-green-700" onClick={handleCreateBulletin} leftIcon={<AiOutlinePlus />}>Nouveau</Button>
                <Button className="bg-red-500 hover:bg-red-700" disabled={!selectedBulletins || !selectedBulletins.length} onClick={(ev) => handleDelete(ev)} leftIcon={<MdDelete />}> Supprimer</Button>
          </div>
      )
  }


  const handleUpdateBulletin = (d) => {
      UpdateBulletinModal({idDossier: Dossier?._id,idAuth: auth?.id,bulletin: d}).then((d => {
          const {_id,...rest} = d;
          update({_id,data: rest});
      }));
  }

  const handleCreateBulletin = () => {
      CreateBulletinModal({idDossier: Dossier?._id,idAuth: auth?.id}).then(create).catch(console.log);
  }

  const handleDelete = async (ev) => {
    confirmPopup({
        target: ev.currentTarget,
        message: 'Etes vous sur de vouloir supprimer ?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Supprimer',
        acceptClassName: 'bg-red-500 hover:bg-red-700 border-none ring-node focus:ring-none',
        accept: () => {
            for(let i = 0; i < selectedBulletins?.length; i++) {
                deleteD(selectedBulletins[i]?._id);
        }},
        reject: () => {}
    });
  }
const dateTemplate = (row) => format(parseISO(row.date), 'dd-MMMM-yyyy H:m:s',  {locale: fr});
const examensTemplate = (row) => row.examensDemandes.split(',').map((e,i) => <Chip key={i} label={e} className="bg-red-200"/>);
  const renderHeader = () => {
      return (
          <div className="flex justify-between items-center">
              <h5 className="m-0">Mes Bulletins</h5>
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
              </span>
          </div>
      )
  }

  const actionBodyTemplate = (rowData) => {
      return <div className="flex items-center justify-center space-x-1">
        <ActionIcon onClick={() => navigate(`/dashboard/pris-en-charges/${rowData._id}`)}>
        <FaRegEye className="text-blue-500"/>
        </ActionIcon>
        <ActionIcon onClick={() => handleUpdateBulletin(rowData)}>
        <BsPencilSquare className="text-amber-500"/>
        </ActionIcon>
        
      </div>;
      
  }
    


  const header = renderHeader();

  return (
    <>
    <LoadingOverlay visible={isLoadingDossier || isLoadingCreate || isLoadingDelete || isLoadingUpdate} overlayBlur={2}/>
     {Dossier ? <div className="datatable-doc mt-4">
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={Bulletins} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedBulletins} onSelectionChange={e => setSelectedBulletins(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['date', 'etablissement']} emptyMessage="Aucun Bulletin trouvé"
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Bulletins">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="date" header="Date" body={dateTemplate} sortable style={{ minWidth: '4rem' }} />
                    <Column field="etablissement" header="Etablissement" sortable style={{ minWidth: '4rem' }} />
                    <Column field="examensDemandes" header="Examens Demandes" body={examensTemplate} style={{ minWidth: '4rem' }} />
                    <Column field="service" header="Service" sortable style={{ minWidth: '4rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div> : "Pas encore bulletin de prise en charges" }
        <ConfirmPopup />
        <Toast ref={toast} />
    <ModalContainer />
    </>
  )
}

export default PrisEnCharges