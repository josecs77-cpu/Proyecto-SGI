import React, { useState } from 'react';
import {
  ArrowLeft, Save, Landmark, Map, UserCheck,
  GraduationCap, Building2, Wifi, Globe, Share2, Facebook, Instagram, Twitter, MessageSquare
} from 'lucide-react';
import { Plantel, NivelEducativo, ModalidadEducativa, Turno, EspaciosFisicos } from '../types';
import { DEPENDENCIAS, GEOGRAFIA_VENEZUELA, NIVELES, MODALIDADES, TURNOS, TIPOS_ESPACIOS, PROVEEDORES_INTERNET, TIPOS_CONEXION } from '../constants';
import MapPicker from './MapPicker';

interface SchoolFormProps {
  initialData: Partial<Plantel>;
  onSave: (plantel: Plantel) => void;
  onCancel: () => void;
  activeState: string;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({ initialData, onSave, onCancel, activeState }) => {
  const [currentPlantel, setCurrentPlantel] = useState<Partial<Plantel>>(initialData);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalPlantel = {
      ...currentPlantel,
      id: currentPlantel.id || crypto.randomUUID(),
      fechaRegistro: currentPlantel.fechaRegistro || new Date().toISOString().split('T')[0],
      niveles: currentPlantel.niveles || [],
      modalidades: currentPlantel.modalidades || [],
      turnos: currentPlantel.turnos || [],
      espaciosFisicos: currentPlantel.espaciosFisicos || { oficinas: 0, pasillos: 0, salones: 0, depositos: 0, cocina: 0, patio: 0, plazoleta: 0, jardines: 0, cancha: 0, banos: 0, multiuso: 0, estacionamiento: 0, cbit: 0, anfiteatro: 0, biblioteca: 0 },
      conectividad: currentPlantel.conectividad || { tieneInternet: false, conexion1: { proveedor: '', tipoConexion: '', status: '', fechaInstalacion: '' } },
      redesPlantel: currentPlantel.redesPlantel || {},
      redesDirector: currentPlantel.redesDirector || {}
    } as Plantel;
    onSave(finalPlantel);
  };

  const toggleSelection = (list: string[], item: string) => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  const updateEspacio = (key: string, val: number) => {
    setCurrentPlantel(prev => ({
      ...prev,
      espaciosFisicos: { ...(prev.espaciosFisicos as EspaciosFisicos), [key]: val }
    }));
  };

  const inputStyle = "w-full rounded-xl border-2 border-slate-200 p-3 bg-white text-slate-800 font-bold uppercase text-[11px] focus:border-[#003399] outline-none transition-all";
  const labelStyle = "block text-[9px] font-black text-slate-400 uppercase mb-1.5 tracking-widest ml-1";
  const sectionTitle = "text-sm font-black text-[#003399] mb-8 border-b-4 border-yellow-400 w-fit pb-2 uppercase italic tracking-tighter flex items-center gap-2";

