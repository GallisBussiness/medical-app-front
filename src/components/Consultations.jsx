import { FilterMatchMode } from 'primereact/api'
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
import { BsPencilSquare } from 'react-icons/bs'
import CreateConsultationModal from './modals/CreateConsultationModal'
import UpdateConsultationModal from './modals/UpdateConsultationModal'
import './datatable.css'
import { createConsultation, getConsultationByDossier, removeConsultation, updateConsultation } from '../services/consultationservice'
import { useAuthUser } from 'react-auth-kit'
import { FaFileCsv, FaFileExcel, FaFilePdf, FaRegEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import { getDossierByEtudiant } from '../services/dossier-service'
import { ActionIcon, Button, LoadingOverlay } from '@mantine/core'


function Consultations({etudiant}) {
    const auth = useAuthUser()();
    const navigate = useNavigate()
  const [selectedConsultations, setSelectedConsultations] = useState([]);
  const qc = useQueryClient()
  const qk = ['get_Dossier',etudiant?._id]
  const qk2 = ['get_Consultions',etudiant?._id]

  const {data: Dossier, isLoading: isLoadingDossier } = useQuery(qk, () => getDossierByEtudiant(etudiant?._id));

  const {data: Consultations, isLoading} = useQuery(qk2, () => getConsultationByDossier(Dossier?._id), {
    enabled: Dossier !== undefined,
  });
  const toast = useRef();
  const dt = useRef(null);
    

  const cols = [
      { field: 'type', header: 'TYPE' },
      { field:'poids', header: 'POIDS' },
      { field:'taille', header: 'TAILLE' },
      { field:'tension', header: 'TENSION' },
      { field:'temperature', header: 'TEMPERATURE' },
      { field:'poule', header: 'POULS' },
      { field:'glycemie', header: 'GLYCEMIE' },
      { field: 'dateDeConsultation', header: 'Date' },
      { field: 'prochain_rv', header: 'PROCHAIN RV' },
      { field: 'reference', header: 'REFERENCE' }
  ];

  const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));


  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
};

const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
            const doc = new jsPDF.default(0, 0);

            doc.autoTable(exportColumns, Consultations);
            doc.save('consultations.pdf');
        });
    });
};

const exportExcel = () => {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(Consultations);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['Consultations'] };
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        saveAsExcelFile(excelBuffer, 'Consultations');
    });
};

