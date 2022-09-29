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
import CreateConsultationModal from './modals/CreateConsultationModal'
import UpdateConsultationModal from './modals/UpdateConsultationModal'
import './datatable.css'
import { createConsultation, getConsultationByEtudiant, removeConsultation, updateConsultation } from '../services/consultationservice'
import { useAuthUser } from 'react-auth-kit'
import { FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
function Consultations({etudiant}) {
    const auth = useAuthUser()();
    const navigate = useNavigate()
  const [selectedConsultations, setSelectedConsultations] = useState(null);
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

  const qk = ['get_Consultations',etudiant?._id]

  const {data: Consultations, isLoading } = useQuery(qk, () => getConsultationByEtudiant(etudiant?._id));
  const {mutate: create} = useMutation((data) => createConsultation(data), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Creation Consultation', detail: 'Création réussie !!'});
       qc.invalidateQueries(qk);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Create Consultation', detail: 'Creation échouée !!'});
      }
  })

  const {mutate: deleteD} = useMutation((id) => removeConsultation(id), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Suppréssion Consultation', detail: 'Suppréssion réussie !!'});
       qc.invalidateQueries(qk);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Suppréssion Consultation', detail: 'Suppréssion échouée !!'});
      }
  })

  const {mutate: update} = useMutation((data) => updateConsultation(data._id, data.data), {
      onSuccess: (_) => {
          toast.current.show({severity: 'success', summary: 'Mise à jour Consultation', detail: 'Mis à jour réussie !!'});
          qc.invalidateQueries(qk);
         },
         onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Mis à jour Consultation', detail: 'Mis à jour échouée !!'});
         }
  })

  const leftToolbarTemplate = () => {
      return (
          <div className="flex items-center justify-center space-x-2">
              <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleCreateConsultation()} >Nouveau <AiOutlinePlus className="h-6 w-6 text-white inline"/></button>
              <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleDelete()} disabled={!selectedConsultations || !selectedConsultations.length}>Supprimer <MdDelete className="h-6 w-6 text-white inline"/></button>
          </div>
      )
  }


  const handleUpdateConsultation = (d) => {
      UpdateConsultationModal({idEtudiant: etudiant?._id,idAuth: auth?.id,consultation: d}).then((d => {
          const {_id,...rest} = d;
          update({_id,data: rest});
      }));
  }

  const handleCreateConsultation = () => {
      CreateConsultationModal({idEtudiant: etudiant?._id,idAuth: auth?.id}).then(create);
  }

  const handleDelete = () => {
      for(let i = 0; i < selectedConsultations?.length; i++) {
         deleteD(selectedConsultations[i]?._id);
      }
  }
const dateTemplate = (row) => format(parseISO(row.dateDeConsultation), 'dd-MMMM-yyyy H:m:s',  {locale: fr});
  const renderHeader = () => {
      return (
          <div className="flex justify-between items-center">
              <h5 className="m-0">Mes Consultations</h5>
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
              </span>
          </div>
      )
  }

  const actionBodyTemplate = (rowData) => {
      return <div className="flex items-center justify-center space-x-1">
         <button type="button" onClick={() => navigate(`/dashboard/consultations/${rowData._id}`)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><FaRegEye className="text-white inline"/></button>
      <button type="button" onClick={() => handleUpdateConsultation(rowData)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><BsPencilSquare className="text-white inline"/></button>
      </div>;
      
  }
    


  const header = renderHeader();

  return (
    <>
    <div className="datatable-doc mt-4">
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={Consultations} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedConsultations} onSelectionChange={e => setSelectedConsultations(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['nom', 'prenom']} emptyMessage="Aucun Consultation trouvé"
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} consultations">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="dateDeConsultation" header="Date" body={dateTemplate} sortable style={{ minWidth: '14rem' }} />
                    <Column field="type" header="Type de Consultation" sortable style={{ minWidth: '14rem' }} />
                    <Column field="poids" header="Poids" sortable style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <Toast ref={toast} />
    <ModalContainer />
    </>
  )
}

export default Consultations