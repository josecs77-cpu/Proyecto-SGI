import React from 'react';
import MainLayout from './shared/layouts/MainLayout.js';

const App: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard SGI V9</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Bienvenido al Sistema de Gestión Integral
        </p>
      </div>
    </MainLayout>
  );
};

export default App;
