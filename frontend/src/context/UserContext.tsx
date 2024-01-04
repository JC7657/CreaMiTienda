import React, { createContext, useState } from 'react';

const UserContext = createContext<any>(null);
const UserContextProvider = ({ children }: any) => {
    const [userData, setUserData] = useState({
        nombre: '',
        apellidoPat: '',
        apellidoMat: '',
        correo: '',
        rut: '',
        telefono: '',
        direccion:'',
    });
    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };

export default UserContext;
