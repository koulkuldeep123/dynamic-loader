import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <nav className="navbar">
            <button onClick={handleGoBack}>Back</button>
            <Link to="/">Dashboard</Link>
            <Link to="/list">List</Link>

        </nav>
    );
};

export default React.memo(NavBar);