import React from 'react';
import Mantenedor from '../layout/Mantenedor';
import { useParams } from 'react-router-dom';

const AdminTable = () => {
    const { tipo } = useParams<{ tipo?: string }>();
    const tipoActual = tipo || 'unvalid';
  return (
    <>
      <Mantenedor tipo={tipoActual} />
    </>
  );
};

export default AdminTable;