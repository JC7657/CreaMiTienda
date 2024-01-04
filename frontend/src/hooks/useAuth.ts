import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    const autenticarAdmin = async () => {
      try {
        const response = await fetch('http://localhost:3000/clientes/autenticar-admin', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setIsAdmin(true);
        } else {
          setIsAuthenticated(true);
          setIsAdmin(false);
        }

        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setIsLoading(false);
      }
    };

    autenticarAdmin();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rut');
    localStorage.removeItem('direccion');
    localStorage.removeItem('apellidoPaterno');
    localStorage.removeItem('apellidoMaterno',);
    localStorage.removeItem('correoElectronico');
    localStorage.removeItem('telefono');
    setIsAuthenticated(false);
    setIsAdmin(false);
    window.location.replace("/"); 
  };

  return { isAuthenticated, isAdmin, isLoading, setIsAdmin, setIsAuthenticated, logout };
};

export default useAuth;
