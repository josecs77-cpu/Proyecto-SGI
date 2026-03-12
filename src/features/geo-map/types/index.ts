export interface MatriculaRegistro {
  id: string;
  plantelId: string;
  nivel: string;
  inscriptosFemenino: number;
  inscriptosMasculino: number;
  fechaCarga: string;
}

export interface FedeRegistro {
  id: string;
  plantelId: string;
  estadoGeneral: 'BUENO' | 'REGULAR' | 'MALO' | 'CRITICO';
}

export interface CnaeRegistro {
  id: string;
  plantelId: string;
  recibioPae: boolean;
}

export type LayerType = 'POBLACION' | 'CONECTIVIDAD' | 'INFRAESTRUCTURA' | 'ALIMENTACION';
