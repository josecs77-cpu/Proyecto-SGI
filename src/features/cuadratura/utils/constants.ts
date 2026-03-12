// Mock Geography Data
export const GEOGRAFIA_VENEZUELA: Record<string, Record<string, any>> = {
  'MIRANDA': { 'SUCRE': {}, 'CHACAO': {}, 'BARUTA': {} },
  'DISTRITO CAPITAL': { 'LIBERTADOR': {} },
  'ZULIA': { 'MARACAIBO': {}, 'SAN FRANCISCO': {} },
};

export const CUADRATURA_IP_CONFIG = [
  { key: 'MAT', label: 'Maternal', subs: ['MAT-A', 'MAT-B'] },
  { key: 'INI', label: 'Inicial', subs: ['INI-A', 'INI-B', 'INI-C'] },
  { key: '1G', label: '1er Grado', subs: ['1G-A', '1G-B', '1G-C'] },
  { key: '2G', label: '2do Grado', subs: ['2G-A', '2G-B', '2G-C'] },
  { key: '3G', label: '3er Grado', subs: ['3G-A', '3G-B', '3G-C'] },
  { key: '4G', label: '4to Grado', subs: ['4G-A', '4G-B', '4G-C'] },
  { key: '5G', label: '5to Grado', subs: ['5G-A', '5G-B', '5G-C'] },
  { key: '6G', label: '6to Grado', subs: ['6G-A', '6G-B', '6G-C'] },
];

export const CUADRATURA_ESPECIAL_COLUMNS = [
  'RETARDO', 'AUTISMO', 'IMPEDIMENTO', 'AUDITIVA', 'VISUAL', 'A.APRENDIZAJE', 'TALENTO', 'TALLER', 'INSERCION'
];

export const SUBJECTS_31059 = [
  'CASTELLANO', 'INGLÉS', 'MATEMÁTICA', 'EFD', 'HISTORIA', 'GEOGRAFÍA', 'BIOLOGÍA', 'FÍSICA', 'QUÍMICA'
];

export const SUBJECTS_31060 = [
  'CASTELLANO', 'INGLÉS', 'MATEMÁTICA', 'EFD', 'CS.NATURALES', 'HISTORIA', 'GHC', 'FÍSICA', 'QUÍMICA'
];

export const SUBJECTS_TECNICA = [
  'LENGUA Y LIT.', 'MATEMÁTICA', 'CS.NATURALES', 'DIBUJO TÉC.', 'TALLER', 'TECNOLOGÍA', 'PASANTÍAS'
];

export const SUBJECTS_TECNICA_BLANCO = [
  'MAT_ESP_1', 'MAT_ESP_2', 'MAT_ESP_3', 'MAT_ESP_4', 'MAT_ESP_5', 'TALLER_ESP'
];

export const ADULTOS_PERIODOS_ESTANDAR = [
  { label: 'PERIODO I', key: 'P1', subjects: ['LENGUAJE', 'MATEMATICA', 'CS. NATURALES', 'CS. SOCIALES'] },
  { label: 'PERIODO II', key: 'P2', subjects: ['LENGUAJE', 'MATEMATICA', 'CS. NATURALES', 'CS. SOCIALES', 'INGLES'] },
  { label: 'PERIODO III', key: 'P3', subjects: ['LENGUAJE', 'MATEMATICA', 'BIOLOGIA', 'FISICA', 'QUIMICA', 'GEOGRAFIA'] }
];

export const ADULTOS_PERIODOS_BLANCO = [
  { label: 'PERIODO I', key: 'P1', subjects: ['M_B1', 'M_B2', 'M_B3', 'M_B4'] },
  { label: 'PERIODO II', key: 'P2', subjects: ['M_B1', 'M_B2', 'M_B3', 'M_B4', 'M_B5'] },
  { label: 'PERIODO III', key: 'P3', subjects: ['M_B1', 'M_B2', 'M_B3', 'M_B4', 'M_B5', 'M_B6'] }
];

export const NIVELES = ['INICIAL', 'PRIMARIA', 'MEDIA GENERAL', 'MEDIA TÉCNICA', 'ADULTOS'];
export const MODALIDADES = ['REGULAR', 'ESPECIAL', 'NOCTURNO'];
