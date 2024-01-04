import React, { useContext, useEffect, useState } from 'react';
import { Product } from '../types';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';
import ButtonPrimary from '../layout/ButtonPrimary';
import FilterSidebar from '../layout/FilterBar';
import Modal from 'react-modal';

const MarketPlace = () => {
  Modal.setAppElement('#root');
  const { product, setProduct, addToCart } = useContext(CartContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const openModal = (product: Product) => {
    console.log(userData);
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilterBar = () => {
    setShowFilter(!showFilter);
  };

  const showAddedToCartMessage = () => {
    setShowAddedMessage(true);
    // Establecemos un temporizador para ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  const updateFilteredProducts = (filteredProducts: Product[]) => {
    // Actualizar el estado del componente para mostrar los productos filtrados
    console.log('Productos filtrados:', filteredProducts);
    setProduct(filteredProducts);
  };

  return (
    <>
      <h1 className="text-6xl text-center mt-4 titulo">Marketplace</h1>
      <button className='boton-filtros' onClick={toggleFilterBar}><i className="fa-solid fa-filter"></i> Filtros</button>
      {showFilter && (
        <FilterSidebar isOpen={showFilter} onClose={toggleFilterBar} toggleFilterBar={toggleFilterBar} updateFilteredProducts={updateFilteredProducts} />
      )}
      <div className="flex flex-wrap md:flex-row md:flex-wrap mt-6 justify-center">
        {product && product.length > 0 ? (
          product.map((product: Product, index: number) => (
            <div key={index} className="md:w-1/4 m-2 bg-gradient-to-b from-secondary-50 to-secondary-200 shadow-lg hover:shadow-2xl m-6 rounded-2xl p-4">
              <h2 onClick={() => openModal(product)} className="text-primary-500 txt-nombre-producto">
                {product.nombre}
              </h2>
              <img onClick={() => openModal(product)} src={product.imagenURL} alt={product.nombre} className="img-producto" />
              <div className="card-bottom">
                <p onClick={() => openModal(product)} className="text-neutral-900 txt-precio">
                  ${product.precio}
                </p>
                <p onClick={() => openModal(product)} className="text-secondary-500">
                  Oferta especial: 20% de descuento
                </p>
                <p onClick={() => openModal(product)} className="text-neutral-600">
                  {product.descripcion}
                </p>
                <button
                className="text-primary-500 button-addToCart"
                onClick={() => {
                  addToCart(product);
                  showAddedToCartMessage(); // Mostrar el mensaje de producto añadido
                }}
              >
                Añadir al carrito
              </button>
              </div>
            </div>
          ))
        ) : (
          <h1>No se han encontrado productos</h1>
        )}
        <Modal shouldCloseOnOverlayClick={true} isOpen={modalIsOpen} onRequestClose={closeModal} className="modal h-full w-1/4 mx-auto">
          {selectedProduct && (
            <div className="flex flex-col justify-center items-center h-full gap-2" onClick={() => closeModal()}>
              <div className="flex flex-row">
                <h2 className="product-name">{selectedProduct.nombre}</h2>
                <svg onClick={() => closeModal()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <img className="product-image w-80" src={selectedProduct.imagenURL} alt={selectedProduct.nombre} />
              <p className="price">${selectedProduct.precio}</p>
              <p className="offer"></p>
              <p className="description">{selectedProduct.descripcion}</p>
              <ButtonPrimary
                onClick={() => {
                  addToCart(selectedProduct);
                }}
              >
                Añadir al carrito
              </ButtonPrimary>
            </div>
          )}
        </Modal>
      </div>
      {showAddedMessage && (
        <div className="product-added-message">
          ¡Producto añadido!
        </div>
      )}
    </>
  );
};

export default MarketPlace;
