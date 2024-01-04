import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonPrimary from './ButtonPrimary';
import Modal from './Modal';

const Mantenedor = () => {
  const { tipo } = useParams();
  const [data, setData] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const url = `http://localhost:3000/${tipo}`
        console.log("URL: " + url)
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, [tipo]);

  const handleEditar = (id: string) => {
    // Lógica para editar el objeto con el ID proporcionado
  };

  const handleEliminar = (_id: string) => {
    console.log(_id);
    try {
        const url = `http://localhost:3000/${tipo}/${_id}`
        console.log(url)
        fetch(url, { method: 'DELETE' })
        .then(() => window.location.reload());
    }
    catch(error) {
        console.log(error)
    }
  };

  const handleIngresar = () => {
    // Lógica para ingresar un nuevo objeto
  };

  const handleOpenModal = async (item: any) => {
    await setSelectedItem(item);
    console.log(Object.keys(selectedItem));
    console.log(item)
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <h1 className='table-header titulo'>Mantenedor de {tipo}</h1>
      {data.length > 0 ? (
        <table className='table'>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((objeto, index) => (
              <tr key={index}>
                {Object.entries(objeto).map(([key, value]) => (
                  <td key={key}>
                    {Array.isArray(value) ? (
                      <button className="btn-ver" onClick={() => handleOpenModal(value)}>
                        Ver Detalles
                      </button>
                    ) : (
                      typeof value === 'number' ? +value : value
                    )}
                  </td>
                ))}
                <td>
                  {/* <button className='btn-editar' onClick={() => handleEditar(objeto.id)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button> */}
                  <button className='btn-eliminar' onClick={() => handleEliminar(objeto._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='p-nofound'>No se encontraron datos</p>
      )}
      
      {/* Condición para mostrar el botón de ingresar */}
      {tipo === 'productos' || tipo === 'categorias' ? (
        <ButtonPrimary href={`/admin-panel/ingresar/${tipo}`} className='btn-ingresar' onClick={handleIngresar}>
          Ingresar
        </ButtonPrimary>
      ) : null}
      {selectedItem && (
        <Modal open={true} onClose={handleCloseModal} data={selectedItem} headers={Object.keys(selectedItem[0])}>
          {/* Contenido del modal */}
          <h2>Detalles</h2>
          {selectedItem.productos && selectedItem.productos.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(selectedItem.productos[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selectedItem.productos.map((producto: any, index: number) => (
                  <tr key={index}>
                    {Object.values(producto).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No se encontraron productos asociados</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Mantenedor;
