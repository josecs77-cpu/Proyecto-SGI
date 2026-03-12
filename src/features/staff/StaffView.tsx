import React, { useMemo } from 'react';
import { ClipboardList, SearchIcon, RotateCcw } from 'lucide-react';
import { GEOGRAFIA_VENEZUELA } from '../schools/constants';
import { useStaff, initialFormState } from './hooks/useStaff';
import { StaffForm } from './components/StaffForm';
import { StaffList } from './components/StaffList';
import { StaffDetailModal } from './components/StaffDetailModal';
import { RacRegistro } from './types';

// Mock Planteles
const mockPlanteles = [
  { id: '1', nombre: 'U.E.N. SIMON BOLIVAR', codigoDea: 'S1234D', estado: 'ANZOATEGUI', municipio: 'BOLIVAR' }
];

export const StaffView: React.FC = () => {
  const {
    currentPlantelRac,
    formData, setFormData,
    selectedEstado, setSelectedEstado,
    selectedMunicipio, setSelectedMunicipio,
    selectedPlantelId, setSelectedPlantelId,
    searchTerm, setSearchTerm,
    successMsg, setSuccessMsg,
    isEditing, setIsEditing,
    viewingRecord, setViewingRecord,
    draftFound, responsable, setResponsable,
    saveStaff, deleteStaff, loadDraft, discardDraft
  } = useStaff();

  const estadosList = Object.keys(GEOGRAFIA_VENEZUELA).sort();
  const plantelesFiltrados = useMemo(() => mockPlanteles.filter(p =>
    (!selectedEstado || p.estado === selectedEstado) &&
    (!selectedMunicipio || p.municipio === selectedMunicipio) &&
    (searchTerm === '' || p.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [selectedEstado, selectedMunicipio, searchTerm]);

  const handleSubmit = (e: React.FormEvent, finalMateria: string, finalEspecialidad: string) => {
    e.preventDefault();
    if (!selectedPlantelId) return;

    localStorage.setItem('cdce_last_responsable', JSON.stringify(responsable));

    const finalRecord: RacRegistro = {
      ...formData,
      id: formData.id || crypto.randomUUID(),
      plantelId: selectedPlantelId,
      fechaCarga: new Date().toISOString(),
      nombreApellido: formData.nombreApellido.toUpperCase(),
      materia: finalMateria,
      especialidad: finalEspecialidad,
      correo: (formData.correo || '').toUpperCase(),
    };

    saveStaff(finalRecord);

    setSuccessMsg(isEditing ? "¡REGISTRO ACTUALIZADO EXITOSAMENTE!" : "¡REGISTRO PROCESADO EXITOSAMENTE!");
    localStorage.removeItem('sgi_rac_draft');
    setFormData(initialFormState);
    setIsEditing(false);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleEdit = (reg: RacRegistro) => {
    setFormData(reg);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputStyle = "w-full rounded-xl border-2 border-slate-300 p-3 bg-white text-black font-black uppercase text-xs focus:border-blue-500 outline-none";
  const labelStyle = "block text-[9px] font-black text-slate-400 uppercase ml-2 mb-1";

  return (
    <div className="space-y-8 pb-32 animate-in fade-in h-full overflow-y-auto">
      {draftFound && (
        <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg mx-4 mt-4">
          <div className="flex items-center gap-3 text-yellow-800">
            <RotateCcw size={24}/>
            <div>
              <h4 className="font-black uppercase text-xs">Trabajo no guardado detectado</h4>
              <p className="text-[10px]">El sistema detectó un formulario incompleto debido a un cierre inesperado.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={loadDraft} className="bg-yellow-600 text-white px-4 py-2 rounded-xl font-black uppercase text-[10px] shadow-md hover:bg-yellow-700 transition-all">Recuperar Datos</button>
            <button onClick={discardDraft} className="bg-white text-yellow-800 border border-yellow-300 px-4 py-2 rounded-xl font-black uppercase text-[10px] hover:bg-yellow-50 transition-all">Descartar</button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 mx-4 md:mx-0">
        <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3 uppercase tracking-tight">
          <ClipboardList className="text-[#004a99]" size={28} /> Módulo RAC / Inscripción de Personal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <div className="flex flex-col gap-1">
            <label className={labelStyle}>Estado</label>
            <select className={inputStyle} value={selectedEstado} onChange={e => {setSelectedEstado(e.target.value); setSelectedMunicipio(''); setSelectedPlantelId('');}}>
              <option value="">VENEZUELA (TODOS)</option>
              {estadosList.map(e => <option key={e} value={e}>{e.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelStyle}>Municipio</label>
            <select className={inputStyle} value={selectedMunicipio} onChange={e => {setSelectedMunicipio(e.target.value); setSelectedPlantelId('');}} disabled={!selectedEstado}>
              <option value="">TODOS LOS MUNICIPIOS</option>
              {selectedEstado && Object.keys(GEOGRAFIA_VENEZUELA[selectedEstado] || {}).sort().map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelStyle}>Buscar Plantel</label>
            <div className="relative">
              <input className={inputStyle} placeholder="NOMBRE..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className={labelStyle}>Plantel Específico</label>
            <select className={inputStyle} value={selectedPlantelId} onChange={e => setSelectedPlantelId(e.target.value)}>
              <option value="">-- SELECCIONE UN PLANTEL --</option>
              {plantelesFiltrados.map(p => <option key={p.id} value={p.id}>{p.codigoDea} - {p.nombre.toUpperCase()}</option>)}
            </select>
          </div>
        </div>
      </div>

      {selectedPlantelId && (
        <>
          <StaffForm
            formData={formData} setFormData={setFormData}
            responsable={responsable} setResponsable={setResponsable}
            isEditing={isEditing} onSubmit={handleSubmit} successMsg={successMsg}
          />
          <StaffList
            currentPlantelRac={currentPlantelRac}
            onViewRecord={setViewingRecord}
            onEditRecord={handleEdit}
            onDeleteRecord={deleteStaff}
          />
        </>
      )}

      {viewingRecord && <StaffDetailModal record={viewingRecord} onClose={() => setViewingRecord(null)} />}
    </div>
  );
};

export default StaffView;
