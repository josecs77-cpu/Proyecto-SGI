import { useState, useMemo } from 'react';
import { PersonalRegistro } from '../types';
import { Plantel } from '../../schools/types';

export function useAttendance(planteles: Plantel[], initialList: PersonalRegistro[] = []) {
  const [personalList, setPersonalList] = useState<PersonalRegistro[]>(initialList);

  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');
  const [selectedPlantelId, setSelectedPlantelId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentCargo, setCurrentCargo] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    racFem: 0, racMasc: 0, asistentesFem: 0, asistentesMasc: 0,
    respNombre: '', respCi: '', respCargo: '', respTelefono: ''
  });

  const selectedPlantel = useMemo(() =>
    planteles.find(p => p.id === selectedPlantelId),
  [planteles, selectedPlantelId]);

  const filteredPlanteles = useMemo(() => {
    let list = planteles.filter(p =>
      (!selectedEstado || p.estado === selectedEstado) &&
      (!selectedMunicipio || p.municipio === selectedMunicipio)
    );
    if (searchTerm) {
      list = list.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return list;
  }, [planteles, selectedEstado, selectedMunicipio, searchTerm]);

  const history = useMemo(() =>
    personalList.filter(p => p.plantelId === selectedPlantelId).sort((a,b) => new Date(b.fechaCarga).getTime() - new Date(a.fechaCarga).getTime()),
  [personalList, selectedPlantelId]);

  const savePersonal = (r: PersonalRegistro) => {
    setPersonalList(prev => [...prev, r]);
  };

  const deletePersonal = (id: string) => {
    setPersonalList(prev => prev.filter(p => p.id !== id));
  };

  const resetForm = () => {
    setFormData(prev => ({ ...prev, racFem: 0, racMasc: 0, asistentesFem: 0, asistentesMasc: 0 }));
    setCurrentCargo('');
  };

  return {
    selectedEstado, setSelectedEstado,
    selectedMunicipio, setSelectedMunicipio,
    selectedPlantelId, setSelectedPlantelId,
    searchTerm, setSearchTerm,
    currentCargo, setCurrentCargo,
    formData, setFormData,
    successMsg, setSuccessMsg,
    selectedPlantel, filteredPlanteles, history,
    savePersonal, deletePersonal, resetForm
  };
}
