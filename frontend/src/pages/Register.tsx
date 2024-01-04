import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correoElectronico: '',
    clave: '',
    telefono: '',
    direccion: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/clientes/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <div className="form-registrar">
      <h4>Crea tu cuenta</h4>
      <input className="controls" type="email" name="correoElectronico" id="correo" placeholder="E-mail" onChange={handleChange} />
      <input className="controls" type="text" name="nombre" id="nombre" placeholder="Nombre" onChange={handleChange} />
      <input className="controls" type="text" name="apellidoPaterno" id="apellidoPaterno" placeholder="Apellido Materno" onChange={handleChange} />
      <input className="controls" type="text" name="apellidoMaterno" id="apellidoMaterno" placeholder="Apellido Paterno" onChange={handleChange} />
      <input className="controls" type="text" name="telefono" id="num_telefono" placeholder="Número telefónico" onChange={handleChange} />
      <input className="controls" type="text" name="direccion" id="direccion" placeholder="Dirección" onChange={handleChange} />
      <input className="controls" type="text" name="rut" id="rut" placeholder="RUT (Sin punto y con guión)" onChange={handleChange} />
      <input className="controls" type="password" name="clave" id="password" placeholder="Contraseña" onChange={handleChange} />
      <button className="btn_registrar" type="submit" onClick={handleSubmit}>
        Registrate
      </button>
      <p>
        <a href="/login">¿Ya tienes una cuenta? Iniciar Sesión</a>
      </p>
    </div>
  );
};

export default Register;
