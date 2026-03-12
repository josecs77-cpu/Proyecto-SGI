export type NivelEducativo = 'INICIAL' | 'PRIMARIA' | 'MEDIA GENERAL' | 'MEDIA TECNICA' | 'ADULTOS' | 'ESPECIAL';
export type Turno = 'MAÑANA' | 'TARDE' | 'INTEGRAL' | 'NOCTURNO';
export type Dependencia = 'NACIONAL' | 'ESTADAL' | 'MUNICIPAL' | 'AUTONOMA' | 'PRIVADA' | 'SUBVENCIONADA';
export type ModalidadEducativa = 'REGULAR' | 'ESPECIAL' | 'ADULTOS' | 'ARTES' | 'INTERCULTURAL';

export interface EspaciosFisicos {
  oficinas: number;
  pasillos: number;
  salones: number;
  depositos: number;
  cocina: number;
  patio: number;
  plazoleta: number;
  jardines: number;
  cancha: number;
  banos: number;
  multiuso: number;
  estacionamiento: number;
  cbit: number;
  anfiteatro: number;
  biblioteca: number;
}

export interface Conexion {
  proveedor: string;
  tipoConexion: string;
  status: 'Activa' | 'Averia' | 'Suspendido' | '';
  fechaInstalacion: string;
}

export interface Conectividad {
  tieneInternet: boolean;
  conexion1: Conexion;
  tieneSegundaConexion?: boolean;
  conexion2?: Conexion;
}

export interface RedesSociales {
  facebook?: string;
  instagram?: string;
  x?: string;
  tiktok?: string;
}

export interface Plantel {
  id: string;
  nombre: string;
  codigoDea: string;
  codigoEstadistico?: string;
  codigoDependencia?: string;
  codigoElectoral?: string;
  dependencia: Dependencia | string;
  numeroNer?: string;
  estado: string;
  municipio: string;
  parroquia: string;
  circuitoEducativo?: string;
  direccion: string;
  latitud: string;
  longitud: string;
  director: string;
  ciDirector: string;
  telefono: string;
  emailDirector: string;
  niveles: NivelEducativo[];
  modalidades: ModalidadEducativa[];
  turnos: Turno[];
  espaciosFisicos: EspaciosFisicos;
  conectividad: Conectividad;
  redesPlantel?: RedesSociales;
  redesDirector?: RedesSociales;
  fechaRegistro: string;
}
