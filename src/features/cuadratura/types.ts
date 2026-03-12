export type TipoCuadratura = 'INICIAL_PRIMARIA' | 'ESPECIAL' | 'MEDIA_TECNICA_GENERAL' | 'ADULTOS';

export interface Plantel {
    id: string;
    codigoDea: string;
    nombre: string;
    estado: string;
    municipio: string;
    niveles?: string[];
    modalidades?: string[];
    dependencia?: string;
    conectividad?: { tieneInternet: boolean };
}

export interface RacRegistro {
    id: string;
    plantelId: string;
    cedula: string;
    nombreApellido: string;
    ejeConsolidacion?: string;
    grado?: string;
    seccion?: string;
    materia?: string;
    ano?: string;
    horasAcademicas?: number | string;
    cargaHorariaRecibo?: number | string;
    clasificacion?: string; // Titular/Interino
    turno?: string;
    tipoPersonal?: string;
    funcion?: string;
}

export interface MatriculaRegistro {
    id: string;
    plantelId: string;
    nivel: string;
    fechaCarga: string;
    inscriptosFemenino: number;
    inscriptosMasculino: number;
}

export interface FedeRegistro {
    id: string;
    plantelId: string;
    estadoGeneral: 'BUENO' | 'REGULAR' | 'MALO' | 'CRITICO';
    necMesasillas: number;
    necPupitres: number;
}

export interface CnaeRegistro {
    id: string;
    plantelId: string;
    recibioPae: boolean;
}

export interface User {
    id: string;
    role: 'MUNICIPAL' | 'PLANTEL' | 'ADMINISTRADOR';
    estadoAsignado?: string;
    municipioAsignado?: string;
    plantelesAsignados?: string[];
}

export interface CuadraturaDocenteFila {
    id: string;
    cedula: string;
    nombreDocente: string;
    cargaHorariaRecibo: number;
    horasEnPlantel: number;
    titularInterino: string;
    turno: string;
    tipoPersonal: string;
    esVacante: boolean;
    matriculaAsignada: Record<string, number>;
    distribucionHoras: Record<string, number>;
}

export interface CuadraturaRegistro {
    id: string;
    plantelId: string;
    periodoEscolar: string;
    tipoFormato: TipoCuadratura;
    fechaCarga: string;
    customSubjects?: Record<string, string>;
    docentes: CuadraturaDocenteFila[];
    seccionesPorPeriodo: Record<string, number>;
    horasPorMateriaPlan: Record<string, number>;
    responsableNombre: string;
    responsableCi: string;
    responsableCargo: string;
    responsableTelefono: string;
}

export interface PersonalRegistro {
    id: string;
    plantelId: string;
    fechaAsistencia: string;
    asistio: boolean;
    observacion?: string;
}
