import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './shared/layouts/MainLayout.js';
import SchoolsView from './features/schools/SchoolsView.js';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <MainLayout>
      <div className="h-full p-4 md:p-8 overflow-hidden">
        <Routes>
          <Route path="/" element={
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard SGI V9</h1>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Bienvenido al Sistema de Gestión Integral</p>
            </div>
          } />
          <Route path="/schools" element={<SchoolsView />} />
        </Routes>
      </div>
    </MainLayout>
  );
};

export default App;
