import { Select } from "@mantine/core";
import { Chart } from "primereact/chart";
import { useState } from "react";


const StateComponent = ({data,options}) => {
    const [type,setType] = useState('bar');

  return (
    <>
    <div className="my-2 flex flex-col items-center justify-center w-full">
    <Select
      label="type de graphique"
      value={type}
      onChange={setType}
      placeholder="Choisir le type de graphique"
      data={[
        { value: 'bar', label: 'BAR' },
        { value: 'doughnut', label: 'Circulaire' },
      ]}
    />
    </div>
     <Chart type={type} data={data} options={options} />
    </>
  )
}

export default StateComponent