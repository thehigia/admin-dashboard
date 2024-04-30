// src/pages/Home.js
import React from 'react';
import { Sidebar } from '../components/Sidebar';

const Home = () => (
    <div className="home">
        <Sidebar />
        <div className="content">
            <h1>Bem-vindo ao Painel Administrativo</h1>
            {/* Adicione métricas ou insights aqui */}
        </div>
    </div>
);

export { Home };