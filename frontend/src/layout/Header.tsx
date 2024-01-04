import React, { FC, useState } from 'react';
import Logo from './Logo';
import CartDropdown from './CartDropdown';
import { MagnifyingGlassIcon, XMarkIcon, ArrowLeftOnRectangleIcon, WrenchIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import ButtonSecondary from './ButtonSecondary';
import useAuth from '../hooks/useAuth'; // Importar el hook useAuth

const Header: FC = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth(); // Obtener el estado de autenticación, el rol del usuario y la función de logout

  const renderSearchForm = () => {
    return (
        <form
          className="flex-1 py-2 text-slate-900 dark:text-slate-100"
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/page-search');
          }}
        >
          <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
            <MagnifyingGlassIcon className={`${showSearchForm && 'text-black'} w-6 h-6`} />
            <input type="text" placeholder="Busca tu artículo favorito" className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base" autoFocus />
            <button type="button" onClick={() => setShowSearchForm(false)}>
              <XMarkIcon className={`${showSearchForm && 'text-black'} w-6 h-6`} />
            </button>
          </div>
          <input type="submit" hidden value="" />
        </form>
      );
  };

  const handleLogoutClick = () => {
    logout(); // Llama a la función de logout del hook useAuth
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 flex justify-between">
          <div className="flex lg:flex-1 items-center space-x-3 sm:space-x-8">
            <Logo />
            {!showSearchForm && <div className="hidden md:block h-10 border-l border-slate-200 dark:border-slate-700"></div>}
          </div>

          {showSearchForm && <div className={`${width < 768 ? 'w-screen absolute z-10 top-0 right-0 bg-primary-300 px-10 py-3' : 'flex-[2] flex !mx-auto px-10'}`}>{renderSearchForm()}</div>}

          <div className="flex-1 flex items-center justify-end">
            <button className={` ${showSearchForm && 'bg-primary-500 bg-opacity-50'} rounded p-3 m-2 transition-colors duration-150`} onClick={() => setShowSearchForm(!showSearchForm)}>
              <MagnifyingGlassIcon className={`${showSearchForm && 'text-white'} w-6 h-6`} strokeWidth={2} />
            </button>
            <CartDropdown />
            {isAuthenticated && isAdmin && (
              <button onClick={() => navigate('/admin-panel')}>
                <WrenchIcon className="w-6 h-6 btn-logout" />
              </button>
            )}
            {isAuthenticated && (
              <button>
                <ArrowLeftOnRectangleIcon onClick={handleLogoutClick} className="w-6 h-6 btn-logout" />
              </button>
            )}
            {!isAuthenticated && (
              <>
                <ButtonSecondary className='login-button' href="/login">Iniciar Sesión</ButtonSecondary>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
