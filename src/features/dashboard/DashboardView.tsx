import React from 'react';
import DashboardAIInsights from '../ai-insights/components/DashboardAIInsights';

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Dashboard Operativo</h1>
        <p className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
          Sistema de Gestión Integral V9
        </p>
      </div>

      <div className="mt-8">
        <DashboardAIInsights systemContext="Planteles registrados: 15. Docentes activos: 120. Escuelas con déficit de internet: 60%." />
      </div>
    </div>
  );
};
