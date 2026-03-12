import React, { useState } from 'react';
import { useSchools } from './hooks/useSchools';
import { SchoolsList } from './components/SchoolsList';
import { SchoolForm } from './components/SchoolForm';
import { Plantel } from './types';

// Mock currentUser & forcedPlanteles for now
const currentUser = { role: 'ADMINISTRADOR', estadoAsignado: 'ANZOATEGUI' };
const mockSchools: Plantel[] = [
  {
    id: '1', nombre: 'U.E.N. SIMON BOLIVAR', codigoDea: 'S1234D', dependencia: 'NACIONAL',
    municipio: 'BOLIVAR', parroquia: 'EL CARMEN', estado: 'ANZOATEGUI', direccion: 'CALLE SUCRE',
    director: 'JUAN PEREZ', ciDirector: '12345678', telefono: '0414-1234567', emailDirector: 'juan@test.com',
    niveles: ['PRIMARIA', 'MEDIA GENERAL'], modalidades: ['REGULAR'], turnos: ['MAÑANA'],
    latitud: '10.123', longitud: '-64.123', fechaRegistro: '2024-01-01',
    espaciosFisicos: { oficinas: 1, pasillos: 2, salones: 10, depositos: 1, cocina: 1, patio: 1, plazoleta: 1, jardines: 1, cancha: 1, banos: 2, multiuso: 0, estacionamiento: 1, cbit: 1, anfiteatro: 0, biblioteca: 1 },
    conectividad: { tieneInternet: true, conexion1: { proveedor: 'CANTV', tipoConexion: 'ADSL (COBRE)', status: 'Activa', fechaInstalacion: '2023-01-01' } }
  }
];

const SchoolsView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');
  const [currentPlantel, setCurrentPlantel] = useState<Partial<Plantel>>({});

  const {
    schools, totalSchools, contextLabel,
    searchTerm, setSearchTerm,
    filterMun, setFilterMun,
    filterPar, setFilterPar,
    filterDep, setFilterDep,
    filterNivel, setFilterNivel,
    filterMod, setFilterMod,
    saveSchool, deleteSchool
  } = useSchools(mockSchools);

  const activeState = currentUser.estadoAsignado || 'ANZOATEGUI';
  const canRegister = currentUser.role === 'ADMINISTRADOR' || currentUser.role === 'MUNICIPAL';

  const handleAddSchool = () => {
    setCurrentPlantel({
      estado: activeState,
      dependencia: 'NACIONAL',
      espaciosFisicos: { oficinas: 0, pasillos: 0, salones: 0, depositos: 0, cocina: 0, patio: 0, plazoleta: 0, jardines: 0, cancha: 0, banos: 0, multiuso: 0, estacionamiento: 0, cbit: 0, anfiteatro: 0, biblioteca: 0 },
      conectividad: { tieneInternet: false, conexion1: { proveedor: '', tipoConexion: '', status: '', fechaInstalacion: '' } },
      redesPlantel: {},
      redesDirector: {}
    });
    setViewMode('form');
  };

  const handleEditSchool = (school: Plantel) => {
    setCurrentPlantel(school);
    setViewMode('form');
  };

  const handleSave = (plantel: Plantel) => {
    saveSchool(plantel);
    setViewMode('list');
    setCurrentPlantel({});
  };

  return (
    <div className="h-full">
      {viewMode === 'list' ? (
        <SchoolsList
          schools={schools}
          totalSchools={totalSchools}
          contextLabel={contextLabel}
          canRegister={canRegister}
          searchTerm={searchTerm} onSearchChange={setSearchTerm}
          filterMun={filterMun} onFilterMunChange={setFilterMun}
          filterPar={filterPar} onFilterParChange={setFilterPar}
          filterDep={filterDep} onFilterDepChange={setFilterDep}
          filterNivel={filterNivel} onFilterNivelChange={setFilterNivel}
          filterMod={filterMod} onFilterModChange={setFilterMod}
          onAddSchool={handleAddSchool}
          onEditSchool={handleEditSchool}
          onDeleteSchool={deleteSchool}
          onViewDetails={handleEditSchool}
          activeState={activeState}
        />
      ) : (
        <SchoolForm
          initialData={currentPlantel}
          onSave={handleSave}
          onCancel={() => setViewMode('list')}
          activeState={activeState}
        />
      )}
    </div>
  );
};

export default SchoolsView;
