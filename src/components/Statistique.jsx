import { Link } from "react-router-dom";
import { FaNewspaper, FaStethoscope, FaUserGraduate } from "react-icons/fa";
import { getUsers } from "../services/userservice";
import { useQuery } from "react-query";
import { getConsultations } from "../services/consultationservice";
import { getBulletins } from "../services/bulletinservice";
import { getEtudiants } from "../services/etudiantservice";
import { useState } from "react";
import { Loader, Text } from "@mantine/core";
import StateComponent from "./StateComponent";
import { getMonth, isWithinInterval, parseISO } from "date-fns";
import StateComponentApx from "./StateComponentApx";
import { DateRangePicker } from "@mantine/dates";
import SearchComponent from "./SearchComponent";

function Statistique() {
  const [basicData, setBasicData] = useState({});
  const [consultationByMonthData, setConsultationByMonthData] = useState([]);
  const [bulletinData, setBulletinData] = useState({});
  const [sexeData, setSexeData] = useState({});
  const [filteredState, setFilteredState] = useState({ le: 0, lc: 0, lb: 0 });
  const [range, setRange] = useState([new Date(), new Date()]);
  const consByMonthOption = {
    chart: {
      id: "conByMonth",
    },
    xaxis: {
      categories: [
        "jan",
        "fev",
        "mar",
        "avr",
        "mai",
        "jui",
        "juil",
        "aout",
        "sep",
        "oct",
        "nov",
        "dec",
      ],
    },
  };
  const qk = ["get_users"];

  const { data: users } = useQuery(qk, () => getUsers());

  const qkc = ["get_Consultations"];

  const { data: Consultations, isLoading: LC } = useQuery(
    qkc,
    () => getConsultations(),
    {
      onSuccess: (_) => {
        const dt = [];
        for (let i = 0; i <= 11; i++) {
          const ma = _.filter((c) => {
            return getMonth(parseISO(c.dateDeConsultation)) === i;
          });
          dt.push(ma.length);
        }

        setConsultationByMonthData([
          {
            name: "nombre de consultations par mois",
            data: dt,
          },
        ]);

        const labels = ["HOMMES", "FEMMES"];
        const hommes = _.filter((c) => c?.dossier?.etudiant?.sexe === "H");
        const femmes = _.filter((c) => c?.dossier?.etudiant?.sexe === "F");
        const datasets = [
          {
            label: "Consultation selon le sexe",
            backgroundColor: [`#4464AD`, `#C1292E`],
            data: [hommes.length, femmes.length],
          },
        ];

        setBasicData({
          labels,
          datasets,
        });
      },
    }
  );

  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: "#000",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4464AD",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const qkb = ["get_Bulletins"];

  const { data: Bulletins, isLoading: LB } = useQuery(
    qkb,
    () => getBulletins(),
    {
      onSuccess: (_) => {
        const labels = ["HOMMES", "FEMMES"];
        const hommes = _.filter((c) => c?.dossier?.etudiant?.sexe === "H");
        const femmes = _.filter((c) => c?.dossier?.etudiant?.sexe === "F");
        const datasets = [
          {
            label: "Consultation selon le sexe",
            backgroundColor: [
              `#${Math.floor(Math.random() * 16777215).toString(16)}`,
              `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            ],
            data: [hommes.length, femmes.length],
          },
        ];

        setBulletinData({
          labels,
          datasets,
        });
      },
    }
  );

  const qke = ["get_Etudiants"];

  const { data: Etudiants, isLoading } = useQuery(qke, () => getEtudiants(), {
    onSuccess: (_) => {
      const labels = ["HOMMES", "FEMMES"];
      const hommes = _.filter((c) => c?.sexe === "H");
      const femmes = _.filter((c) => c?.sexe === "F");
      const datasets = [
        {
          label: "NOMBRE ETUDIANTS PAR SEXE",
          backgroundColor: [
            `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          ],
          data: [hommes.length, femmes.length],
        },
      ];

      setSexeData({
        labels,
        datasets,
      });
    },
  });

  const handleChangeRange = (v) => {
    const fd = v.map((d) => (d !== null ? d : new Date()));
    if (
      Etudiants !== undefined &&
      Consultations !== undefined &&
      Bulletins !== undefined
    ) {
      const fe = Etudiants?.filter((e) =>
        e.createdAt !== undefined
          ? isWithinInterval(parseISO(e.createdAt), {
              start: fd[0],
              end: fd[1],
            })
          : false
      );
      const fc = Consultations?.filter((c) =>
        c.createdAt !== undefined
          ? isWithinInterval(parseISO(c.createdAt), {
              start: fd[0],
              end: fd[1],
            })
          : false
      );
      const fb = Consultations?.filter((b) =>
        b.createdAt !== undefined
          ? isWithinInterval(parseISO(b.createdAt), {
              start: fd[0],
              end: fd[1],
            })
          : false
      );

      const filtered = {
        le: fe.length,
        lc: fc.length,
        lb: fb.length,
      };
      setFilteredState(filtered);
    }
    setRange(v);
  };

  return (
    <>
      <div className="flex flex-wrap bg-whity">
        <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
          <div className="relative flex flex-col h-auto min-w-0 break-words bg-whity shadow-soft-xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-col  items-center justify-center md:flex-row -mx-3">
                <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                  <div className="flex items-center justify-start h-full">
                    <h5 className="font-bold text-3xl">Statistiques</h5>
                    <img
                      className="relative z-20 w-32 pt-6 h-32"
                      src="/imgs/stats.svg"
                      alt="Statistiques"
                    />
                  </div>
                </div>
                <img
                  className="relative z-20 w-96 pt-6 h-32 object-cover"
                  src="/imgs/gif2.gif"
                  alt="gif"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Text fw="bold">
                    Centre Régional des Oeuvres Universitaires Sociales de
                    Ziguinchor
                  </Text>
                  <Text fw="bold">
                    Plateforme de gestion des dossiers médicaux des étudiants
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-5/12 my-5 mx-auto bg-sky-400 p-5 rounded-md shadow-md">
        <SearchComponent />
      </div>

      <div className="flex flex-col space-y-2 items-center justify-center md:flex-row md:space-x-5 mt-10 mx-10">
        {/* Card */}
        <Link to="/dashboard/allconsultations">
          <div className="flex items-center p-4 bg-amber-500 rounded-lg shadow-xs">
            <div className="p-3 mr-4 bg-white rounded-full">
              {LC ? (
                <Loader />
              ) : (
                <FaStethoscope className="h-6 w-6 text-black" />
              )}
            </div>
            <div>
              <p className="mb-2 text-2xl font-semibold text-white uppercase">
                Consultations
              </p>
              <p className="text-2xl font-semibold text-amber-700 bg-white px-3 py-2 rounded-md w-2/3 flex items-center justify-center">
                {Consultations?.length}
              </p>
            </div>
          </div>
        </Link>
        {/* Card */}
        <Link to="/dashboard/allbulletins">
          <div className="flex items-center p-4 bg-green-500 rounded-lg shadow-xs ">
            <div className="p-3 mr-4 bg-whity rounded-full">
              {LB ? (
                <Loader />
              ) : (
                <FaNewspaper className="h-6 w-6 text-blacky" />
              )}
            </div>
            <div>
              <p className="mb-2 text-2xl font-semibold text-white uppercase">
                bulletins
              </p>
              <p className="text-2xl font-semibold  text-green-700 bg-white px-3 py-2 rounded-md w-2/3 flex items-center justify-center">
                {Bulletins?.length}
              </p>
            </div>
          </div>
        </Link>

        {/* Card */}
        <Link to="/dashboard/etudiants">
          <div className="flex items-center p-4 bg-sky-600 rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-blacky bg-whity rounded-full">
              {isLoading ? (
                <Loader />
              ) : (
                <FaUserGraduate className="h-6 w-6 text-blacky" />
              )}
            </div>
            <div>
              <p className="mb-2 text-2xl font-semibold text-white uppercase">
                Etudiants
              </p>
              <p className="text-2xl font-semibold  text-sky-700 bg-white px-3 py-2 rounded-md w-2/3 flex items-center justify-center">
                {Etudiants?.length}
              </p>
            </div>
          </div>
        </Link>

        {/* Card */}
        <Link to="/dashboard/users">
          <div className="flex items-center p-4 bg-blue-500 rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-black bg-white rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-2xl font-semibold text-white uppercase">
                Utilisateurs
              </p>
              <p className="text-2xl font-semibold  text-blue-700 bg-white px-3 py-2 rounded-md w-1/3 flex items-center justify-center">
                {users?.length}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col my-10 mx-10 bg-white opacity-80 space-y-2 py-5 px-10">
        <div className="w-full flex  space-y-2">
          <div className="w-full">
            <h1 className="font-bold text-3xl">CONSULTATION / SEXE </h1>
            <StateComponent data={basicData} options={basicOptions} />
          </div>
          <div className="w-full">
            <h1 className="font-bold text-3xl">PRISE EN CHARGE / SEXE </h1>
            <StateComponent data={bulletinData} options={basicOptions} />
          </div>
        </div>
        <div className="w-full my-5 flex items-center justify-between">
          <StateComponentApx
            options={consByMonthOption}
            data={consultationByMonthData}
          />
          <StateComponent data={sexeData} options={basicOptions} />
        </div>
      </div>
      <div className="my-3 flex items-center justify-center">
        <Text size={28}>Rapport Par Interval de Date</Text>
      </div>
      <div className="flex flex-col space-y-2 items-center justify-center md:flex-row md:space-x-5 my-10 mx-10">
        <DateRangePicker
          label="Choisissez un interval de date"
          placeholder="De de debut et de fin"
          value={range}
          onChange={(v) => handleChangeRange(v)}
        />
        <Link to="/dashboard/allconsultations">
          <div className="flex items-center p-4 bg-amber-500 rounded-lg shadow-xs">
            <div className="p-3 mr-4 bg-white rounded-full">
              {LC ? (
                <Loader />
              ) : (
                <FaStethoscope className="h-6 w-6 text-black" />
              )}
            </div>
            <div>
              <p className="mb-2 text-2xl font-semibold text-white uppercase">
                Consultations
              </p>
              <p className="text-2xl font-semibold text-amber-700 bg-white px-3 py-2 rounded-md w-2/3 flex items-center justify-center">
                {filteredState.lc}
              </p>
            </div>
          </div>
        </Link>
        {/* Card */}
        <Link to="/dashboard/allbulletins">
          <div className="flex items-center p-4 bg-green-500 rounded-lg shadow-xs ">
            <div className="p-3 mr-4 bg-whity rounded-full">
              {LB ? (
                <Loader />
              ) : (
                <FaNewspaper className="h-6 w-6 text-blacky" />
              )}
            </div>
            <div>
              <p className="mb-2 text-2xl font-semibold text-white uppercase">
                bulletins
              </p>
              <p className="text-2xl font-semibold  text-green-700 bg-white px-3 py-2 rounded-md w-2/3 flex items-center justify-center">
                {filteredState.lb}
              </p>
            </div>
          </div>
        </Link>

        {/* Card */}
        <Link to="/dashboard/etudiants">
          <div className="flex items-center p-4 bg-sky-600 rounded-lg shadow-xs">
            <div className="p-3 mr-4 text-blacky bg-whity rounded-full">
              {isLoading ? (
                <Loader />
              ) : (
                <FaUserGraduate className="h-6 w-6 text-blacky" />
              )}
            </div>
            <div>
              <p className="mb-2 text-2xl font-semibold text-white uppercase">
                Etudiants
              </p>
              <p className="text-2xl font-semibold  text-sky-700 bg-white px-3 py-2 rounded-md w-2/3 flex items-center justify-center">
                {filteredState.le}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Statistique;
