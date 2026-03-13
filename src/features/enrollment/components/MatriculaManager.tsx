import React, { useState, useMemo } from 'react';
import { Plantel } from '../../cuadratura/types';
import { MatriculaRegistro } from '../types';
import { GEOGRAFIA_VENEZUELA } from '../../cuadratura/utils/constants';
import { Save, Users, History, Trash2, LayoutGrid, MapPin, AlertCircle, Search } from 'lucide-react';

interface Props {
  planteles: Plantel[];
  matriculaList: MatriculaRegistro[];
  onSaveMatricula: (r: MatriculaRegistro) => void;
  onDeleteMatricula: (id: string) => void;
}

const MatriculaManager: React.FC<Props> = ({ planteles, matriculaList, onSaveMatricula, onDeleteMatricula }) => {
  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');
  const [selectedPlantelId, setSelectedPlantelId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    inscriptosFem: 0, inscriptosMasc: 0, asistentesFem: 0, asistentesMasc: 0, cantidadSecciones: 0,
    respNombre: '', respCi: ''
  });

  const selectedPlantel = useMemo(() => (planteles || []).find(p => p.id === selectedPlantelId), [planteles, selectedPlantelId]);

  const reportableOptions = useMemo(() => {
    if (!selectedPlantel) return [];
    const niveles = Array.isArray(selectedPlantel.niveles) ? selectedPlantel.niveles : [];
    const modalidades = Array.isArray(selectedPlantel.modalidades) ? selectedPlantel.modalidades : [];
    const combined = Array.from(new Set([...niveles, ...modalidades])).filter(Boolean);
    return combined;
  }, [selectedPlantel]);

  const history = useMemo(() =>
    (matriculaList || []).filter(m => m.plantelId === selectedPlantelId),
    [matriculaList, selectedPlantelId]
  );

  const filteredPlanteles = useMemo(() => {
      let list = (planteles || []).filter(p =>
        (!selectedEstado || p.estado === selectedEstado) &&
        (!selectedMunicipio || p.municipio === selectedMunicipio)
      );
      if (searchTerm) {
          list = list.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      return list;
  }, [planteles, selectedEstado, selectedMunicipio, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedPlantelId || !currentLevel) return;

      const record: MatriculaRegistro = {
          id: crypto.randomUUID(),
          plantelId: selectedPlantelId,
          nivel: currentLevel,
          fechaCarga: new Date().toISOString(),
          inscriptosFemenino: formData.inscriptosFem,
          inscriptosMasculino: formData.inscriptosMasc,
          cantidadSecciones: formData.cantidadSecciones,
          asistentesFem: formData.asistentesFem,
          asistentesMasc: formData.asistentesMasc,
          respNombre: formData.respNombre,
          respCi: formData.respCi
      };

      onSaveMatricula(record);
      setSuccessMsg(`CARGA REGISTRADA: ${currentLevel} (${record.inscriptosFemenino + record.inscriptosMasculino} ESTUDIANTES)`);
      setTimeout(() => setSuccessMsg(''), 3000);
      setFormData({ inscriptosFem: 0, inscriptosMasc: 0, asistentesFem: 0, asistentesMasc: 0, cantidadSecciones: 0, respNombre: '', respCi: '' });
      setCurrentLevel('');
  };

  const inputStyle = "w-full rounded-xl border-2 border-slate-300 p-3 bg-white text-black font-black uppercase text-xs focus:border-[#003399] shadow-sm";
  const labelStyle = "block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 tracking-widest";

  return (
    <div className="space-y-6 animate-in fade-in pb-32">

      {/* CABECERA Y BÚSQUEDA */}
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-emerald-500 rounded-3xl text-white shadow-xl shadow-emerald-100"><Users size={32} /></div>
            <div>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight italic">Consolidador de Matrícula</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Protocolo GEMA - Carga Directa</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div>
                <label className={labelStyle}>Estado</label>
                <select className={inputStyle} value={selectedEstado} onChange={e => setSelectedEstado(e.target.value)}>
                    <option value="">VENEZUELA</option>
                    {Object.keys(GEOGRAFIA_VENEZUELA).map(e => <option key={e} value={e}>{e}</option>)}
                </select>
            </div>
            <div>
                <label className={labelStyle}>Municipio</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
                    <select className={`${inputStyle} pl-9`} value={selectedMunicipio} onChange={e => setSelectedMunicipio(e.target.value)} disabled={!selectedEstado}>
                        <option value="">TODOS</option>
                        {selectedEstado && Object.keys(GEOGRAFIA_VENEZUELA[selectedEstado]||{}).map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label className={labelStyle}>Buscador Integrado</label>
                <div className="relative">
                    <input className={inputStyle} placeholder="NOMBRE, DEA O CÓDIGO..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelStyle}>Institución a Reportar</label>
                <select className={inputStyle} value={selectedPlantelId} onChange={e => { setSelectedPlantelId(e.target.value); setCurrentLevel(''); }}>
                    <option value="">-- SELECCIONE UN PLANTEL --</option>
                    {filteredPlanteles.map(p => <option key={p.id} value={p.id}>{p.nombre.toUpperCase()}</option>)}
                </select>
            </div>
        </div>
      </div>

      {selectedPlantel ? (
        <>
        <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div>
                        <label className={labelStyle}>Nivel o Modalidad a Reportar</label>
                        <select required className={inputStyle} value={currentLevel} onChange={e => setCurrentLevel(e.target.value)}>
                            <option value="">- SELECCIONE NIVEL -</option>
                            {reportableOptions.map(n => <option key={n} value={n}>{n.toUpperCase()}</option>)}
                        </select>
                        {reportableOptions.length === 0 && (
                            <p className="mt-2 text-[9px] text-rose-500 font-black uppercase flex items-center gap-1">
                                <AlertCircle size={10}/> FICHA TÉCNICA INCOMPLETA: No se detectan niveles.
                            </p>
                        )}
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-3xl border-2 border-yellow-200 shadow-inner">
                        <label className="text-[10px] font-black text-yellow-700 uppercase flex items-center justify-center gap-2 mb-2"><LayoutGrid size={18}/> Secciones Atendidas</label>
                        <input type="number" min="1" required className="w-full text-center text-3xl font-black rounded-2xl border-2 border-slate-300 bg-white text-black py-4" value={formData.cantidadSecciones || ''} onChange={e => setFormData({...formData, cantidadSecciones: parseInt(e.target.value) || 0})} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="p-8 bg-blue-50/50 rounded-[40px] border-2 border-blue-100">
                        <h3 className="font-black text-blue-900 text-center uppercase mb-8 text-[10px] tracking-[0.3em]">Población Inscrita (RAC)</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div><label className="text-[9px] font-black text-pink-600 mb-2 uppercase text-center block">Femenino</label><input type="number" min="0" required className="w-full text-center text-3xl font-black rounded-2xl border-2 border-slate-300 bg-white text-black py-4" value={formData.inscriptosFem || ''} onChange={e => setFormData({...formData, inscriptosFem: parseInt(e.target.value) || 0})} /></div>
                            <div><label className="text-[9px] font-black text-blue-600 mb-2 uppercase text-center block">Masculino</label><input type="number" min="0" required className="w-full text-center text-3xl font-black rounded-2xl border-2 border-slate-300 bg-white text-black py-4" value={formData.inscriptosMasc || ''} onChange={e => setFormData({...formData, inscriptosMasc: parseInt(e.target.value) || 0})} /></div>
                        </div>
                    </div>
                    <div className="p-8 bg-emerald-50/50 rounded-[40px] border-2 border-emerald-100">
                        <h3 className="font-black text-emerald-900 text-center uppercase mb-8 text-[10px] tracking-[0.3em]">Asistencia Activa</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div><label className="text-[9px] font-black text-pink-500 mb-2 uppercase text-center block">Femenino</label><input type="number" min="0" required className="w-full text-center text-3xl font-black rounded-2xl border-2 border-slate-300 bg-white text-black py-4" value={formData.asistentesFem || ''} onChange={e => setFormData({...formData, asistentesFem: parseInt(e.target.value) || 0})} /></div>
                            <div><label className="text-[9px] font-black text-emerald-500 mb-2 uppercase text-center block">Masculino</label><input type="number" min="0" required className="w-full text-center text-3xl font-black rounded-2xl border-2 border-slate-300 bg-white text-black py-4" value={formData.asistentesMasc || ''} onChange={e => setFormData({...formData, asistentesMasc: parseInt(e.target.value) || 0})} /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[40px] mt-10 shadow-2xl">
                    <h3 className="text-[10px] font-black text-blue-400 uppercase mb-6 tracking-[0.2em] border-b border-white/10 pb-4">Validación Institucional</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input required className="w-full rounded-xl border-2 border-white/10 p-3 bg-white/5 text-white font-bold uppercase text-xs" value={formData.respNombre} onChange={e => setFormData({...formData, respNombre: e.target.value.toUpperCase()})} placeholder="NOMBRE DEL RESPONSABLE" />
                        <input required className="w-full rounded-xl border-2 border-white/10 p-3 bg-white/5 text-white font-bold uppercase text-xs" value={formData.respCi} onChange={e => setFormData({...formData, respCi: e.target.value.toUpperCase()})} placeholder="CÉDULA" />
                    </div>
                </div>

                <div className="mt-10 flex justify-end">
                    <button type="submit" className="bg-[#003399] text-white py-5 px-20 rounded-[28px] font-black uppercase text-xs shadow-2xl active:scale-95 transition-all flex items-center gap-4 tracking-widest hover:bg-blue-800">
                        <Save size={24}/> Guardar y Consolidar Matrícula
                    </button>
                </div>
            </div>
            {successMsg && <div className="p-4 bg-emerald-600 text-white font-black rounded-2xl text-center animate-bounce uppercase shadow-lg border-2 border-emerald-400">{successMsg}</div>}
        </form>

        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-200 mt-10">
            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3 uppercase tracking-tight">
                <History className="text-[#004a99]" size={24}/> Auditoría de Cargas
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                    <thead className="bg-slate-800 text-white font-black uppercase tracking-widest text-[10px]">
                        <tr>
                            <th className="px-6 py-5">FECHA</th>
                            <th className="px-6 py-5">NIVEL / MODALIDAD</th>
                            <th className="px-6 py-5 text-center">SECCIONES</th>
                            <th className="px-6 py-5 text-center">MATRÍCULA TOTAL</th>
                            <th className="px-6 py-5 text-center">OPERACIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.length === 0 ? (
                            <tr><td colSpan={5} className="p-20 text-center text-slate-300 font-black uppercase italic tracking-widest">Sin registros institucionales activos</td></tr>
                        ) : (
                            history.sort((a,b) => new Date(b.fechaCarga).getTime() - new Date(a.fechaCarga).getTime()).map(reg => (
                                <tr key={reg.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-500">{new Date(reg.fechaCarga).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-black text-slate-800 uppercase">{reg.nivel}</td>
                                    <td className="px-6 py-4 text-center font-black">{reg.cantidadSecciones}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-black border border-blue-100">
                                            {reg.inscriptosFemenino + reg.inscriptosMasculino}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => onDeleteMatricula(reg.id)} className="p-2 text-rose-300 hover:text-rose-600 transition-colors"><Trash2 size={18}/></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </>
      ) : (
        <div className="bg-white p-20 rounded-[50px] border-2 border-dashed border-slate-200 text-center">
            <Users className="mx-auto text-slate-100 mb-6" size={80} />
            <p className="text-slate-400 font-black uppercase tracking-widest">Seleccione una institución del directorio para iniciar el reporte</p>
        </div>
      )}
    </div>
  );
};

export default MatriculaManager;