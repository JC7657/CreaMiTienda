import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MarketPlace from '../pages/MarketPlace';
import Billing from '../pages/Billing';
import Help from '../pages/Help';
import About from '../pages/About';
import TransactionSuccessful from '../pages/TransactionSuccessful';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminPanel from '../pages/AdminPanel';
import AdminTable from '../pages/AdminTable';
import Dashboard from '../pages/Dashboard';
import FormularioProducto from '../layout/FormularioProducto';
import FormularioCategoria from '../layout/FormularioCategorias';
import useAuth from '../hooks/useAuth';

const MyRoutes = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Si estamos cargando, muestra un mensaje de carga o un spinner
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<MarketPlace />} />
      <Route path="/ayuda" element={<Help />} />
      <Route path="/sobre-nosotros" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      {/*Rutas protegidas para usuarios autenticados*/}
      {isAuthenticated && (
        <>
          <Route path="/pago" element={<Billing />} />
          <Route path="/transaccion-exitosa" element={<TransactionSuccessful />} />
        </>
      )}
      {/* Rutas protegidas para usuarios administradores */}
      {isAdmin && (
        <>
          <Route path="/admin-panel/" element={<AdminPanel />} />
          <Route path="/admin-panel/mantenedor/:tipo" element={<AdminTable />} />
          <Route path='/admin-panel/:accion/productos' element={<FormularioProducto/>} />
          {/* Ruta dinámica para editar productos */}
          <Route path='/admin-panel/:accion/productos/:id' element={<FormularioProducto/>} />

          <Route path='/admin-panel/:accion/categorias' element={<FormularioCategoria/>} />
          {/* Ruta dinámica para editar productos */}
          <Route path='/admin-panel/:accion/categorias/:id' element={<FormularioCategoria/>} />
          <Route path="/admin-panel/dashboard" element={<Dashboard />} />
        </>
      )}

      {/* Redirigir al usuario a la ruta de inicio si no está autenticado */}
      {!isAdmin && (
      <Route path="*" element={<Navigate to="/" />} />
      )}

      {!isAuthenticated && (
        <Route path='/pago' element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default MyRoutes;
