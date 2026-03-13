export interface MatriculaRegistro {
    id: string;
    plantelId: string;
    nivel: string;
    fechaCarga: string;
    inscriptosFemenino: number;
    inscriptosMasculino: number;
    cantidadSecciones: number;
    asistentesFem?: number;
    asistentesMasc?: number;
    respNombre?: string;
    respCi?: string;
}
