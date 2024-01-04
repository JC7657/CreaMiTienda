import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Dropzone from 'react-dropzone';
import { url } from 'inspector';

const FormularioCategoria = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin } = useAuth();
    const { accion, id } = useParams(); // Obtener los parámetros de la URL
    const [nombre, setNombre] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nombre
        };

        try {
            const response = await fetch('http://localhost:3000/categorias/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Categoría ingresada exitosamente');
                window.location.replace("/admin-panel/mantenedor/categorias/")
            } else {
                console.error('Error al ingresar la categoría');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div className="formulario-container">
            <h1>{accion === 'editar' ? 'Editar Categoría' : 'Ingresar Categoría'}</h1>
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <button className="formulario-button" type="submit">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default FormularioCategoria;
