import React, { createContext, useState } from 'react';

const FilterContext = createContext({
    filters: {
      precioMinimo: 0,
      precioMaximo: Infinity,
    },
    updateCategoriaFilter: (categoria: string) => {},
    updatePrecioMinimoFilter: (precioMinimo: number) => {},
    updatePrecioMaximoFilter: (precioMaximo: number) => {},
  });

  const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
      precioMinimo: 0,
      precioMaximo: Infinity,
    });
  
    const updateCategoriaFilter = (categoria) => {
        setFilters((prevFilters) => ({ ...prevFilters, categoria: categoria }));
      };
  
    const updatePrecioMinimoFilter = (precioMinimo) => {
      setFilters((prevFilters) => ({ ...prevFilters, precioMinimo }));
    };
  
    const updatePrecioMaximoFilter = (precioMaximo) => {
      setFilters((prevFilters) => ({ ...prevFilters, precioMaximo }));
    };
  
    return (
      <FilterContext.Provider
        value={{
          filters,
          updateCategoriaFilter,
          updatePrecioMinimoFilter,
          updatePrecioMaximoFilter,
        }}
      >
        {children}
      </FilterContext.Provider>
    );
  };
  
  
  export { FilterContext, FilterProvider };

