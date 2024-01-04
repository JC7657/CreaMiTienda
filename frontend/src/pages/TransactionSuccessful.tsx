import React from 'react';
import { useLocation } from 'react-router-dom';

const TransactionSuccessful = () => {
  // Obtener el objeto de estado de ubicación
  const location = useLocation();
  const { boleta } = location.state || {}; // Si no hay datos del pedido, asignar un objeto vacío

  return (
    <div className="boleta-container">
      <h2 className="text-center text-2xl font-semibold mb-4">¡Transacción Exitosa!</h2>
      {boleta ? (
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Detalle del Pedido:</h3>
          <ul>
            <li>Cliente: {boleta.nombreCliente} {boleta.apPat} {boleta.apMat}</li>
            <li>Dirección de Envío: {boleta.direccionEnvio}</li>
            <li>
              Productos:
              <ul>
                {boleta.productos.map((producto) => (
                  <li key={producto.producto}>
                    ‣ {producto.productoNombre} - Cantidad: {producto.cantidad}
                  </li>
                ))}
              </ul>
            </li>
            <h2><b>Total: ${boleta.total}</b></h2>
          </ul>
        </div>
      ) : (
        <p>No se encontraron datos del pedido.</p>
      )}
    </div>
  );
};

export default TransactionSuccessful;
