import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { TextInput, Loader, Button } from '@mantine/core';
import { useMutation } from 'react-query';
import { getEtudiantByUniqueId } from '../services/etudiantservice';
import { FaSearch } from 'react-icons/fa';
import { UserInfo } from './UserInfo';
import { useNavigate } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';


function SearchComponent() {
    const [value, setValue] = useState('');
    const [debounced] = useDebouncedValue(value, 500);
    const {mutate,isLoading,data} = useMutation((val) => getEtudiantByUniqueId(val));
    const navigate = useNavigate()

    const handleSearch = (e) => {
        setValue(e.target.value);
    }
    const handleViewEtudiant = (d) => {
        navigate(`/dashboard/etudiants/${d._id}`)
    }

    useEffect(() => {
        if(debounced !== '')
        mutate({id:debounced});
        return () => {
            return null;
        };
    }, [debounced,mutate]);
  
    return (
      <>
        <TextInput
          label="ENTRER LE CNI,NCE OU lE NUMERO DE TELEPHONE DE L'ETUDIANT..."
          placeholder="CNI, NCE ou numéro de téléphone"
          value={value}
          onChange={handleSearch}
          rightSection={isLoading ? <Loader size="xs"/> : <FaSearch className="h-6 w-6 text-sky-600"/>}
        />
  
        <div className="flex items-center justify-center">
            {data && debounced !== "" ? <div className="bg-white flex flex-col space-y-2"><UserInfo prenom={data.prenom} nom={data.nom} email={data.email} sexe={data.sexe} telephone={data.telephone} user={data.user} formation={data.formation} apte={data.apte}/> 
    <Button className="bg-sky-600 hover:bg-sky-700" size="lg" onClick={() => handleViewEtudiant(data)}>
      <BsEye size={26} /> VOIR L'ETUDIANT
    </Button> </div>  : <FaSearch className="h-32 w-32 text-white my-5"/>}
        </div>
      </>
    );
}

export default SearchComponent