import React from 'react';
import { School, Plus, Search, Edit, Trash2, MapPin, ChevronRight } from 'lucide-react';
import { Plantel } from '../types';
import { DEPENDENCIAS, NIVELES, MODALIDADES, GEOGRAFIA_VENEZUELA } from '../constants';

interface SchoolsListProps {
  schools: Plantel[];
  totalSchools: number;
  contextLabel: string;
  canRegister: boolean;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  filterMun: string;
  onFilterMunChange: (val: string) => void;
  filterPar: string;
  onFilterParChange: (val: string) => void;
  filterDep: string;
  onFilterDepChange: (val: string) => void;
  filterNivel: string;
  onFilterNivelChange: (val: string) => void;
  filterMod: string;
  onFilterModChange: (val: string) => void;
  onAddSchool: () => void;
  onEditSchool: (school: Plantel) => void;
  onDeleteSchool: (id: string) => void;
  onViewDetails: (school: Plantel) => void;
  activeState: string;
}

export const SchoolsList: React.FC<SchoolsListProps> = ({
  schools,   contextLabel, canRegister,
  searchTerm, onSearchChange,
  filterMun, onFilterMunChange,
  filterPar, onFilterParChange,
  filterDep, onFilterDepChange,
  filterNivel, onFilterNivelChange,
  filterMod, onFilterModChange,
  onAddSchool, onEditSchool, onDeleteSchool, onViewDetails, activeState
}) => {

  return (
    <div className="space-y-6 animate-in fade-in h-full flex flex-col">
      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-tighter italic"><School className="text-[#003399]" size={32} /> Directorio Territorial</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Gestión Regional CDCE Anzoátegui</p>
        </div>
        {canRegister && (
          <button onClick={onAddSchool} className="bg-[#003399] text-white px-10 py-4 rounded-2xl hover:bg-blue-800 flex items-center gap-2 shadow-2xl transition-all font-black uppercase text-xs tracking-widest active:scale-95">
            <Plus size={20}/> Registrar Plantel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-3 bg-white p-6 rounded-[35px] border border-slate-200 shadow-sm items-center">
        <div className="xl:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
          <input className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 text-black font-bold uppercase text-[10px] outline-none focus:ring-2 focus:ring-blue-100" placeholder="Nombre / DEA / NER..." value={searchTerm} onChange={e => onSearchChange(e.target.value)} />
        </div>

        <div className="xl:col-span-2">
          <select className="w-full px-4 py-3 rounded-xl bg-slate-50 text-black font-bold uppercase text-[10px] outline-none cursor-pointer" value={filterMun} onChange={e => { onFilterMunChange(e.target.value); onFilterParChange(''); }}>
            <option value="">MUNICIPIO (TODOS)</option>
            {Object.keys(GEOGRAFIA_VENEZUELA[activeState] || {}).sort().map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="xl:col-span-2">
          <select className="w-full px-4 py-3 rounded-xl bg-slate-50 text-black font-bold uppercase text-[10px] outline-none cursor-pointer" value={filterPar} onChange={e => onFilterParChange(e.target.value)} disabled={!filterMun}>
            <option value="">PARROQUIA (TODAS)</option>
            {filterMun && GEOGRAFIA_VENEZUELA[activeState][filterMun]?.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="xl:col-span-2">
          <select className="w-full px-4 py-3 rounded-xl bg-slate-50 text-black font-bold uppercase text-[10px] outline-none cursor-pointer" value={filterDep} onChange={e => onFilterDepChange(e.target.value)}>
            <option value="">DEPENDENCIA</option>
            {DEPENDENCIAS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="xl:col-span-1">
          <select className="w-full px-2 py-3 rounded-xl bg-slate-50 text-black font-bold uppercase text-[10px] outline-none cursor-pointer" value={filterNivel} onChange={e => onFilterNivelChange(e.target.value)}>
            <option value="">NIVEL</option>
            {NIVELES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="xl:col-span-1">
          <select className="w-full px-2 py-3 rounded-xl bg-slate-50 text-black font-bold uppercase text-[10px] outline-none cursor-pointer" value={filterMod} onChange={e => onFilterModChange(e.target.value)}>
            <option value="">MODALIDAD</option>
            {MODALIDADES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="xl:col-span-1 flex justify-end">
          <div className="bg-[#003399] text-white px-2 py-2 rounded-xl font-black text-xs min-w-[90px] text-center shadow-lg flex flex-col items-center justify-center leading-none h-[46px] w-full">
            <span className="text-[16px]">{schools.length}</span>
            <span className="text-[6px] opacity-70 uppercase truncate w-full px-1">{contextLabel}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-20 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {schools.length === 0 ? (
          <div className="col-span-full py-40 text-center bg-white rounded-[50px] border-2 border-dashed border-slate-100">
            <Search size={64} className="mx-auto text-slate-100 mb-4"/>
            <p className="text-slate-300 font-black uppercase text-xs tracking-widest">Sin resultados bajo estos filtros</p>
          </div>
        ) : schools.map(p => (
          <div key={p.id} className="bg-white rounded-[45px] border border-slate-200 p-8 hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#003399]"></div>
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-black text-slate-800 uppercase text-sm leading-tight flex-1 mr-4 italic">{p.nombre}</h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEditSchool(p)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit size={16}/></button>
                  <button onClick={() => { if(confirm('¿BORRAR PLANTEL?')) onDeleteSchool(p.id); }} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={16}/></button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="bg-blue-50 text-[#003399] font-black text-[10px] px-3 py-1 rounded-lg border border-blue-100">{p.codigoDea}</span>
                <span className="bg-yellow-50 text-yellow-700 font-bold text-[9px] px-2 py-1 rounded-lg uppercase border border-yellow-100">{p.dependencia}</span>
                {p.numeroNer && <span className="bg-purple-50 text-purple-700 font-bold text-[9px] px-2 py-1 rounded-lg uppercase border border-purple-100">NER {p.numeroNer}</span>}
              </div>
              <div className="space-y-2 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <p className="text-[10px] text-slate-600 flex items-center gap-2 font-black uppercase truncate"><MapPin size={14} className="text-rose-500 shrink-0"/> {p.municipio}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase truncate pl-5">{p.parroquia}</p>
              </div>
            </div>
            <button onClick={() => onViewDetails(p)} className="mt-8 bg-slate-900 text-white px-5 py-3 rounded-2xl text-[9px] font-black uppercase hover:bg-black transition-all flex items-center justify-center gap-2 shadow-lg">Ver Ficha Técnica <ChevronRight size={14}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};
