import React from 'react';
import { UserCheck, Eye, Edit, Trash2, User as UserIcon } from 'lucide-react';
import { RacRegistro } from '../types';

interface StaffListProps {
  currentPlantelRac: RacRegistro[];
  onViewRecord: (record: RacRegistro) => void;
  onEditRecord: (record: RacRegistro) => void;
  onDeleteRecord: (id: string) => void;
}

export const StaffList: React.FC<StaffListProps> = ({
  currentPlantelRac,
  onViewRecord,
  onEditRecord,
  onDeleteRecord
}) => {
  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 mt-12 mx-4 md:mx-0">
      <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3 uppercase tracking-tight">
        <UserCheck className="text-blue-600" size={24}/> Personal Registrado en Institución
      </h3>

      <div className="block md:hidden space-y-4">
        {currentPlantelRac.length === 0 ? (
          <div className="p-10 text-center text-slate-300 font-black uppercase italic tracking-widest border-2 border-dashed border-slate-100 rounded-2xl">Sin registros activos</div>
        ) : (
          currentPlantelRac.map(reg => (
            <div key={reg.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 relative">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                  {reg.fotoUrl ? <img src={reg.fotoUrl} className="w-full h-full object-cover" /> : <UserIcon size={24} className="text-slate-200"/>}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-black text-slate-800 uppercase text-xs leading-tight truncate">{reg.nombreApellido}</h4>
                  <p className="text-[10px] text-blue-600 font-black tracking-widest mt-1">{reg.cedula}</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">{reg.tipoPersonal}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9px]">
                <div className="bg-white p-2 rounded-xl border border-slate-100"><span className="text-slate-400 block font-bold">HORAS</span><span className="font-black text-slate-800">{reg.cargaHorariaRecibo} H</span></div>
                <div className="bg-white p-2 rounded-xl border border-slate-100"><span className="text-slate-400 block font-bold">ESTATUS</span><span className={`font-black ${reg.situacionTrabajador === 'ACTIVO' ? 'text-emerald-600' : 'text-rose-600'}`}>{reg.situacionTrabajador}</span></div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button onClick={() => onViewRecord(reg)} className="p-2 text-slate-500 bg-white border border-slate-200 rounded-xl"><Eye size={16}/></button>
                <button onClick={() => onEditRecord(reg)} className="p-2 text-indigo-500 bg-white border border-indigo-100 rounded-xl"><Edit size={16}/></button>
                <button onClick={() => onDeleteRecord(reg.id)} className="p-2 text-rose-500 bg-white border border-rose-100 rounded-xl"><Trash2 size={16}/></button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-800 text-white font-black uppercase tracking-widest text-[10px]">
            <tr>
              <th className="px-6 py-5">FOTO / IDENTIDAD</th>
              <th className="px-6 py-5">ESTRUCTURA</th>
              <th className="px-6 py-5">EJE / PERFIL</th>
              <th className="px-6 py-5">JORNADA</th>
              <th className="px-6 py-5">ESTATUS</th>
              <th className="px-6 py-5 text-center">OPERACIONES</th>
            </tr>
          </thead>
          <tbody>
            {currentPlantelRac.length === 0 ? (
              <tr><td colSpan={6} className="p-20 text-center text-slate-300 font-black uppercase italic tracking-widest">Sin registros activos</td></tr>
            ) : (
              currentPlantelRac.map(reg => (
                <tr key={reg.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                        {reg.fotoUrl ? <img src={reg.fotoUrl} className="w-full h-full object-cover" /> : <UserIcon size={20} className="text-slate-200"/>}
                      </div>
                      <div>
                        <div className="font-black text-slate-800 uppercase text-sm">{reg.nombreApellido}</div>
                        <div className="text-[10px] text-blue-600 font-black tracking-widest">{reg.cedula}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><div className="font-black text-slate-700 uppercase">{reg.tipoPersonal}</div><div className="text-[10px] text-slate-400 font-bold uppercase">{reg.funcion}</div></td>
                  <td className="px-6 py-4"><div className="text-[9px] font-black text-indigo-700 uppercase bg-indigo-50 px-2 py-1 rounded-lg mb-1 inline-block">{reg.ejeConsolidacion?.replace('EJE_', '').replace('_', ' ')}</div><div className="text-[9px] text-slate-400 font-black uppercase truncate max-w-[150px]">{reg.materia || reg.especialidad}</div></td>
                  <td className="px-6 py-4"><div className="font-black text-blue-700">{reg.cargaHorariaRecibo} H</div><div className="text-[8px] text-slate-400">ACAD: {reg.horasAcademicas}</div></td>
                  <td className="px-6 py-4"><span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest ${reg.situacionTrabajador === 'ACTIVO' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>{reg.situacionTrabajador}</span></td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => onViewRecord(reg)} className="p-3 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100"><Eye size={18}/></button>
                      <button onClick={() => onEditRecord(reg)} className="p-3 text-indigo-400 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-indigo-100"><Edit size={18}/></button>
                      <button onClick={() => onDeleteRecord(reg.id)} className="p-3 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
