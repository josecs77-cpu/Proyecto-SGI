import React, { useState } from 'react';
import { GeoMapaManager } from './components/GeoMapaManager';
import { Plantel } from '../schools/types';
import { MatriculaRegistro, FedeRegistro, CnaeRegistro } from './types';
import { RacRegistro } from '../staff/types';

// Mock Data for the View
const mockPlanteles: Plantel[] = [
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

const mockMatricula: MatriculaRegistro[] = [
  { id: '1', plantelId: '1', nivel: 'PRIMARIA', inscriptosFemenino: 120, inscriptosMasculino: 105, fechaCarga: '2024-01-01' }
];

const mockRac: RacRegistro[] = [
  { id: '1', plantelId: '1', tipoPersonal: 'DOCENTE', funcion: 'DOCENTE AULA' } as RacRegistro
];

const mockFede: FedeRegistro[] = [
  { id: '1', plantelId: '1', estadoGeneral: 'REGULAR' }
];

const mockCnae: CnaeRegistro[] = [
  { id: '1', plantelId: '1', recibioPae: true }
];

export const GeoMapView: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="h-full relative">
      <GeoMapaManager
        planteles={mockPlanteles}
        matricula={mockMatricula}
        rac={mockRac}
        fede={mockFede}
        cnae={mockCnae}
        isFullScreen={isFullScreen}
        onFullScreenToggle={setIsFullScreen}
      />
    </div>
  );
};
