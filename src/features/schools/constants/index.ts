export const DEPENDENCIAS = ['NACIONAL', 'ESTADAL', 'MUNICIPAL', 'AUTONOMA', 'PRIVADA', 'SUBVENCIONADA'];
export const NIVELES = ['INICIAL', 'PRIMARIA', 'MEDIA GENERAL', 'MEDIA TECNICA', 'ADULTOS', 'ESPECIAL'];
export const TURNOS = ['MAÑANA', 'TARDE', 'INTEGRAL', 'NOCTURNO'];
export const MODALIDADES = ['REGULAR', 'ESPECIAL', 'ADULTOS', 'ARTES', 'INTERCULTURAL'];
export const PROVEEDORES_INTERNET = ['CANTV', 'INTER', 'NETUNO', 'DIGITEL', 'MOVISTAR', 'THUNDERNÉT', 'OTRO'];
export const TIPOS_CONEXION = ['FIBRA ÓPTICA', 'ADSL (COBRE)', 'SATELITAL', 'RADIOENLACE', 'MÓVIL (4G/LTE)', 'OTRO'];

export const TIPOS_ESPACIOS = [
  { key: 'salones', label: 'Aulas' },
  { key: 'oficinas', label: 'Admin/Dir' },
  { key: 'banos', label: 'Baños' },
  { key: 'cancha', label: 'Canchas' },
  { key: 'cocina', label: 'CNAE/PAE' },
  { key: 'depositos', label: 'Depósitos' },
  { key: 'patio', label: 'Patios' },
  { key: 'cbit', label: 'Salas CBIT' },
  { key: 'biblioteca', label: 'Bibliotecas' },
  { key: 'multiuso', label: 'Usos Múltiples' }
];

export const GEOGRAFIA_VENEZUELA: Record<string, Record<string, string[]>> = {
  'ANZOATEGUI': {
    'BOLIVAR': ['EL CARMEN', 'SAN CRISTOBAL', 'BERGANTIN', 'CAIGUA', 'EL PILAR', 'NARICUAL'],
    'SOTILLO': ['PUERTO LA CRUZ', 'POZUELOS'],
    'URBANEJA': ['LECHERIA', 'EL MORRO'],
    'GUANTA': ['GUANTA', 'CHORRERON']
  }
};
