import { FaFileMedical } from "react-icons/fa"
import { FilterMatchMode } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import './datatable.css'
import { FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useQuery } from "react-query"
import { useState } from "react"
import { getBulletins } from "../services/bulletinservice"
import { Chip } from "primereact/chip"
function BulletinsAll() {

    const navigate = useNavigate()

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
    const qk = ['get_Bulletins']

    const {data: Bulletins, isLoading } = useQuery(qk, () => getBulletins());
  
    const dateTemplate = (row) => format(parseISO(row.date), 'dd-MMMM-yyyy H:m:s',  {locale: fr});
  const renderHeader = () => {
      return (
          <div className="flex justify-between items-center">
              <h5 className="m-0">Les Consultations</h5>
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
      </div>;
      
  }

  const examensTemplate = (row) => row.examensDemandes.split(',').map((e,i) => <Chip key={i} label={e} className="bg-red-200"/>);
    


  const header = renderHeader();

  return (
    <>
       <div className="flex flex-wrap bg-whity">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-start h-full">
              <h5 className="font-bold text-3xl">Prises en charge</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/imgs/bulletins.svg" alt="Bulletins" />
            </div>
          </div>
          <div className="max-w-full h-40 px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 hidden lg:block">
            <div className="h-full bg-gradient-to-tl from-primary to-blue-300 rounded-xl">
              <div className="relative flex items-center justify-center h-full">
                        <FaFileMedical className="h-32 w-32 bg-whity text-danger rounded-full"/>
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
            <Toolbar className="mb-4" ></Toolbar>
                <DataTable value={Bulletins} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['nom', 'prenom']} emptyMessage="Aucun Bulletin trouvé"
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
    </>
  )
}

export default BulletinsAll