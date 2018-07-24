import React from 'react';
import ChartistGraph from 'react-chartist';
import chartistPluginFillDonut from 'chartist-plugin-fill-donut';
import '../node_modules/chartist/dist/chartist.css';
import './doughnuts.css';

function Doughnut({number_completed, number_assigned}) {

  const data = {
    series: [number_completed, number_assigned - number_completed],
  };

  const options = {
    donut: true,
    donutWidth: 10,
    startAngle: 240,
    showLabel: false,
    chartPadding:0,
    total: number_assigned*1.5,
    plugins: [
      chartistPluginFillDonut({
          items: [{
              content: `${number_completed}/${number_assigned}`
          }]
      })
  ],
  }

  return (
    <figure className="pie">
      <ChartistGraph
        data={data}
        options={options}
        type="Pie"
        
      />
      <figcaption>
        
      </figcaption>
    </figure>

  );

}

export default Doughnut;