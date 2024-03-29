import { FaBriefcaseMedical } from "react-icons/fa";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import "./datatable.css";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { getConsultations } from "../services/consultationservice";
import { useQuery } from "react-query";
import { useState } from "react";
import { ActionIcon } from "@mantine/core";

function ConsultationsAll() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "dossier.etudiant.nom": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    "dossier.etudiant.prenom": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const qk = ["get_Consultations"];

  const { data: Consultations, isLoading } = useQuery(qk, () =>
    getConsultations()
  );

  const dateTemplate = (row) =>
    format(parseISO(row.dateDeConsultation), "dd-MMMM-yyyy H:m:s", {
      locale: fr,
    });
  const dateProchainTemplate = (row) =>
    format(parseISO(row.prochain_rv), "dd-MMMM-yyyy", { locale: fr });
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Les Consultations</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Rechercher ..."
          />
        </span>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center space-x-1">
        <ActionIcon
          onClick={() => navigate(`/dashboard/consultations/${rowData._id}`)}
        >
          <FaRegEye className="text-blue-500" />
        </ActionIcon>
      </div>
    );
  };

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
                    <h5 className="font-bold text-3xl">Consultations</h5>
                    <img
                      className="relative z-20 w-32 pt-6 h-32"
                      src="/imgs/consultations.svg"
                      alt="Consultations"
                    />
                  </div>
                </div>
                <div className="max-w-full h-40 px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 hidden lg:block">
                  <div className="h-full bg-gradient-to-tl from-primary to-blue-300 rounded-xl">
                    <div className="relative flex items-center justify-center h-full">
                      <FaBriefcaseMedical className="h-32 w-32 bg-whity text-danger rounded-full" />
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
          <Toolbar className="mb-4"></Toolbar>
          <DataTable
            value={Consultations}
            paginator
            className="p-datatable-customers"
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="_id"
            rowHover
            filters={filters}
            filterDisplay="row"
            loading={isLoading}
            responsiveLayout="scroll"
            globalFilterFields={[
              "dossier.etudiant.prenom",
              "dossier.etudiant.nom",
              "dateDeConsultation",
            ]}
            emptyMessage="Aucun Consultation trouvé"
            currentPageReportTemplate="Voir {first} de {last} à {totalRecords} consultations"
          >
            <Column
              field="dossier.etudiant.prenom"
              header="PRENOM"
              filter
              filterPlaceholder="Par prenom ..."
              sortable
              style={{ minWidth: "4rem" }}
            />
            <Column
              field="dossier.etudiant.nom"
              header="NOM"
              filter
              filterPlaceholder="Par nom ..."
              sortable
              style={{ minWidth: "4rem" }}
            />
            <Column
              field="type"
              header="Type de Consultation"
              sortable
              style={{ minWidth: "4rem" }}
            />
            <Column
              field="dateDeConsultation"
              header="Date"
              body={dateTemplate}
              sortable
              style={{ minWidth: "4rem" }}
            />
            <Column
              field="prochain_rv"
              header="PROCHAIN RV"
              body={dateProchainTemplate}
              sortable
              style={{ minWidth: "4rem" }}
            />
            <Column
              field="reference"
              header="REFERENCE"
              sortable
              style={{ minWidth: "4rem" }}
            />
            <Column
              headerStyle={{ width: "4rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={actionBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default ConsultationsAll;
