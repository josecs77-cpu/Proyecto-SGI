import React from 'react';
import AvancesManager from './components/AvancesManager';
import ConsolidacionEstatal from './components/ConsolidacionEstatal';

export const DashboardView: React.FC = () => {
  // We mock the missing parts for this view integration since the store was not defined globally in this context
  const planteles: any[] = [];
  const rac: any[] = [];
  const matricula: any[] = [];
  const personal: any[] = [];
  const fede: any[] = [];
  const cnae: any[] = [];

  const currentUser = {
    id: "user-1",
    role: "ADMINISTRADOR",
    estadoAsignado: "MIRANDA"
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Dashboard Operativo</h1>
        <p className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
          Sistema de Gestión Integral V9
        </p>
      </div>

      <div className="mt-8 space-y-12">
        <AvancesManager
            planteles={planteles as any}
            rac={rac as any}
            matricula={matricula}
            personal={personal}
            currentUser={currentUser as any}
            systemState="Sistema Activo"
            aiEnabled={true}
        />

        <div className="border-t-4 border-dashed border-slate-200 my-10"></div>

        <ConsolidacionEstatal
            planteles={planteles as any}
            rac={rac as any}
            matricula={matricula}
            fede={fede}
            cnae={cnae}
            currentUser={currentUser as any}
            systemState="Sistema Activo"
        />
      </div>
    </div>
  );
};