  return (
    <div className="bg-slate-50 w-full h-full overflow-hidden flex flex-col animate-in slide-in-from-bottom-4">
      <div className="bg-white p-8 flex justify-between items-center border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="hover:bg-slate-100 p-3 rounded-2xl text-slate-400 transition-all"><ArrowLeft size={24}/></button>
          <div>
            <h2 className="font-black text-xl text-slate-800 uppercase italic tracking-tighter leading-none">{currentPlantel.id ? 'Actualizar Institución' : 'Registro de Nueva Institución'}</h2>
            <p className="text-[9px] font-black text-slate-400 uppercase mt-1 tracking-widest">Protocolo CDCE v9.8</p>
          </div>
        </div>
        <button type="submit" form="plantelForm" className="bg-[#003399] text-white px-12 py-4 rounded-2xl hover:bg-blue-800 flex items-center gap-3 shadow-2xl font-black uppercase text-[11px] tracking-widest active:scale-95 transition-all">
          <Save size={20}/> Guardar Cambios
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <form id="plantelForm" onSubmit={handleSave} className="max-w-7xl mx-auto space-y-10 pb-40">

          <div className="bg-white p-10 rounded-[50px] border border-slate-200 shadow-sm">
            <h3 className={sectionTitle}><Landmark size={20}/> 1. Identificación y Ubicación</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-9"><label className={labelStyle}>Epónimo Oficial</label><input required className={inputStyle} value={currentPlantel.nombre || ''} onChange={e => setCurrentPlantel({...currentPlantel, nombre: e.target.value.toUpperCase()})} /></div>
              <div className="md:col-span-3"><label className={labelStyle}>Código DEA</label><input required className={inputStyle} value={currentPlantel.codigoDea || ''} onChange={e => setCurrentPlantel({...currentPlantel, codigoDea: e.target.value.toUpperCase()})} /></div>

              <div className="md:col-span-3"><label className={labelStyle}>Cód. Estadístico</label><input className={inputStyle} value={currentPlantel.codigoEstadistico || ''} onChange={e => setCurrentPlantel({...currentPlantel, codigoEstadistico: e.target.value})} /></div>
              <div className="md:col-span-3"><label className={labelStyle}>Cód. Dependencia</label><input className={inputStyle} value={currentPlantel.codigoDependencia || ''} onChange={e => setCurrentPlantel({...currentPlantel, codigoDependencia: e.target.value})} /></div>
              <div className="md:col-span-3"><label className={labelStyle}>Cód. Electoral</label><input className={inputStyle} value={currentPlantel.codigoElectoral || ''} onChange={e => setCurrentPlantel({...currentPlantel, codigoElectoral: e.target.value})} /></div>
              <div className="md:col-span-3"><label className={labelStyle}>Dependencia</label><select className={inputStyle} value={currentPlantel.dependencia || ''} onChange={e => setCurrentPlantel({...currentPlantel, dependencia: e.target.value as any})}><option value="">SELECCIONE</option>{DEPENDENCIAS.map(d => <option key={d} value={d}>{d}</option>)}</select></div>

              <div className="md:col-span-3"><label className={labelStyle}>Número NER</label><input className={inputStyle} value={currentPlantel.numeroNer || ''} onChange={e => setCurrentPlantel({...currentPlantel, numeroNer: e.target.value.toUpperCase()})} placeholder="EJ: 556" /></div>

              <div className="md:col-span-3"><label className={labelStyle}>Municipio</label><select className={inputStyle} value={currentPlantel.municipio || ''} onChange={e => setCurrentPlantel({...currentPlantel, municipio: e.target.value, parroquia: ''})}><option value="">SELECCIONE...</option>{Object.keys(GEOGRAFIA_VENEZUELA[activeState] || {}).sort().map(m => <option key={m} value={m}>{m}</option>)}</select></div>
              <div className="md:col-span-3"><label className={labelStyle}>Parroquia</label><select className={inputStyle} value={currentPlantel.parroquia || ''} onChange={e => setCurrentPlantel({...currentPlantel, parroquia: e.target.value})} disabled={!currentPlantel.municipio}><option value="">SELECCIONE...</option>{currentPlantel.municipio && (GEOGRAFIA_VENEZUELA[activeState][currentPlantel.municipio] || []).map(p => <option key={p} value={p}>{p}</option>)}</select></div>
              <div className="md:col-span-3"><label className={labelStyle}>Comuna / Circuito</label><input className={inputStyle} value={currentPlantel.circuitoEducativo || ''} onChange={e => setCurrentPlantel({...currentPlantel, circuitoEducativo: e.target.value.toUpperCase()})} placeholder="CIRCUITO / COMUNA" /></div>

              <div className="md:col-span-9"><label className={labelStyle}>Dirección Exacta</label><input className={inputStyle} value={currentPlantel.direccion || ''} onChange={e => setCurrentPlantel({...currentPlantel, direccion: e.target.value.toUpperCase()})} /></div>

              <div className="md:col-span-3 flex gap-2 items-end">
                <div className="flex-1"><label className={labelStyle}>Lat</label><input className={inputStyle} value={currentPlantel.latitud || ''} readOnly /></div>
                <div className="flex-1"><label className={labelStyle}>Lng</label><input className={inputStyle} value={currentPlantel.longitud || ''} readOnly /></div>
                <button type="button" onClick={() => setShowMapPicker(true)} className="bg-[#003399] text-white p-3 rounded-xl shadow-lg hover:bg-blue-800 transition-all mb-[1px] flex items-center justify-center gap-2 group w-12" title="Abrir Mapa Satelital">
                  <Map size={20} className="group-hover:scale-110 transition-transform"/>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[50px] border border-slate-200 shadow-sm">
            <h3 className={sectionTitle}><UserCheck size={20}/> 2. Datos Directivos y Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2"><label className={labelStyle}>Nombre Director(a)</label><input className={inputStyle} value={currentPlantel.director || ''} onChange={e => setCurrentPlantel({...currentPlantel, director: e.target.value.toUpperCase()})} /></div>
              <div><label className={labelStyle}>Cédula</label><input className={inputStyle} value={currentPlantel.ciDirector || ''} onChange={e => setCurrentPlantel({...currentPlantel, ciDirector: e.target.value.toUpperCase()})} /></div>
              <div><label className={labelStyle}>Teléfono</label><input className={inputStyle} value={currentPlantel.telefono || ''} onChange={e => setCurrentPlantel({...currentPlantel, telefono: e.target.value})} /></div>
              <div className="md:col-span-2"><label className={labelStyle}>Correo Institucional</label><input className={inputStyle} type="email" value={currentPlantel.emailDirector || ''} onChange={e => setCurrentPlantel({...currentPlantel, emailDirector: e.target.value.toUpperCase()})} /></div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[50px] border border-slate-200 shadow-sm">
            <h3 className={sectionTitle}><GraduationCap size={20}/> 3. Caracterización Educativa</h3>
            <div className="space-y-6">
              <div>
                <label className={labelStyle}>Niveles que Atiende</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {NIVELES.map(lvl => (
                    <button type="button" key={lvl} onClick={() => setCurrentPlantel({...currentPlantel, niveles: toggleSelection(currentPlantel.niveles || [], lvl) as NivelEducativo[]})} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${currentPlantel.niveles?.includes(lvl as any) ? 'bg-[#003399] text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelStyle}>Modalidades</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {MODALIDADES.map(mod => (
                    <button type="button" key={mod} onClick={() => setCurrentPlantel({...currentPlantel, modalidades: toggleSelection(currentPlantel.modalidades || [], mod) as ModalidadEducativa[]})} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${currentPlantel.modalidades?.includes(mod as any) ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                      {mod}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelStyle}>Turnos</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {TURNOS.map(t => (
                    <button type="button" key={t} onClick={() => setCurrentPlantel({...currentPlantel, turnos: toggleSelection(currentPlantel.turnos || [], t) as Turno[]})} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${currentPlantel.turnos?.includes(t as any) ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[50px] border border-slate-200 shadow-sm">
            <h3 className={sectionTitle}><Building2 size={20}/> 4. Infraestructura y Espacios Físicos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {TIPOS_ESPACIOS.map(esp => (
                <div key={esp.key} className="bg-slate-50 p-4 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all">
                  <label className="block text-[11px] font-black text-slate-500 uppercase mb-2 h-auto min-h-[24px]">{esp.label}</label>
                  <div className="flex items-center justify-center gap-3">
                    <button type="button" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-500 font-bold" onClick={() => updateEspacio(esp.key, Math.max(0, ((currentPlantel.espaciosFisicos as any)?.[esp.key] || 0) - 1))}>-</button>
                    <span className="text-xl font-black text-slate-800 w-8">{(currentPlantel.espaciosFisicos as any)?.[esp.key] || 0}</span>
                    <button type="button" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 font-bold" onClick={() => updateEspacio(esp.key, ((currentPlantel.espaciosFisicos as any)?.[esp.key] || 0) + 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[50px] border border-slate-200 shadow-sm">
            <h3 className={sectionTitle}><Wifi size={20}/> 5. Conectividad y Tecnología</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-12 bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 flex items-center justify-between">
                <span className="text-[10px] font-black text-blue-900 uppercase">¿Posee Internet?</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, tieneInternet: true}})} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${currentPlantel.conectividad?.tieneInternet ? 'bg-blue-600 text-white' : 'bg-white text-slate-300'}`}>SI</button>
                  <button type="button" onClick={() => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, tieneInternet: false}})} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${!currentPlantel.conectividad?.tieneInternet ? 'bg-slate-600 text-white' : 'bg-white text-slate-300'}`}>NO</button>
                </div>
              </div>

              {currentPlantel.conectividad?.tieneInternet && (
                <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6 animate-in slide-in-from-top-2">
                  <div className="md:col-span-4 text-[10px] font-black text-[#003399] uppercase border-b pb-1">Conexión Principal</div>
                  <div><label className={labelStyle}>Proveedor</label><select className={inputStyle} value={currentPlantel.conectividad.conexion1?.proveedor || ''} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, conexion1: {...currentPlantel.conectividad!.conexion1, proveedor: e.target.value}}})}><option value="">SELECCIONE...</option>{PROVEEDORES_INTERNET.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                  <div><label className={labelStyle}>Tipo Conexión</label><select className={inputStyle} value={currentPlantel.conectividad.conexion1?.tipoConexion || ''} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, conexion1: {...currentPlantel.conectividad!.conexion1, tipoConexion: e.target.value}}})}><option value="">SELECCIONE...</option>{TIPOS_CONEXION.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                  <div><label className={labelStyle}>Estatus Actual</label><select className={inputStyle} value={currentPlantel.conectividad.conexion1?.status || ''} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, conexion1: {...currentPlantel.conectividad!.conexion1, status: e.target.value as any}}})}><option value="Activa">ACTIVA</option><option value="Averia">AVERÍA</option><option value="Suspendido">SUSPENDIDO</option></select></div>
                  <div><label className={labelStyle}>Fecha Instalación</label><input type="date" className={inputStyle} value={currentPlantel.conectividad.conexion1?.fechaInstalacion || ''} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, conexion1: {...currentPlantel.conectividad!.conexion1, fechaInstalacion: e.target.value}}})} /></div>

                  <div className="md:col-span-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer w-fit">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" checked={currentPlantel.conectividad.tieneSegundaConexion || false} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, tieneSegundaConexion: e.target.checked, conexion2: e.target.checked ? { proveedor: '', tipoConexion: '', status: '', fechaInstalacion: '' } : undefined }})} />
                      <span className="text-[10px] font-black text-slate-500 uppercase">¿Posee un segundo proveedor de respaldo?</span>
                    </label>
                  </div>

                  {currentPlantel.conectividad.tieneSegundaConexion && currentPlantel.conectividad.conexion2 && (
                    <>
                      <div className="md:col-span-4 text-[10px] font-black text-slate-500 uppercase border-b pb-1 mt-2">Conexión Secundaria / Respaldo</div>
                      <div><label className={labelStyle}>Proveedor 2</label><select className={inputStyle} value={currentPlantel.conectividad.conexion2.proveedor} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, conexion2: {...currentPlantel.conectividad!.conexion2!, proveedor: e.target.value}}})}><option value="">SELECCIONE...</option>{PROVEEDORES_INTERNET.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                      <div><label className={labelStyle}>Tipo Conexión 2</label><select className={inputStyle} value={currentPlantel.conectividad.conexion2.tipoConexion} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, conexion2: {...currentPlantel.conectividad!.conexion2!, tipoConexion: e.target.value}}})}><option value="">SELECCIONE...</option>{TIPOS_CONEXION.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                      <div><label className={labelStyle}>Estatus 2</label><select className={inputStyle} value={currentPlantel.conectividad.conexion2.status} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, conexion2: {...currentPlantel.conectividad!.conexion2!, status: e.target.value as any}}})}><option value="Activa">ACTIVA</option><option value="Averia">AVERÍA</option><option value="Suspendido">SUSPENDIDO</option></select></div>
                      <div><label className={labelStyle}>Fecha Instalación 2</label><input type="date" className={inputStyle} value={currentPlantel.conectividad.conexion2.fechaInstalacion || ''} onChange={e => setCurrentPlantel({...currentPlantel, conectividad: {...currentPlantel.conectividad!, conexion2: {...currentPlantel.conectividad!.conexion2!, fechaInstalacion: e.target.value}}})} /></div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[50px] border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-indigo-700 mb-8 border-b-4 border-indigo-200 w-fit pb-2 uppercase italic tracking-tighter flex items-center gap-2"><Globe size={20}/> 6. Redes Sociales Institucionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative"><Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18}/><input className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs font-bold uppercase" placeholder="Usuario Facebook" value={currentPlantel.redesPlantel?.facebook || ''} onChange={e => setCurrentPlantel({...currentPlantel, redesPlantel: {...currentPlantel.redesPlantel, facebook: e.target.value}})} /></div>
              <div className="relative"><Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-600" size={18}/><input className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs font-bold uppercase" placeholder="Usuario Instagram" value={currentPlantel.redesPlantel?.instagram || ''} onChange={e => setCurrentPlantel({...currentPlantel, redesPlantel: {...currentPlantel.redesPlantel, instagram: e.target.value}})} /></div>
              <div className="relative"><Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500" size={18}/><input className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs font-bold uppercase" placeholder="Usuario X (Twitter)" value={currentPlantel.redesPlantel?.x || ''} onChange={e => setCurrentPlantel({...currentPlantel, redesPlantel: {...currentPlantel.redesPlantel, x: e.target.value}})} /></div>
              <div className="relative"><MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={18}/><input className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs font-bold uppercase" placeholder="Usuario TikTok" value={currentPlantel.redesPlantel?.tiktok || ''} onChange={e => setCurrentPlantel({...currentPlantel, redesPlantel: {...currentPlantel.redesPlantel, tiktok: e.target.value}})} /></div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[50px] border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black text-purple-700 mb-8 border-b-4 border-purple-200 w-fit pb-2 uppercase italic tracking-tighter flex items-center gap-2"><Share2 size={20}/> 7. Redes Sociales del Director</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative"><Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600/50" size={18}/><input className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs font-bold uppercase" placeholder="Facebook Director" value={currentPlantel.redesDirector?.facebook || ''} onChange={e => setCurrentPlantel({...currentPlantel, redesDirector: {...currentPlantel.redesDirector, facebook: e.target.value}})} /></div>
              <div className="relative"><Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-600/50" size={18}/><input className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-xs font-bold uppercase" placeholder="Instagram Director" value={currentPlantel.redesDirector?.instagram || ''} onChange={e => setCurrentPlantel({...currentPlantel, redesDirector: {...currentPlantel.redesDirector, instagram: e.target.value}})} /></div>
            </div>
          </div>

        </form>
      </div>

      {showMapPicker && (
        <MapPicker
          initialLat={currentPlantel.latitud}
          initialLng={currentPlantel.longitud}
          onConfirm={(lat, lng) => {
            setCurrentPlantel(prev => ({ ...prev, latitud: lat, longitud: lng }));
            setShowMapPicker(false);
          }}
          onClose={() => setShowMapPicker(false)}
        />
      )}
    </div>
  );
};
