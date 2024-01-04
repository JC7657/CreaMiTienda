// Billing.jsx
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import CartContext from '../context/CartContext';
import ButtonPrimary from '../layout/ButtonPrimary';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
    const { cart, getTotal, getTotalItems } = useContext(CartContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const nombre = localStorage.getItem('nombre');
    const apPat = localStorage.getItem('apellidoPaterno');
    const apMat = localStorage.getItem('apellidoMaterno');
    const correo = localStorage.getItem('correoElectronico');
    const rut = localStorage.getItem('rut');
    const telefono = localStorage.getItem('telefono');
    const id = localStorage.getItem('id');

    const onSubmit = async (data) => {
        console.log(getTotal())
        const productos = cart.map((producto) => ({
          producto: producto._id,
          cantidad: producto.quantity,
        }));

        const productosBoleta = cart.map((producto) => ({
            producto: producto._id,
            productoNombre: producto.nombre,
            cantidad: producto.quantity,
          }));

        const infoBoleta = {
            nombreCliente: nombre,
            apPat: apPat,
            apMat: apMat,
            productos: productosBoleta,
            direccionEnvio: data.direccion,
            total: getTotal()
        }
      
        const pedidoData = {
          cliente: id,
          productos: productos,
          total:getTotal(),
          direccionEnvio: data.direccion,
        };
      
        try {
          const response = await fetch('http://localhost:3000/pedidos/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoData),
          });
      
          if (response.ok) {
            console.log('Pedido realizado con éxito');
            navigate('/transaccion-exitosa', { state: { boleta: infoBoleta } });
        } else {
            console.log('Hubo un error al realizar el pedido');
            // Aquí podrías mostrar un mensaje de error al usuario
          }
        } catch (err) {
          console.error('Error al realizar el pedido:', err);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      };

    return (
        <>
            <div className="w-11/12 mx-auto flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 mx-auto mt-8 md:mt-0">
                    <div className="detalle-container">
                        <h2 className="text-center text-black font-semibold">Tu carro</h2>
                        <div className="flex flex-col justify-center items-center mt-4 gap-2">
                            {cart &&
                                cart.map((item) => (
                                    <div className="bg-white w-full detalle-producto" key={item.id}>
                                        <img className="w-16 img-cart-detail" src={item.imagenURL} alt={item.name} />
                                        <div>
                                            <p>{item.name}</p>
                                            <p>Cantidad: {item.quantity}</p>
                                            <p>Precio: ${item.precio}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="mt-6 detalle-container">
                        <h2 className="text-xl font-semibold">Resumen de tu compra</h2>
                        <span>
                            Total: <b>{getTotal().toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</b>
                        </span>
                        <h3>
                            Cantidad de productos: <span>{getTotalItems()}</span>
                        </h3>
                    </div>
                </div>

                <form className="w-full md:w-2/3 mx-auto mt-8 md:mt-0" onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white rounded-lg p-4">
                        <h2 className="text-center text-xl font-semibold">Formulario de Compra</h2>

                        {/* Nombre */}
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-1">
                                Nombre
                            </label>
                            <input value={nombre} type="text" id="nombre" readOnly {...register('nombre', { required: true })} className="disabled border rounded-md px-3 py-2 w-full" />
                            {errors.nombre && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        {/* Apellido Paterno */}
                        <div className="mb-4">
                            <label htmlFor="apellidoPaterno" className="block text-gray-700 font-semibold mb-1">
                                Apellido Paterno
                            </label>
                            <input
                                value={apPat}
                                readOnly
                                type="text"
                                id="apellidoPaterno"
                                {...register('apellidoPaterno', { required: true })}
                                className="disabled border rounded-md px-3 py-2 w-full"
                            />
                            {errors.apellidoPaterno && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        {/* Apellido Materno */}
                        <div className="mb-4">
                            <label htmlFor="apellidoMaterno" className="block text-gray-700 font-semibold mb-1">
                                Apellido Materno
                            </label>
                            <input
                                value={apMat}
                                readOnly
                                type="text"
                                id="apellidoMaterno"
                                {...register('apellidoMaterno', { required: true })}
                                className="disabled border rounded-md px-3 py-2 w-full"
                            />
                            {errors.apellidoMaterno && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        {/* Correo Electrónico */}
                        <div className="mb-4">
                            <label htmlFor="correoElectronico" className="block text-gray-700 font-semibold mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                value={correo}
                                readOnly
                                type="email"
                                id="correoElectronico"
                                {...register('correoElectronico', { required: true })}
                                className="disabled border rounded-md px-3 py-2 w-full"
                            />
                            {errors.correoElectronico && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        {/* Rut */}
                        <div className="mb-4">
                            <label htmlFor="rut" className="block text-gray-700 font-semibold mb-1">
                                RUT
                            </label>
                            <input value={rut} readOnly type="text" id="rut" {...register('rut', { required: true })} className="disabled border rounded-md px-3 py-2 w-full" />
                            {errors.rut && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        {/* Teléfono */}
                        <div className="mb-4">
                            <label htmlFor="telefono" className="block text-gray-700 font-semibold mb-1">
                                Teléfono
                            </label>
                            <input value={telefono} readOnly type="tel" id="telefono" {...register('telefono', { required: true })} className="disabled border rounded-md px-3 py-2 w-full" />
                            {errors.telefono && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        {/* Dirección */}
                        <div className="mb-4">
                            <label htmlFor="direccion" className="block text-gray-700 font-semibold mb-1">
                                Dirección de Envío
                            </label>
                            <input type="text" id="direccion" {...register('direccion', { required: true })} className="border rounded-md px-3 py-2 w-full" />
                            {errors.direccion && <span className="text-red-500">Este campo es obligatorio</span>}
                        </div>

                        {/* Botón de Envío */}
                        <div className="mt-4">
                            <ButtonPrimary type="submit">Realizar Compra</ButtonPrimary>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Billing;
