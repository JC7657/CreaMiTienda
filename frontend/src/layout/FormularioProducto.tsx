import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Dropzone from 'react-dropzone';

const FormularioProducto = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin } = useAuth();
    const { accion, id } = useParams(); // Obtener los parámetros de la URL
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imagen, setImagen] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        // Fetch para obtener las categorías disponibles
        fetch('http://localhost:3000/categorias/')
            .then((response) => response.json())
            .then((data) => setCategorias(data))
            .catch((error) => console.error('Error al obtener las categorías:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Url = 'http://localhost:3000/' + uploadedImageUrl;

        const data = {
            nombre,
            precio,
            stock,
            descripcion,
            categoria,
            imagenURL: Url,
        };

        try {
            console.log(token)
            const response = await fetch('http://localhost:3000/productos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Producto ingresado exitosamente');
                window.location.replace("/admin-panel/mantenedor/productos/")
            } else {
                console.error('Error al ingresar el producto');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const onDrop = async (acceptedFiles) => {
        try {
            const formData = new FormData();
            formData.append('imagen', acceptedFiles[0]);
            console.log(formData);
            // Fetch para subir la imagen al backend
            const response = await fetch('http://localhost:3000/productos/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setImagen(acceptedFiles[0]);
                setUploadedImageUrl(data.imageUrl);
            } else {
                console.error('Error al subir la imagen');
            }
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    return (
        <div className="formulario-container">
            <h1>{accion === 'editar' ? 'Editar Producto' : 'Ingresar Producto'}</h1>
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <input type="number" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="categoria">Categoría</label>
                    <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria._id} value={categoria._id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="imagen">Imagen</label>
                    <Dropzone onDrop={onDrop} accept="image/*">
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                {imagen ? <img src={URL.createObjectURL(imagen)} alt="Imagen subida" /> : <p>Arrastra y suelta una imagen o haz clic para seleccionarla.</p>}
                            </div>
                        )}
                    </Dropzone>
                </div>
                <button className="formulario-button" type="submit">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default FormularioProducto;
