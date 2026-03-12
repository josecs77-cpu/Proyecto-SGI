import React, { useRef, useState, useMemo } from 'react';
import { Save, Layers, Camera, Upload, UserCheck, MapPin, Shirt, Home, Activity, HeartPulse, Clock } from 'lucide-react';
import { RacRegistro, EjeConsolidacion } from '../types';
import {
  FUNCIONES_PERSONAL, EJES_CONSOLIDACION_OPCIONES, NIVELES_INSTRUCCION,
  TALLAS_CAMISA, TALLAS_PANTALON, TIPOS_VIVIENDA, CONDICION_VIVIENDA,
  MATERIAS_COMUNES, SITUACION_TRABAJADOR
} from '../constants';
import { GEOGRAFIA_VENEZUELA, TURNOS } from '../../schools/constants';

interface StaffFormProps {
  formData: RacRegistro;
  setFormData: React.Dispatch<React.SetStateAction<RacRegistro>>;
  responsable: any;
  setResponsable: any;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent, finalMateria: string, finalEspecialidad: string) => void;
  successMsg: string;
}

export const StaffForm: React.FC<StaffFormProps> = ({
  formData, setFormData, responsable, setResponsable, isEditing, onSubmit, successMsg
}) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [otroMateria, setOtroMateria] = useState('');
  const [otroEspecialidad, setOtroEspecialidad] = useState('');

  const estadosList = Object.keys(GEOGRAFIA_VENEZUELA).sort();
  const municipiosDisponibles = useMemo(() => {
    const edo = formData.estadoRecibo || 'ANZOATEGUI';
    return GEOGRAFIA_VENEZUELA[edo] ? Object.keys(GEOGRAFIA_VENEZUELA[edo]).sort() : [];
  }, [formData.estadoRecibo]);

  const parroquiasDisponibles = useMemo(() => {
    const edo = formData.estadoRecibo || 'ANZOATEGUI';
    const mun = formData.municipioRecibo;
    if (!mun || !GEOGRAFIA_VENEZUELA[edo]) return [];
    return GEOGRAFIA_VENEZUELA[edo][mun] || [];
  }, [formData.estadoRecibo, formData.municipioRecibo]);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const scaleSize = 400 / img.width;
          canvas.width = 400;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setFormData(prev => ({ ...prev, fotoUrl: compressed }));
    } catch (err) {
      alert("Error procesando imagen.");
    }
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    const finalMateria = formData.materia === 'OTRO' ? otroMateria.toUpperCase() : (formData.materia || '');
    const finalEspecialidad = formData.especialidad === 'OTRO' ? otroEspecialidad.toUpperCase() : (formData.especialidad || '');
    onSubmit(e, finalMateria, finalEspecialidad);
  };

  const inputStyle = "w-full rounded-xl border-2 border-slate-300 p-3 bg-white text-black font-black uppercase text-xs focus:border-blue-500 outline-none";
  const labelStyle = "block text-[9px] font-black text-slate-400 uppercase ml-2 mb-1";

  return (
    <form onSubmit={handleLocalSubmit} className="space-y-8 animate-in slide-in-from-bottom-4 px-4 md:px-0">
      <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-sm border border-slate-200">

        {/* Direccionamiento */}
        <div className="mb-8 p-6 bg-[#003399]/5 rounded-2xl border-2 border-[#003399]/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#003399] text-white rounded-xl shadow-lg"><Layers size={20}/></div>
            <div>
              <h4 className="font-black text-[#003399] uppercase text-sm">Direccionamiento de Consolidación</h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">¿En qué formato de cuadratura debe aparecer este docente?</p>
            </div>
          </div>
          <select required className={`${inputStyle} border-[#003399]/30 bg-white text-indigo-900 text-sm`} value={formData.ejeConsolidacion} onChange={e => setFormData({...formData, ejeConsolidacion: e.target.value as EjeConsolidacion})}>
            {EJES_CONSOLIDACION_OPCIONES.map(opt => <option key={opt.value} value={opt.value}>{opt.label.toUpperCase()}</option>)}
          </select>
        </div>

        {/* Captura Foto */}
        <div className="mb-8 flex flex-col md:flex-row items-center gap-8 p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 shadow-inner">
          <div className="relative group">
            <div className="w-40 h-52 bg-white rounded-2xl border-2 border-slate-300 flex items-center justify-center overflow-hidden shadow-2xl">
              {formData.fotoUrl ? <img src={formData.fotoUrl} className="w-full h-full object-cover" alt="Foto Carnet" /> : <div className="text-slate-200">IMG</div>}
            </div>
            <button type="button" onClick={() => photoInputRef.current?.click()} className="absolute bottom-[-10px] right-[-10px] bg-[#003399] text-white p-3 rounded-xl shadow-xl hover:bg-blue-800 transition-all active:scale-95"><Upload size={20}/></button>
            <input type="file" ref={photoInputRef} className="hidden" accept=".jpg,.jpeg,.png" onChange={handlePhotoChange} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-black text-slate-800 uppercase text-sm tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2"><Camera size={20} className="text-[#003399]"/> Captura de Identidad Visual</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed max-w-md">La imagen será optimizada automáticamente para no saturar el servidor.</p>
          </div>
        </div>

        {/* Identidad */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div><label className={labelStyle}>Cédula</label><input required placeholder="V-12345678" className={inputStyle} value={formData.cedula} onChange={e => setFormData({...formData, cedula: e.target.value.toUpperCase()})} /></div>
          <div className="md:col-span-2"><label className={labelStyle}>Nombres y Apellidos</label><input required placeholder="EJ: PEREZ MENDOZA JUAN" className={inputStyle} value={formData.nombreApellido} onChange={e => setFormData({...formData, nombreApellido: e.target.value.toUpperCase()})} /></div>
          <div><label className={labelStyle}>Sexo</label><select className={inputStyle} value={formData.sex} onChange={e => setFormData({...formData, sex: e.target.value as 'F' | 'M'})}><option value="F">FEMENINO</option><option value="M">MASCULINO</option></select></div>
          <div><label className={labelStyle}>Teléfono Celular</label><input placeholder="0414-1234567" className={inputStyle} value={formData.telefono || ''} onChange={e => setFormData({...formData, telefono: e.target.value})} /></div>
          <div className="md:col-span-2"><label className={labelStyle}>Correo Electrónico</label><input type="email" placeholder="EMPLEADO@CORREO.COM" className={inputStyle} value={formData.correo || ''} onChange={e => setFormData({...formData, correo: e.target.value.toUpperCase()})} /></div>
          <div><label className={labelStyle}>Fecha Ingreso</label><input type="date" required className={inputStyle} value={formData.fechaIngreso} onChange={e => setFormData({...formData, fechaIngreso: e.target.value})} /></div>
          <div><label className={labelStyle}>Cód. Cargo</label><input placeholder="EJ: 0065" className={inputStyle} value={formData.codCargo} onChange={e => setFormData({...formData, codCargo: e.target.value.toUpperCase()})} /></div>
          <div><label className={labelStyle}>Clasificación</label><input placeholder="EJ: DOCENTE IV" className={inputStyle} value={formData.clasificacion} onChange={e => setFormData({...formData, clasificacion: e.target.value.toUpperCase()})} /></div>
          <div><label className={labelStyle}>Tipo Personal</label><select className={inputStyle} value={formData.tipoPersonal} onChange={e => setFormData({...formData, tipoPersonal: e.target.value.toUpperCase()})}><option value="DOCENTE">DOCENTE</option><option value="ADMINISTRATIVO">ADMINISTRATIVO</option><option value="OBRERO">OBRERO</option></select></div>
          <div><label className={labelStyle}>Función</label><select className={inputStyle} value={formData.funcion} onChange={e => setFormData({...formData, funcion: e.target.value.toUpperCase()})}>{FUNCIONES_PERSONAL.map(f => <option key={f} value={f}>{f}</option>)}</select></div>
        </div>

        {/* Ficha Socioeconomica */}
        <div className="bg-slate-100 p-6 md:p-10 rounded-[35px] border-2 border-slate-200 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5"><UserCheck size={180}/></div>
            <h3 className="font-black text-slate-800 uppercase text-xs mb-6 border-b-2 border-slate-300 pb-2 tracking-[0.2em] relative z-10">Ficha Socioeconómica Complementaria (2do RAC)</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 mb-6">
                <div className="md:col-span-2"><label className={labelStyle}>Lugar de Nacimiento</label><input className={inputStyle} value={formData.lugarNacimiento || ''} onChange={e => setFormData({...formData, lugarNacimiento: e.target.value.toUpperCase()})} /></div>
                <div><label className={labelStyle}>Edad</label><input type="number" className={inputStyle} value={formData.edad || ''} onChange={e => setFormData({...formData, edad: parseInt(e.target.value) || 0})} /></div>
                <div><label className={labelStyle}>Tlf. Habitación/Oficina</label><input className={inputStyle} value={formData.tlfHabitacion || ''} onChange={e => setFormData({...formData, tlfHabitacion: e.target.value})} /></div>
                <div><label className={labelStyle}>Nivel Instrucción</label>
                    <select className={inputStyle} value={formData.nivelInstruccion || ''} onChange={e => setFormData({...formData, nivelInstruccion: e.target.value})}>
                        <option value="">- SELECCIONE -</option>
                        {NIVELES_INSTRUCCION.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                <div><label className={labelStyle}>Profesión</label><input className={inputStyle} value={formData.profesion || ''} onChange={e => setFormData({...formData, profesion: e.target.value.toUpperCase()})} /></div>
            </div>

            <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><MapPin size={12}/> Dirección según Recibo de Pago</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10">
                <div>
                    <label className={labelStyle}>Estado (Recibo)</label>
                    <select className={inputStyle} value={formData.estadoRecibo || 'ANZOATEGUI'} onChange={e => setFormData({...formData, estadoRecibo: e.target.value, municipioRecibo: '', parroquiaRecibo: ''})}>
                        <option value="">- SELECCIONE -</option>
                        {estadosList.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelStyle}>Municipio (Recibo)</label>
                    <select className={inputStyle} value={formData.municipioRecibo || ''} onChange={e => setFormData({...formData, municipioRecibo: e.target.value, parroquiaRecibo: ''})} disabled={!formData.estadoRecibo && formData.estadoRecibo !== 'ANZOATEGUI'}>
                        <option value="">- SELECCIONE -</option>
                        {municipiosDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelStyle}>Parroquia (Recibo)</label>
                    <select className={inputStyle} value={formData.parroquiaRecibo || ''} onChange={e => setFormData({...formData, parroquiaRecibo: e.target.value})} disabled={!formData.municipioRecibo}>
                        <option value="">- SELECCIONE -</option>
                        {parroquiasDisponibles.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Shirt size={12}/> Tallas y Medidas</h4>
                    <div className="grid grid-cols-3 gap-2">
                        <div><label className={labelStyle}>Camisa</label><select className={inputStyle} value={formData.tallaCamisa || ''} onChange={e => setFormData({...formData, tallaCamisa: e.target.value})}><option value="">-</option>{TALLAS_CAMISA.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                        <div><label className={labelStyle}>Pantalón</label><select className={inputStyle} value={formData.tallaPantalon || ''} onChange={e => setFormData({...formData, tallaPantalon: e.target.value})}><option value="">-</option>{TALLAS_PANTALON.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                        <div><label className={labelStyle}>Calzado</label><input type="number" className={inputStyle} value={formData.tallaZapato || ''} onChange={e => setFormData({...formData, tallaZapato: e.target.value})} /></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Home size={12}/> Vivienda</h4>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <div><label className={labelStyle}>Tipo</label><select className={inputStyle} value={formData.tipoVivienda || ''} onChange={e => setFormData({...formData, tipoVivienda: e.target.value})}><option value="">-</option>{TIPOS_VIVIENDA.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                        <div><label className={labelStyle}>Condición</label><select className={inputStyle} value={formData.condicionVivienda || ''} onChange={e => setFormData({...formData, condicionVivienda: e.target.value})}><option value="">-</option>{CONDICION_VIVIENDA.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
                    </div>
                    <div><label className={labelStyle}>¿Requiere Reparaciones? (Material)</label><input className={inputStyle} placeholder="CEMENTO, ZINC, ETC..." value={formData.materialVivienda || ''} onChange={e => setFormData({...formData, materialVivienda: e.target.value.toUpperCase()})} /></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 relative z-10">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={12}/> Actividades Extracurriculares</h4>
                    <div className="space-y-2">
                        <div><label className={labelStyle}>¿Practica Deporte?</label><input className={inputStyle} placeholder="EJ: BEISBOL / NO" value={formData.actividadDeportiva || ''} onChange={e => setFormData({...formData, actividadDeportiva: e.target.value.toUpperCase()})} /></div>
                        <div><label className={labelStyle}>¿Actividad Cultural?</label><input className={inputStyle} placeholder="EJ: DANZA / NO" value={formData.actividadCultural || ''} onChange={e => setFormData({...formData, actividadCultural: e.target.value.toUpperCase()})} /></div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2"><HeartPulse size={12}/> Salud Integral</h4>
                    <div className="space-y-2">
                        <div><label className={labelStyle}>¿Padece Enfermedad?</label><input className={inputStyle} placeholder="EJ: HIPERTENSIÓN / NO" value={formData.padeceEnfermedad || ''} onChange={e => setFormData({...formData, padeceEnfermedad: e.target.value.toUpperCase()})} /></div>
                        <div><label className={labelStyle}>¿Medicamento Frecuente?</label><input className={inputStyle} placeholder="EJ: LOSARTAN / NO" value={formData.requiereMedicamento || ''} onChange={e => setFormData({...formData, requiereMedicamento: e.target.value.toUpperCase()})} /></div>
                        <div><label className={labelStyle}>¿Discapacidad Certificada?</label><input className={inputStyle} placeholder="EJ: MOTORA / NO" value={formData.discapacidad || ''} onChange={e => setFormData({...formData, discapacidad: e.target.value.toUpperCase()})} /></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Cuadratura */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm">
                <h3 className="font-black text-blue-800 uppercase text-[11px] mb-6 border-b pb-2 tracking-[0.1em]">Primaria / Inicial (Sincronización Cuadratura)</h3>
                <div className="space-y-4">
                    <div><label className={labelStyle}>Especialidad Registrada</label>
                        <select className={inputStyle} value={formData.especialidad} onChange={e => setFormData({...formData, especialidad: e.target.value})}>
                            <option value="">- SELECCIONE -</option>
                            <option value="INTEGRAL">DOCENTE INTEGRAL (PRIMARIA)</option>
                            <option value="EDUCACIÓN INICIAL">EDUCACIÓN INICIAL</option>
                            <option value="MATERNAL">MATERNAL</option>
                            <option value="EDUCACIÓN ESPECIAL">EDUCACIÓN ESPECIAL</option>
                            <option value="AULA INTEGRADA">AULA INTEGRADA</option>
                            <option value="OTRO">OTRO (ESPECIFICAR)</option>
                        </select>
                        {formData.especialidad === 'OTRO' && <input className={`${inputStyle} mt-2`} placeholder="ESCRIBA LA ESPECIALIDAD..." value={otroEspecialidad} onChange={e => setOtroEspecialidad(e.target.value.toUpperCase())} />}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className={labelStyle}>Grado / Grupo</label><input placeholder="EJ: 1ER GRADO" className={inputStyle} value={formData.grado} onChange={e => setFormData({...formData, grado: e.target.value.toUpperCase()})}/></div>
                        <div><label className={labelStyle}>Sección</label><input placeholder="EJ: A" className={inputStyle} value={formData.seccion} onChange={e => setFormData({...formData, seccion: e.target.value.toUpperCase()})}/></div>
                    </div>
                </div>
            </div>
            <div className="p-8 bg-amber-50/50 rounded-2xl border border-amber-100 shadow-sm">
                <h3 className="font-black text-amber-800 uppercase text-[11px] mb-6 border-b pb-2 tracking-[0.1em]">Media / Técnica (Sincronización Cuadratura)</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className={labelStyle}>Año / Periodo</label><input placeholder="EJ: 4TO AÑO" className={inputStyle} value={formData.ano} onChange={e => setFormData({...formData, ano: e.target.value.toUpperCase()})}/></div>
                        <div><label className={labelStyle}>Cant. Secciones</label><input type="number" className={inputStyle} value={formData.cantidadSecciones} onChange={e => setFormData({...formData, cantidadSecciones: parseInt(e.target.value)||0})}/></div>
                    </div>
                    <div><label className={labelStyle}>Asignatura / Área de Formación</label>
                        <select className={inputStyle} value={formData.materia} onChange={e => setFormData({...formData, materia: e.target.value})}>
                            <option value="">- SELECCIONE -</option>
                            <option value="MEDIA GENERAL">PLAN 31059 (MEDIA GENERAL)</option>
                            <option value="MEDIA TÉCNICA">PLAN 31060 (MEDIA TÉCNICA)</option>
                            {MATERIAS_COMUNES.map(m => <option key={m} value={m.toUpperCase()}>{m.toUpperCase()}</option>)}
                            <option value="OTRO">OTRO (ESPECIFICAR)</option>
                        </select>
                        {formData.materia === 'OTRO' && <input className={`${inputStyle} mt-2`} placeholder="ESCRIBA LA ASIGNATURA..." value={otroMateria} onChange={e => setOtroMateria(e.target.value.toUpperCase())} />}
                    </div>
                </div>
            </div>
        </div>

        {/* Condiciones Laborales */}
        <div className="p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 shadow-sm mb-8">
            <h3 className="font-black text-indigo-800 uppercase text-[11px] mb-6 border-b pb-2 tracking-[0.1em] flex items-center gap-2">
                <Clock size={16}/> Condiciones Laborales y Carga Horaria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-yellow-50 p-2 rounded-xl border border-yellow-200">
                    <label className={`${labelStyle} text-yellow-800`}>Carga Horaria Recibo</label>
                    <input type="number" step="0.01" min="0" className={`${inputStyle} border-yellow-300`} value={formData.cargaHorariaRecibo} onChange={e => setFormData({...formData, cargaHorariaRecibo: parseFloat(e.target.value)||0})} />
                </div>
                <div><label className={labelStyle}>Horas Académicas</label><input type="number" step="0.01" min="0" className={inputStyle} value={formData.horasAcademicas} onChange={e => setFormData({...formData, horasAcademicas: parseFloat(e.target.value)||0})} /></div>
                <div><label className={labelStyle}>Horas Administrativas</label><input type="number" step="0.01" min="0" className={inputStyle} value={formData.horasAdm} onChange={e => setFormData({...formData, horasAdm: parseFloat(e.target.value)||0})} /></div>
                <div><label className={labelStyle}>Turno Asignado</label>
                    <select className={inputStyle} value={formData.turno} onChange={e => setFormData({...formData, turno: e.target.value as any})}>
                        {TURNOS.map((t: string) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                    </select>
                </div>
                <div><label className={labelStyle}>Periodo Escolar</label><input className={inputStyle} value={formData.periodoGrupo || ''} onChange={e => setFormData({...formData, periodoGrupo: e.target.value.toUpperCase()})} placeholder="EJ: 2024-2025" /></div>
                <div className="md:col-span-1"><label className={labelStyle}>Situación Trabajador</label>
                    <select className={inputStyle} value={formData.situacionTrabajador} onChange={e => setFormData({...formData, situacionTrabajador: e.target.value.toUpperCase()})}>
                        <option value="">- SELECCIONE -</option>
                        {SITUACION_TRABAJADOR.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2"><label className={labelStyle}>Observación del Trabajador</label><textarea rows={1} className={inputStyle} value={formData.observacion || ''} onChange={e => setFormData({...formData, observacion: e.target.value.toUpperCase()})} placeholder="Detalles adicionales..." /></div>
            </div>
        </div>

        {/* Validacion Responsable */}
        <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl mt-8">
          <h4 className="text-[10px] font-black text-blue-400 uppercase mb-6 tracking-[0.2em] border-b border-white/10 pb-4">Validación del Responsable</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div><label className="text-[9px] font-black text-white/40 uppercase ml-2 mb-1">Nombre</label><input required className="w-full rounded-xl border-2 border-white/10 p-3 bg-white/5 text-white font-bold uppercase text-xs outline-none focus:border-blue-500" value={responsable.nombre} onChange={e => setResponsable({...responsable, nombre: e.target.value.toUpperCase()})} /></div>
            <div><label className="text-[9px] font-black text-white/40 uppercase ml-2 mb-1">Cédula</label><input required className="w-full rounded-xl border-2 border-white/10 p-3 bg-white/5 text-white font-bold uppercase text-xs outline-none focus:border-blue-500" value={responsable.ci} onChange={e => setResponsable({...responsable, ci: e.target.value.toUpperCase()})} /></div>
            <div><label className="text-[9px] font-black text-white/40 uppercase ml-2 mb-1">Cargo</label><input required className="w-full rounded-xl border-2 border-white/10 p-3 bg-white/5 text-white font-bold uppercase text-xs outline-none focus:border-white/10 p-3 bg-white/5 text-white font-bold uppercase text-xs outline-none focus:border-blue-500" value={responsable.cargo} onChange={e => setResponsable({...responsable, cargo: e.target.value.toUpperCase()})} /></div>
            <div><label className="text-[9px] font-black text-white/40 uppercase ml-2 mb-1">Teléfono</label><input required className="w-full rounded-xl border-2 border-white/10 p-3 bg-white/5 text-white font-bold uppercase text-xs outline-none focus:border-blue-500" value={responsable.telefono} onChange={e => setResponsable({...responsable, telefono: e.target.value.toUpperCase()})} /></div>
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button type="submit" className="bg-[#004a99] hover:bg-blue-800 text-white font-black py-5 px-16 rounded-2xl shadow-2xl uppercase text-xs tracking-widest flex items-center gap-3 transition-all active:scale-95">
            <Save size={20}/> {isEditing ? 'Actualizar Ficha RAC' : 'Inscribir en Plantilla RAC'}
          </button>
        </div>
        {successMsg && <div className="mt-6 p-4 bg-emerald-100 text-emerald-800 font-black rounded-2xl text-center border-2 border-emerald-200 uppercase animate-bounce">{successMsg}</div>}
      </div>
    </form>
  );
};
