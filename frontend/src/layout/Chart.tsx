import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

const Chart = ({ type, data, options }) => {
  let ChartComponent;

  // Determina el tipo de gráfico a renderizar según la propiedad "type"
  switch (type) {
    case 'bar':
      ChartComponent = Bar;
      break;
    case 'line':
      ChartComponent = Line;
      break;
    case 'pie':
      ChartComponent = Pie;
      break;
    default:
      ChartComponent = Bar;
  }

  return (
    <div>
      <ChartComponent data={data} options={options} />
    </div>
  );
};

export default Chart;