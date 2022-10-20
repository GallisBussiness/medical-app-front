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
import { createBulletin, getBulletinByEtudiant, removeBulletin, updateBulletin } from '../services/bulletinservice'
import { useAuthUser } from 'react-auth-kit'
import { FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Chip } from 'primereact/chip'

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

  const qk = ['get_Bulletins',etudiant?._id]

  const {data: Bulletins, isLoading } = useQuery(qk, () => getBulletinByEtudiant(etudiant?._id));

  const {mutate: create} = useMutation((data) => createBulletin(data), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Creation Bulletin', detail: 'Création réussie !!'});
       qc.invalidateQueries(qk);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Create Bulletin', detail: 'Creation échouée !!'});
      }
  })

  const {mutate: deleteD} = useMutation((id) => removeBulletin(id), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Suppréssion Bulletin', detail: 'Suppréssion réussie !!'});
       qc.invalidateQueries(qk);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Suppréssion Bulletin', detail: 'Suppréssion échouée !!'});
      }
  })

  const {mutate: update} = useMutation((data) => updateBulletin(data._id, data.data), {
      onSuccess: (_) => {
          toast.current.show({severity: 'success', summary: 'Mise à jour Bulletin', detail: 'Mis à jour réussie !!'});
          qc.invalidateQueries(qk);
         },
         onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Mis à jour Bulletin', detail: 'Mis à jour échouée !!'});
         }
  })

  const leftToolbarTemplate = () => {
      return (
          <div className="flex items-center justify-center space-x-2">
              <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleCreateBulletin()} >Nouveau <AiOutlinePlus className="h-6 w-6 text-white inline"/></button>
              <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleDelete()} disabled={!selectedBulletins || !selectedBulletins.length}>Supprimer <MdDelete className="h-6 w-6 text-white inline"/></button>
          </div>
      )
  }


  const handleUpdateBulletin = (d) => {
      UpdateBulletinModal({idEtudiant: etudiant?._id,idAuth: auth?.id,bulletin: d}).then((d => {
          const {_id,...rest} = d;
          update({_id,data: rest});
      }));
  }

  const handleCreateBulletin = () => {
      CreateBulletinModal({idEtudiant: etudiant?._id,idAuth: auth?.id}).then(create);
  }

  const handleDelete = () => {
      for(let i = 0; i < selectedBulletins?.length; i++) {
         deleteD(selectedBulletins[i]?._id);
      }
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
         <button type="button" onClick={() => navigate(`/dashboard/pris-en-charges/${rowData._id}`)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><FaRegEye className="text-white inline"/></button>
      <button type="button" onClick={() => handleUpdateBulletin(rowData)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><BsPencilSquare className="text-white inline"/></button>
      </div>;
      
  }
    


  const header = renderHeader();

  return (
    <>
     <div className="datatable-doc mt-4">
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={Bulletins} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedBulletins} onSelectionChange={e => setSelectedBulletins(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['date', 'etablissement.nom']} emptyMessage="Aucun Bulletin trouvé"
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Bulletins">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="date" header="Date" body={dateTemplate} sortable style={{ minWidth: '14rem' }} />
                    <Column field="etablissement.nom" header="Etablissement" sortable style={{ minWidth: '14rem' }} />
                    <Column field="examensDemandes" header="Examens Demandes" body={examensTemplate} style={{ minWidth: '14rem' }} />
                    <Column field="service" header="Service" sortable style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <Toast ref={toast} />
    <ModalContainer />
    </>
  )
}

export default PrisEnCharges