const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
        if (module && module.default) {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });

            module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        }
    });
};
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


  const {mutate: create, isLoading: isLoadingCreate} = useMutation((data) => createConsultation(data), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Creation Consultation', detail: 'Création réussie !!'});
       qc.invalidateQueries(qk2);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Create Consultation', detail: 'Creation échouée !!'});
      }
  })

  const {mutate: deleteD, isLoading: isLoadingDelete} = useMutation((id) => removeConsultation(id), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Suppréssion Consultation', detail: 'Suppréssion réussie !!'});
       qc.invalidateQueries(qk2);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Suppréssion Consultation', detail: 'Suppréssion échouée !!'});
      }
  })

  const {mutate: update,isLoading: isLoadingUpdate} = useMutation((data) => updateConsultation(data._id, data.data), {
      onSuccess: (_) => {
          toast.current.show({severity: 'success', summary: 'Mise à jour Consultation', detail: 'Mis à jour réussie !!'});
          qc.invalidateQueries(qk2);
         },
         onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Mis à jour Consultation', detail: 'Mis à jour échouée !!'});
         }
  })

  const leftToolbarTemplate = () => {
      return (
          <div className="flex items-center justify-center space-x-2">
               <Button className="bg-green-500 hover:bg-green-700" onClick={handleCreateConsultation} leftIcon={<AiOutlinePlus />}>Nouveau</Button>
                <Button className="bg-red-500 hover:bg-red-700" disabled={!selectedConsultations || !selectedConsultations.length} onClick={(ev) => handleDelete(ev)} leftIcon={<MdDelete />}> Supprimer</Button>
          </div>
      )
  }

  const rightToolbarTemplate = () => {
    return ( <div className="flex items-center justify-center space-x-2">
        <ActionIcon onClick={() => exportCSV(false)} title="CSV EXPORTS">
         <FaFileCsv className="text-sky-500 w-6 h-6" />
        </ActionIcon>
        <ActionIcon onClick={exportExcel} title="XLS EXPORTS">
        <FaFileExcel className="text-green-500 w-6 h-6"/>
        </ActionIcon>
        <ActionIcon onClick={exportPdf} title="PDF EXPORTS">
         <FaFilePdf className="text-red-500 w-6 h-6"/>
        </ActionIcon>
        <ActionIcon onClick={() => exportCSV(true)} title="CSV SELECTION EXPORTS">
        <FaFileCsv className="text-sky-500 w-6 h-6"/>
        </ActionIcon>
     </div>);
   }

  const handleUpdateConsultation = (d) => {
      UpdateConsultationModal({idEtudiant: etudiant?._id,idAuth: auth?.id,consultation: d}).then((d => {
          const {_id,...rest} = d;
          update({_id,data: rest});
      }));
  }

  const handleCreateConsultation = () => {
      CreateConsultationModal({idDossier: Dossier?._id,idAuth: auth?.id}).then(create);
  }

  const handleDelete = async (ev) => {
    confirmPopup({
        target: ev.currentTarget,
        message: 'Etes vous sur de vouloir supprimer ?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Supprimer',
        acceptClassName: 'bg-red-500 hover:bg-red-700 border-none ring-node focus:ring-none',
        accept: () => {
            for(let i = 0; i < selectedConsultations?.length; i++) {
                deleteD(selectedConsultations[i]?._id);
        }},
        reject: () => {}
    });
    }


const dateTemplate = (row) => format(parseISO(row.dateDeConsultation), 'dd-MMMM-yyyy H:m:s',  {locale: fr});
const dateProchainTemplate = (row) => format(parseISO(row.prochain_rv), 'dd-MMMM-yyyy',  {locale: fr});
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
        <ActionIcon onClick={() => navigate(`/dashboard/consultations/${rowData._id}`)}>
        <FaRegEye className="text-blue-500"/>
        </ActionIcon>
        <ActionIcon onClick={() => handleUpdateConsultation(rowData)}>
        <BsPencilSquare className="text-amber-500"/>
        </ActionIcon>
      </div>;
      
  }
    


  const header = renderHeader();

  return (
    <>
    <LoadingOverlay visible={isLoadingDossier || isLoadingCreate || isLoadingDelete || isLoadingUpdate} overlayBlur={2} />
    {Dossier ? <div className="datatable-doc mt-4">
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                {Consultations && <DataTable value={Consultations} paginator className="p-datatable-customers" header={header} rows={10} ref={dt}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedConsultations} onSelectionChange={e => setSelectedConsultations(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['dateDeConsultation', 'type']} emptyMessage="Aucun Consultation trouvé"
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} consultations">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="dossier.etudiant.nce" header="NCE" sortable style={{ minWidth: '4rem' }} />
                    <Column field="dossier.etudiant.prenom" header="PRENOM" sortable style={{ minWidth: '4rem' }} />
                    <Column field="dossier.etudiant.nom" header="NOM" sortable style={{ minWidth: '4rem' }} />
                    <Column field="type" header="Type de Consultation" sortable style={{ minWidth: '4rem' }} />
                    <Column field="dateDeConsultation" header="Date" body={dateTemplate} sortable style={{ minWidth: '4rem' }} />
                    <Column field="prochain_rv" header="PROCHAIN RV" body={dateProchainTemplate} sortable style={{ minWidth: '4rem' }} />
                    <Column field="reference" header="REFERENCE" sortable style={{ minWidth: '4rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>}
            </div>
        </div> : "pas encore de dossier"}
        <ConfirmPopup />
        <Toast ref={toast} />
    <ModalContainer />
    </>
  )
}

export default Consultations