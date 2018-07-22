import React from 'react';
import ChartistGraph from 'react-chartist';
import '../node_modules/chartist/dist/chartist.css';

function Doughnut({number_completed, number_assigned}) {

  const data = {
    series: [number_completed],
    labels: [`${number_completed}/${number_assigned}`]
  };

  const options = {
    donut: true,
    donutWidth: 10,
    startAngle: 270,
    total: number_assigned,
    // showLabel: false,
  }

  return (
    <ChartistGraph
      data={data}
      options={options}
      type="Pie"
    />

  );

}

export default Doughnut;