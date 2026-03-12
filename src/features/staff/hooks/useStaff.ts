import { useState, useEffect, useMemo } from 'react';
import { RacRegistro, EjeConsolidacion } from '../types';

export const initialFormState: RacRegistro = {
  id: '', plantelId: '', fechaCarga: '',
  codCargo: '', clasificacion: '', tipoPersonal: 'DOCENTE', funcion: 'DOCENTE', numGoPc: '',
  cedula: '', nombreApellido: '', fechaIngreso: '', sex: 'F',
  cargaHorariaRecibo: 0, horasAcademicas: 0, horasAdm: 0, turno: 'MAÑANA', grado: '', seccion: '',
  especialidad: '', ano: '', cantidadSecciones: 0, materia: '', periodoGrupo: '2024-2025',
  situacionTrabajador: 'ACTIVO', observacion: '', fotoUrl: '', telefono: '', correo: '',
  ejeConsolidacion: 'EJE_INICIAL_PRIMARIA' as EjeConsolidacion,
  lugarNacimiento: '', edad: 0, tlfHabitacion: '', nivelInstruccion: '', profesion: '',
  estadoRecibo: 'ANZOATEGUI', municipioRecibo: '', parroquiaRecibo: '',
  tallaCamisa: '', tallaPantalon: '', tallaZapato: '',
  actividadDeportiva: '', actividadCultural: '',
  tipoVivienda: '', condicionVivienda: '', materialVivienda: '',
  padeceEnfermedad: '', requiereMedicamento: '', discapacidad: ''
};

export function useStaff(initialStaff: RacRegistro[] = []) {
  const [staffList, setStaffList] = useState<RacRegistro[]>(initialStaff);
  const [formData, setFormData] = useState<RacRegistro>(initialFormState);

  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');
  const [selectedPlantelId, setSelectedPlantelId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [successMsg, setSuccessMsg] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [viewingRecord, setViewingRecord] = useState<RacRegistro | null>(null);
  const [draftFound, setDraftFound] = useState(false);
  const [responsable, setResponsable] = useState({ nombre: '', ci: '', cargo: '', telefono: '' });

  useEffect(() => {
    const saved = localStorage.getItem('cdce_last_responsable');
    if (saved) setResponsable(JSON.parse(saved));
    const savedDraft = localStorage.getItem('sgi_rac_draft');
    if (savedDraft) setDraftFound(true);
  }, []);

  useEffect(() => {
    if (!isEditing && selectedPlantelId && (formData.cedula || formData.nombreApellido)) {
      localStorage.setItem('sgi_rac_draft', JSON.stringify({ ...formData, plantelId: selectedPlantelId }));
    }
  }, [formData, selectedPlantelId, isEditing]);

  const currentPlantelRac = useMemo(() =>
    staffList.filter(r => r.plantelId === selectedPlantelId),
  [staffList, selectedPlantelId]);

  const saveStaff = (staff: RacRegistro) => {
    setStaffList(prev => {
      const exists = prev.find(s => s.id === staff.id);
      if (exists) return prev.map(s => s.id === staff.id ? staff : s);
      return [...prev, staff];
    });
  };

  const deleteStaff = (id: string) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
  };

  const loadDraft = () => {
    const savedDraft = localStorage.getItem('sgi_rac_draft');
    if (savedDraft) {
      const parsed = JSON.parse(savedDraft);
      setFormData(parsed);
      if (parsed.plantelId) setSelectedPlantelId(parsed.plantelId);
      setDraftFound(false);
      setSuccessMsg("Borrador recuperado exitosamente.");
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const discardDraft = () => {
    localStorage.removeItem('sgi_rac_draft');
    setDraftFound(false);
  };

  return {
    staffList, currentPlantelRac,
    formData, setFormData,
    selectedEstado, setSelectedEstado,
    selectedMunicipio, setSelectedMunicipio,
    selectedPlantelId, setSelectedPlantelId,
    searchTerm, setSearchTerm,
    successMsg, setSuccessMsg,
    isEditing, setIsEditing,
    viewingRecord, setViewingRecord,
    draftFound, responsable, setResponsable,
    saveStaff, deleteStaff,
    loadDraft, discardDraft
  };
}
