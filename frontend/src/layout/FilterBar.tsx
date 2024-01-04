import React, { useContext, useEffect, useState } from 'react';
import { FilterContext } from '../context/FilterContext';
import { Categoria } from '../types/Categoria';
import { Product } from '../types';
import ButtonClose from './ButtonClose';

type FilterBarProps = {
    isOpen: boolean;
    onClose: () => void;
    toggleFilterBar: () => void;
    updateFilteredProducts: (filteredProducts: Product[]) => void; // Propiedad para pasar la función de actualización de productos filtrados
};

const FilterBar: React.FC<FilterBarProps> = ({ isOpen, onClose, toggleFilterBar, updateFilteredProducts }) => {
    const { updateCategoriaFilter, updatePrecioMinimoFilter, updatePrecioMaximoFilter, filters } = useContext(FilterContext);
    const { precioMinimo, precioMaximo } = filters;
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
    const [precioMinimoInput, setPrecioMinimoInput] = useState<string>(precioMinimo?.toString() || '');
    const [precioMaximoInput, setPrecioMaximoInput] = useState<string>(precioMaximo?.toString() || '');

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

    const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoriaId = event.target.value;
        console.log(categoriaId)
        setCategoriaSeleccionada(categoriaId);
    };

    const handlePrecioMinimoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPrecioMinimoInput(value);
    };

    const handlePrecioMaximoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPrecioMaximoInput(value);
    };

    const fetchProductos = async () => {
        try {
            let url = 'http://localhost:3000/productos';

            if (categoriaSeleccionada) {
                url += `?categoria=${categoriaSeleccionada}`;
            }

            if (precioMinimoInput) {
                url += `${categoriaSeleccionada ? '&' : '?'}precioMinimo=${precioMinimoInput}`;
            }

            if (precioMaximoInput) {
                url += `${categoriaSeleccionada || precioMinimoInput ? '&' : '?'}precioMaximo=${precioMaximoInput}`;
            }
            console.log("URL:" + url)

            const response = await fetch(url);
            const data = await response.json();
            updateFilteredProducts(data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updateCategoriaFilter(categoriaSeleccionada);
        updatePrecioMinimoFilter(Number(precioMinimoInput));
        updatePrecioMaximoFilter(Number(precioMaximoInput));
        onClose();
        fetchProductos();
    };

    return (
        <>
          <div className={`filter-bar ${isOpen ? 'open' : ''}`}>
            <button type="button" className="close-button" onClick={toggleFilterBar}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <form onSubmit={handleSubmit}>
              <div className="filter-option">
                <label htmlFor="categoria">Categoría:</label> 
                <select id="categoria" value={categoriaSeleccionada} onChange={handleCategoriaChange}>
                  <option value="">Todas</option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-option">
                <label htmlFor="precioMinimo">Precio Mínimo:</label>
                <input id="precioMinimo" type="number" min="0" value={precioMinimoInput} onChange={handlePrecioMinimoChange} />
              </div>
              <div className="filter-option">
                <label htmlFor="precioMaximo">Precio Máximo:</label>
                <input id="precioMaximo" type="number" min="0" value={precioMaximoInput} onChange={handlePrecioMaximoChange} />
              </div>
              <div className="filter-option">
                <button className="apply-button" type="submit">
                  Aplicar Filtros
                </button>
              </div>
            </form>
          </div>
          <div className="filter-overlay" onClick={toggleFilterBar}></div>
        </>
      );
};

export default FilterBar;
