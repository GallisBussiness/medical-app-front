import { Select } from "@mantine/core";
import { useState } from "react";
import ApxChart from "react-apexcharts";

const StateComponentApx =({data,options}) => {
    const [type,setType] = useState('line');

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
        { value: 'line', label: 'LINE' },
      ]}
    />
    </div>
    <ApxChart
              options={options}
              series={data}
              type={type}
              width="500"
            />
    </>
  )
}

export default StateComponentApx