import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartContextProvider } from './context/CartContext';
import { AppContextProvider } from './context/AppContext';
import { UserContextProvider } from './context/UserContext';
import Header from './layout/Header';
import ScrollToTop from './routers/ScrollToTop';
import MyRoutes from './routers/index';

const App = () => (
  <>
        <AppContextProvider>
          <UserContextProvider>
            <CartContextProvider>
              <ScrollToTop />
              <Header />
              <MyRoutes />
            </CartContextProvider>
          </UserContextProvider>
        </AppContextProvider>
  </>
);

export default App;
