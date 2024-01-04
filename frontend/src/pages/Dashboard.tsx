import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend, LineController, PointElement, PieController, ArcElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import randomColor from 'randomcolor';

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PieController,
  Tooltip,
  Legend,
  LineController,
  PointElement
);

const Dashboard = () => {
  const [categorias, setCategorias] = useState([]);
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [cantidadProductosPorCategoria, setCantidadProductosPorCategoria] = useState([]);

  const generateRandomColors = (count) => {
    return randomColor({
      count: count,
      luminosity: 'bright',
      format: 'rgba',
    });
  };

  useEffect(() => {
    const fetchVentasPorMes = async () => {
      try {
        const response = await fetch('http://localhost:3000/pedidos/promedio');
        const data = await response.json();
        setVentasPorMes(data);
      } catch (error) {
        console.error('Error al obtener las ventas por mes:', error);
      }
    };

    fetchVentasPorMes();
  }, [categorias]);

  const obtenerNroProductosPorCategoria = async (categoria) => {
    const url = 'http://localhost:3000/productos?categoria=' + categoria._id;
    const response = await fetch(url);
    const data = await response.json();
    const cantidad = data.length;
    return cantidad;
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/categorias');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const obtenerCantidadProductosPorCategoria = async () => {
      const cantidadProductosPromesas = categorias.map((categoria) =>
        obtenerNroProductosPorCategoria(categoria)
      );
      const cantidadProductos = await Promise.all(cantidadProductosPromesas);
      const cantidadProductosPorCategoria = categorias.map((categoria, index) => ({
        nombre: categoria.nombre,
        cantidad: cantidadProductos[index],
      }));
      setCantidadProductosPorCategoria(cantidadProductosPorCategoria);
    };

    if (categorias.length > 0) {
      obtenerCantidadProductosPorCategoria();
    }
  }, [categorias]);

  const data1 = {
    labels: cantidadProductosPorCategoria.map((categoria) => categoria.nombre),
    datasets: [
      {
        label: 'Cantidad de Productos',
        data: cantidadProductosPorCategoria.map((categoria) => categoria.cantidad),
        backgroundColor: generateRandomColors(categorias.length),
        borderColor: 'rgba(173, 173, 173)',
        borderWidth: 0.5,
      },
    ],
  };

  const options1 = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const data2 = {
    labels: ventasPorMes.map((mes) => mes.mes),
    datasets: [
      {
        label: 'Valor Promedio de Pedidos',
        data: ventasPorMes.map((mes) => mes.valorPromedio),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options2 = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const [ventasMensuales, setVentasMensuales] = useState([]);

  useEffect(() => {
    const fetchVentasMensuales = async () => {
      try {
        const response = await fetch('http://localhost:3000/pedidos/ventas-mensuales');
        const data = await response.json();
        setVentasMensuales(data);
      } catch (error) {
        console.error('Error al obtener las ventas mensuales:', error);
      }
    };

    fetchVentasMensuales();
  }, []);

  const data3 = {
    labels: ventasMensuales.map((venta) => venta.mes),
    datasets: [
      {
        label: 'Cantidad de Ventas por Mes',
        data: ventasMensuales.map((venta) => venta.cantidadVentas),
        backgroundColor: generateRandomColors(ventasMensuales.length),
        borderColor: 'rgba(173, 173, 173)',
        borderWidth: 0.5,
      },
    ],
  };

  const options3 = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className='dashboard-container'>
      <h1 className='titulo'>Dashboard</h1>
      <div className="graphs-container">
        <div className="graph">
          <h2 className='titulo'>Productos por Categoría</h2>
          <Pie data={data1} options={options1} />
        </div>
        <div className="graph">
          <h2 className='titulo'>Valor Promedio de Pedidos por Mes</h2>
          <Line data={data2} options={options2} />
        </div>
        <div className="graph">
          <h2 className='titulo'>Cantidad de Ventas por Mes</h2>
          <Bar data={data3} options={options3} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
