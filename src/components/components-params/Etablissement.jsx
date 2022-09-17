import { FilterMatchMode, FilterOperator } from 'primereact/api'
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
import CreateEtablissementModal from '../modals/CreateEtablissementModal'
import UpdateEtablissementModal from '../modals/UpdateEtablissementModal'
import '../datatable.css'
import { createEtablissement, getEtablissements, removeEtablissement, updateEtablissement } from '../../services/etablissementservice'

export const Etablissement = () => {
  const [selectedEtablissements, setSelectedEtablissements] = useState(null);
  const qc = useQueryClient()
  const toast = useRef();
  const [filters, setFilters] = useState({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
      'nom': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
      'pseudo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };
      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  }

  const qk = ['get_Etablissements']

  const {data: Etablissements, isLoading } = useQuery(qk, () => getEtablissements());

  const {mutate: create} = useMutation((data) => createEtablissement(data), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Creation Etablissement', detail: 'Création réussie !!'});
       qc.invalidateQueries(qk);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Create Etablissement', detail: 'Creation échouée !!'});
      }
  })

  const {mutate: deleteD} = useMutation((id) => removeEtablissement(id), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Suppréssion Etablissement', detail: 'Suppréssion réussie !!'});
       qc.invalidateQueries(qk);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Suppréssion Etablissement', detail: 'Suppréssion échouée !!'});
      }
  })

  const {mutate: update} = useMutation((data) => updateEtablissement(data._id, data.data), {
      onSuccess: (_) => {
          toast.current.show({severity: 'success', summary: 'Mise à jour Etablissement', detail: 'Mis à jour réussie !!'});
          qc.invalidateQueries(qk);
         },
         onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Mis à jour Etablissement', detail: 'Mis à jour échouée !!'});
         }
  })

  const leftToolbarTemplate = () => {
      return (
          <div className="flex items-center justify-center space-x-2">
              <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleCreateEtablissement()} >Nouveau <AiOutlinePlus className="h-6 w-6 text-white inline"/></button>
              <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleDelete()} disabled={!selectedEtablissements || !selectedEtablissements.length}>Supprimer <MdDelete className="h-6 w-6 text-white inline"/></button>
          </div>
      )
  }


  const handleUpdateEtablissement = (d) => {
      UpdateEtablissementModal({etablissement: d}).then((d => {
          const {_id,...rest} = d;
          update({_id,data: rest});
      }));
  }

  const handleCreateEtablissement = () => {
      CreateEtablissementModal().then(create);
  }

  const handleDelete = () => {
      for(let i = 0; i < selectedEtablissements?.length; i++) {
         deleteD(selectedEtablissements[i]?._id);
      }
  }

  const renderHeader = () => {
      return (
          <div className="flex justify-between items-center">
              <h5 className="m-0">Liste des Etablissements</h5>
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
              </span>
          </div>
      )
  }

  const actionBodyTemplate = (rowData) => {
      return <div className="flex items-center justify-center space-x-1">
      <button type="button" onClick={() => handleUpdateEtablissement(rowData)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><BsPencilSquare className="text-white inline"/></button>
      </div>;
      
  }

  const header = renderHeader();
  return (
    <div className="w-4/5 mx-auto my-5">
<div className="datatable-doc mt-4">
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={Etablissements} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedEtablissements} onSelectionChange={e => setSelectedEtablissements(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['nom', 'prenom']} emptyMessage="Aucun Etablissement trouvé"
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Etablissement">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="nom" header="Nom" sortable style={{ minWidth: '14rem' }} />
                  
                    <Column field="pseudo" header="Pseudo" sortable  style={{ minWidth: '8rem' }}/>
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <Toast ref={toast} />
    <ModalContainer />
    </div>
  )
}
