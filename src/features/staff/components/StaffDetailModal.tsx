import React from 'react';
import { X, User as UserIcon, Briefcase, FileText, HeartPulse } from 'lucide-react';
import { RacRegistro } from '../types';

interface StaffDetailModalProps {
  record: RacRegistro;
  onClose: () => void;
}

const ViewField = ({ label, value }: { label: string, value: any }) => (
  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col">
    <span className="text-[8px] font-black text-slate-400 uppercase block leading-none mb-1">{label}</span>
    <span className="text-[10px] font-bold text-slate-800 uppercase block break-words">{value || '---'}</span>
  </div>
);

export const StaffDetailModal: React.FC<StaffDetailModalProps> = ({ record, onClose }) => {
  return (
    <div className="fixed inset-0 z-[10000] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-0 md:p-4 overflow-hidden">
      <div className="bg-white w-full h-full md:h-auto md:max-h-[95vh] md:max-w-4xl md:rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col">

        <div className="bg-[#003399] p-4 md:p-6 text-white flex justify-between items-center shrink-0 shadow-md z-50">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 bg-white/10 rounded-2xl"><UserIcon size={24} className="md:w-8 md:h-8" /></div>
            <div>
              <h3 className="font-black text-lg md:text-2xl uppercase tracking-tighter leading-none">Expediente Administrativo</h3>
              <p className="text-blue-200 text-[9px] md:text-[10px] font-black uppercase mt-1 tracking-[0.2em]">Credencial Digital del Trabajador</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-90 flex items-center justify-center">
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-slate-50 space-y-8 pb-32 md:pb-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start mb-10 border-b border-slate-200 pb-10">
            <div className="w-36 h-48 md:w-44 md:h-56 bg-white rounded-2xl flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden shrink-0">
              {record.fotoUrl ? <img src={record.fotoUrl} className="w-full h-full object-cover" /> : <UserIcon size={64} className="text-slate-100" />}
            </div>
            <div className="flex-1 space-y-4 w-full text-center md:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight uppercase tracking-tighter">{record.nombreApellido}</h2>
                <p className="text-blue-600 text-lg md:text-xl font-black mt-1 tracking-[0.2em]">{record.cedula}</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase">{record.tipoPersonal}</span>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase">{record.situacionTrabajador}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left w-full mt-4">
                <ViewField label="Teléfono" value={record.telefono} />
                <ViewField label="Correo" value={record.correo} />
                <ViewField label="Lugar Nacimiento" value={record.lugarNacimiento} />
                <ViewField label="Edad" value={record.edad ? `${record.edad} AÑOS` : ''} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-[11px] font-black text-[#003399] uppercase tracking-[0.2em] flex items-center gap-2 border-b pb-3 mb-4"><Briefcase size={16}/> Datos Laborales</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ViewField label="Código Cargo" value={record.codCargo} />
                <ViewField label="Clasificación" value={record.clasificacion} />
                <ViewField label="Función Real" value={record.funcion} />
                <ViewField label="Fecha Ingreso" value={record.fechaIngreso} />
                <ViewField label="Carga Horaria" value={`${record.cargaHorariaRecibo} H`} />
                <ViewField label="Resolución G.O" value={record.numGoPc} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-[11px] font-black text-amber-600 uppercase tracking-[0.2em] flex items-center gap-2 border-b pb-3 mb-4"><FileText size={16}/> Perfil Curricular</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ViewField label="Nivel Instrucción" value={record.nivelInstruccion} />
                <ViewField label="Profesión" value={record.profesion} />
                <ViewField label="Especialidad" value={record.especialidad} />
                <ViewField label="Área de Saber" value={record.materia} />
                <ViewField label="Turno" value={record.turno} />
                <ViewField label="Grado / Año" value={record.grado || record.ano} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2 border-b pb-3 mb-4"><HeartPulse size={16}/> Ficha Socioeconómica</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-[9px] font-black text-slate-400 uppercase border-b pb-1">Residencia</p>
                  <p className="text-[10px] font-bold text-slate-700 uppercase">{record.estadoRecibo} / {record.municipioRecibo} / {record.parroquiaRecibo}</p>
                  <ViewField label="Tlf. Habitación/Fijo" value={record.tlfHabitacion} />
                </div>
                <div className="space-y-3">
                  <p className="text-[9px] font-black text-slate-400 uppercase border-b pb-1">Tallas y Medidas</p>
                  <div className="grid grid-cols-3 gap-2">
                    <ViewField label="Camisa" value={record.tallaCamisa} />
                    <ViewField label="Pantalón" value={record.tallaPantalon} />
                    <ViewField label="Calzado" value={record.tallaZapato} />
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[9px] font-black text-slate-400 uppercase border-b pb-1">Salud y Actividades</p>
                  <ViewField label="Enfermedad" value={record.padeceEnfermedad} />
                  <ViewField label="Deporte" value={record.actividadDeportiva} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
