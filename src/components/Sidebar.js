// src/components/Sidebar.js
import { Category, Dashboard, Home } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <div className="sidebar">
        <ul>
            <li><Link to="/"><Home /> Home</Link></li>
            <li><Link to="/dashboard"><Dashboard /> Dashboard</Link></li>
            <li><Link to="/categories"><Category /> Categories</Link></li>
        </ul>
    </div>
);

export { Sidebar };
