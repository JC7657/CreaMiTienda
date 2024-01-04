import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import useAuth from '../hooks/useAuth'; // Importar el hook useAuth
import UserContext from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingClass, setLoadingClass] = useState('');
  const { userData, setUserData } = useContext(UserContext);
  const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setLoadingClass('btn-loading');

    const data = {
      correoElectronico,
      clave,
    };

    try {
      const response = await fetch('http://localhost:3000/clientes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Logueo correcto")
        const dataObtenida = await response.json();

        localStorage.setItem('token', dataObtenida.token);
        localStorage.setItem('id', dataObtenida.id);
        localStorage.setItem('rut', dataObtenida.rut);
        localStorage.setItem('nombre', dataObtenida.nombre);
        localStorage.setItem('apellidoPaterno', dataObtenida.apellidoPaterno);
        localStorage.setItem('apellidoMaterno', dataObtenida.apellidoMaterno);
        localStorage.setItem('direccion', dataObtenida.direccion);
        localStorage.setItem('correoElectronico', dataObtenida.correoElectronico);
        localStorage.setItem('telefono', dataObtenida.telefono);

        setIsAuthenticated(true);
        
        if (dataObtenida.tipo === 'administrador') {
          setIsAdmin(true); 
          window.location.replace("/"); 
        } 
        else {
          window.location.replace("/"); 
        }
      } else if (response.status === 400) {
        setError('Debe llenar todos los campos');
      } else if (response.status === 401) {
        // Credenciales inválidas
        setError('Credenciales inválidas');
      } else {
        // Otro tipo de error
        setError('Hubo un error en el inicio de sesión');
      }
      setLoading(false);
      setLoadingClass('');
    } catch (error) {
      // Maneja los errores de la solicitud, como errores de red
      console.error('Error en la solicitud:', error);
      setLoadingClass('');
      setLoading(false);
      setError('Hubo un error en la solicitud');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="form-login">
      <h1 className='header-login'>Inicia Sesión</h1>
      <form onSubmit={handleSubmit}>
        <h2>Correo electrónico</h2>
        <input className="controls" type="email" name="correo" id="correo" placeholder="Ingrese su E-mail" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} />
        <h2>Contraseña</h2>
        <input className="controls" type="password" name="password" id="password" placeholder="Ingrese su contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button className={classnames('btn-ingresar', loadingClass)} type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
        <div className='form-links'>
          <a href="#">Olvidé mi contraseña</a>
          <br />
          <a href="/registro">Crear cuenta</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
