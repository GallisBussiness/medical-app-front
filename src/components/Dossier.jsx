import { Text } from "@mantine/core"
function Dossier({ dossier }) {
    return (
        <>
            <div className="w-10/12 mx-auto my-10 flex flex-col justify-center space-y-5">
                <div className="flex">
                    <Text size={22} fw="bold" color="green">Poids : </Text>{'  '} <Text size={22}> {dossier?.poids}</Text>
                </div>
                <div className="flex">
                    <Text size={22} fw="bold" color="green">Taille : </Text>{'  '} <Text size={22}> {dossier?.taille}</Text>
                </div>
                <div className="flex">
                    <Text size={22} fw="bold" color="green">Groupe Sanguin : </Text> {'  '}<Text size={22}> {dossier?.groupe_sanguin}</Text>
                </div>
                <div className="flex">
                    <Text size={22} fw="bold" color="green">Handicaps particuliers : </Text>{'  '} <Text size={22}> {dossier?.handicap_particulier}</Text>
                </div>
                <div className="flex">
                    <Text size={22} fw="bold" color="green">Allergies : </Text> {'  '}<Text size={22}> {dossier?.allergies}</Text>
                </div>
                <div className="flex">
                    <Text size={22} fw="bold" color="green">Maladies Chroniques : </Text> {'  '}<Text size={22}> {dossier?.maladie_chronique}</Text>
                </div>
                <div className="flex">
                    <Text size={22} fw="bold" color="green">Antécédants Médicaux : </Text> {'  '}<Text size={22}> {dossier?.antecedants_medicaux}</Text>
                </div>
            </div>
        </>
    )
}

export default Dossier