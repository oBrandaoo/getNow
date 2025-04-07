// components/Navbar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo_CashFlow.svg';
import './header.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/home', active: true },
        { name: 'Produtos', path: '/products' },
        { name: 'Serviços', path: '/services' },
        { name: 'Relatórios', path: '/reports' },
        { name: 'Configurações', path: '/settings' },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className='navbar'>
            <div className='nav-left'>
                <div className='logo-container'>
                    <img src={logo} alt="Logo" className='logo-image' />
                    <h1 className='logo-text'></h1>
                </div>
                <div className='nav-links'>
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className={`nav-button ${location.pathname === item.path ? 'active-nav-button' : ''}`}
                            onClick={() => navigate(item.path)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
            <button className='logout-button' onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Navbar;