import { Turno } from '../../schools/types';

export type EjeConsolidacion = 'EJE_INICIAL_PRIMARIA' | 'EJE_MEDIA_TECNICA' | 'EJE_ESPECIAL' | 'EJE_ADULTOS' | 'MISIONES';

export interface RacRegistro {
  id: string;
  plantelId: string;
  fechaCarga: string;
  codCargo: string;
  clasificacion: string;
  tipoPersonal: 'DOCENTE' | 'ADMINISTRATIVO' | 'OBRERO' | string;
  funcion: string;
  numGoPc: string;
  cedula: string;
  nombreApellido: string;
  fechaIngreso: string;
  sex: 'F' | 'M';
  cargaHorariaRecibo: number;
  horasAcademicas: number;
  horasAdm: number;
  turno: Turno;
  grado?: string;
  seccion?: string;
  especialidad?: string;
  ano?: string;
  cantidadSecciones?: number;
  materia?: string;
  periodoGrupo?: string;
  situacionTrabajador: string;
  observacion?: string;
  fotoUrl?: string;
  telefono?: string;
  correo?: string;
  ejeConsolidacion: EjeConsolidacion;
  lugarNacimiento?: string;
  edad?: number;
  tlfHabitacion?: string;
  nivelInstruccion?: string;
  profesion?: string;
  estadoRecibo?: string;
  municipioRecibo?: string;
  parroquiaRecibo?: string;
  tallaCamisa?: string;
  tallaPantalon?: string;
  tallaZapato?: string;
  actividadDeportiva?: string;
  actividadCultural?: string;
  tipoVivienda?: string;
  condicionVivienda?: string;
  materialVivienda?: string;
  padeceEnfermedad?: string;
  requiereMedicamento?: string;
  discapacidad?: string;
}

export interface PersonalRegistro {
  id: string;
  plantelId: string;
  cargo: string;
  racFemenino: number;
  racMasculino: number;
  asistentesFemenino: number;
  asistentesMasculino: number;
  fechaCarga: string;
  responsableNombre: string;
  responsableCi: string;
  responsableCargo: string;
  responsableTelefono: string;
}
