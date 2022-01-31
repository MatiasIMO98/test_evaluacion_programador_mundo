import { NavLink } from 'react-router-dom';
import React from 'react';

export default function NavBarComponent() {
    return (
        <div className="topnav">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/CRUD">Mantenedor de calles</NavLink>
            <NavLink to="/visualizar">Lista de calles</NavLink>
        </div>
    );
}