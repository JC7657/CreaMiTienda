import React from 'react';
import productoIcon from '../resources/img/producto.png';
import clientesIcon from '../resources/img/clientes.png';
import categoriasIcon from '../resources/img/categoria.png';
import pedidosIcon from '../resources/img/pedidos.png';
import estadisticasIcon from '../resources/img/estadisticas.png';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    return (
        <div className="panel_adm">
            <h1>Panel de Administración</h1>
            <h2>Administra tu tienda online con las siguientes opciones</h2>
            <div className="panel_opciones">
                <Link to="mantenedor/productos/"><button className="btn_mantenedor"><img src={productoIcon} />Productos</button></Link>
                <Link to="mantenedor/clientes/"><button className="btn_mantenedor"><img src={clientesIcon} />Clientes</button></Link>
                <Link to="mantenedor/categorias/"><button className="btn_mantenedor"><img src={categoriasIcon}  />Categorías</button></Link>
                <Link to="mantenedor/pedidos/"><button className="btn_mantenedor"><img src={pedidosIcon} />Pedidos</button></Link>
                <Link to="dashboard/"><button className="btn_mantenedor"><img src={estadisticasIcon} />Estadísticas</button></Link>
            </div>
        </div>
    );
};

export default AdminPanel;