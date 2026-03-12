import { useMemo, useState } from 'react';
import { useSchools } from '../../schools/hooks/useSchools';
import { useAttendance } from '../hooks/useAttendance';
import { CARGOS } from '../constants';
import { PersonalRegistro } from '../types';
import {
  Building2, MapPin, Users, Save, History,
  Trash2, Search, CheckCircle2, UserCheck,
  Clock, ShieldCheck
} from 'lucide-react';

export default function PersonalManager() {
  const { schools } = useSchools();
  const attendance = useAttendance(schools);
  const [activeTab, setActiveTab] = useState<'registro' | 'historial'>('registro');

  const {
    selectedEstado, setSelectedEstado,
    selectedMunicipio, setSelectedMunicipio,
    selectedPlantelId, setSelectedPlantelId,
    searchTerm, setSearchTerm,
    currentCargo, setCurrentCargo,
    formData, setFormData,
    successMsg, setSuccessMsg,
    selectedPlantel, filteredPlanteles, history,
    savePersonal, deletePersonal, resetForm
  } = attendance;

  const estados = useMemo(() => Array.from(new Set(schools.map(p => p.estado))), [schools]);
  const municipios = useMemo(() => Array.from(new Set(schools.filter(p => p.estado === selectedEstado).map(p => p.municipio))), [schools, selectedEstado]);

  const handleSave = () => {
    if (!selectedPlantel || !currentCargo || !formData.respNombre) return;

    const newRecord: PersonalRegistro = {
      id: Date.now().toString(),
      plantelId: selectedPlantel.id,
      fechaCarga: new Date().toISOString(),
      cargo: currentCargo as typeof CARGOS[number],
      racFemenino: formData.racFem,
      racMasculino: formData.racMasc,
      asistentesFemenino: formData.asistentesFem,
      asistentesMasculino: formData.asistentesMasc,
      responsableNombre: formData.respNombre,
      responsableCi: formData.respCi,
      responsableCargo: formData.respCargo,
      responsableTelefono: formData.respTelefono
    };

    savePersonal(newRecord);
    setSuccessMsg('Registro guardado exitosamente');
    setTimeout(() => setSuccessMsg(''), 3000);
    resetForm();
  };

  const totalRAC = formData.racFem + formData.racMasc;
  const totalAsistentes = formData.asistentesFem + formData.asistentesMasc;
  const porcentajeAsistencia = totalRAC > 0 ? Math.round((totalAsistentes / totalRAC) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            Control de Fuerza Laboral
          </h1>
          <p className="text-slate-500">Registro de asistencia y control de personal educativo</p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('registro')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'registro' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registro Diario
          </button>
          <button
            onClick={() => setActiveTab('historial')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'historial' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Historial General
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center bg-white border border-slate-300 rounded-lg px-3 focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar plantel por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-3 focus:outline-none"
            />
          </div>

          <select
            value={selectedEstado}
            onChange={(e) => {
              setSelectedEstado(e.target.value);
              setSelectedMunicipio('');
              setSelectedPlantelId('');
            }}
            className="border border-slate-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los Estados</option>
            {estados.map(e => <option key={String(e)} value={String(e)}>{String(e)}</option>)}
          </select>

          <select
            value={selectedMunicipio}
            onChange={(e) => {
              setSelectedMunicipio(e.target.value);
              setSelectedPlantelId('');
            }}
            disabled={!selectedEstado}
            className="border border-slate-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100"
          >
            <option value="">Todos los Municipios</option>
            {municipios.map(m => <option key={String(m)} value={String(m)}>{String(m)}</option>)}
          </select>

          <select
            value={selectedPlantelId}
            onChange={(e) => setSelectedPlantelId(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:w-64"
          >
            <option value="">Seleccionar Plantel...</option>
            {filteredPlanteles.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>

        {selectedPlantel ? (
          <div className="p-6">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-4">
              <div className="p-3 bg-blue-600 rounded-lg text-white">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-900">{selectedPlantel.nombre}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-blue-700">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedPlantel.estado}, {selectedPlantel.municipio}</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> {selectedPlantel.codigoDea}</span>
                </div>
              </div>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                {successMsg}
              </div>
            )}

            {activeTab === 'registro' ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-indigo-500" />
                        Registro de Asistencia
                      </h4>
                    </div>
                    <div className="p-5">
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Seleccione el Cargo a Reportar</label>
                        <select
                          value={currentCargo}
                          onChange={(e) => setCurrentCargo(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          <option value="">-- Seleccionar --</option>
                          {CARGOS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>

                      {currentCargo && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h5 className="font-medium text-slate-800 border-b pb-2">Plantilla RAC</h5>
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Femenino</label>
                              <input
                                type="number" min="0"
                                value={formData.racFem}
                                onChange={e => setFormData({...formData, racFem: parseInt(e.target.value) || 0})}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Masculino</label>
                              <input
                                type="number" min="0"
                                value={formData.racMasc}
                                onChange={e => setFormData({...formData, racMasc: parseInt(e.target.value) || 0})}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h5 className="font-medium text-slate-800 border-b pb-2">Asistencia Real</h5>
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Femenino</label>
                              <input
                                type="number" min="0"
                                value={formData.asistentesFem}
                                onChange={e => setFormData({...formData, asistentesFem: parseInt(e.target.value) || 0})}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-slate-600 mb-1">Masculino</label>
                              <input
                                type="number" min="0"
                                value={formData.asistentesMasc}
                                onChange={e => setFormData({...formData, asistentesMasc: parseInt(e.target.value) || 0})}
                                className="w-full border border-slate-300 rounded-lg px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Datos del Responsable del Reporte
                      </h4>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-slate-600 mb-1">Nombre y Apellido</label>
                        <input
                          type="text"
                          value={formData.respNombre}
                          onChange={e => setFormData({...formData, respNombre: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-600 mb-1">Cédula</label>
                        <input
                          type="text"
                          value={formData.respCi}
                          onChange={e => setFormData({...formData, respCi: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-600 mb-1">Cargo</label>
                        <input
                          type="text"
                          value={formData.respCargo}
                          onChange={e => setFormData({...formData, respCargo: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-600 mb-1">Teléfono</label>
                        <input
                          type="text"
                          value={formData.respTelefono}
                          onChange={e => setFormData({...formData, respTelefono: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={handleSave}
                      disabled={!currentCargo || !formData.respNombre}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Save className="w-5 h-5" />
                      Guardar Registro
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-slate-800 rounded-xl p-6 text-white sticky top-6">
                    <h4 className="font-semibold text-slate-200 mb-6 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Resumen del Reporte
                    </h4>

                    <div className="space-y-6">
                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Cargo Seleccionado</div>
                        <div className="font-medium text-lg">{currentCargo || 'No seleccionado'}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-blue-400">{totalRAC}</div>
                          <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Total RAC</div>
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold text-emerald-400">{totalAsistentes}</div>
                          <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Asistentes</div>
                        </div>
                      </div>

                      <div className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="flex justify-between items-end mb-2">
                          <div className="text-sm text-slate-400">Porcentaje de Asistencia</div>
                          <div className="text-2xl font-bold">{porcentajeAsistencia}%</div>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              porcentajeAsistencia >= 80 ? 'bg-emerald-400' :
                              porcentajeAsistencia >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${porcentajeAsistencia}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                    <History className="w-5 h-5 text-blue-500" />
                    Historial de Reportes
                  </h4>
                </div>

                {history.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">
                    <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p>No hay registros de asistencia para este plantel.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
                          <th className="p-4">Fecha</th>
                          <th className="p-4">Cargo</th>
                          <th className="p-4 text-center">RAC</th>
                          <th className="p-4 text-center">Asistentes</th>
                          <th className="p-4 text-center">% Asistencia</th>
                          <th className="p-4">Responsable</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {history.map(record => {
                          const recordTotalRAC = record.racFemenino + record.racMasculino;
                          const recordTotalAsistentes = record.asistentesFemenino + record.asistentesMasculino;
                          const recordPorcentaje = recordTotalRAC > 0 ? Math.round((recordTotalAsistentes / recordTotalRAC) * 100) : 0;

                          return (
                            <tr key={record.id} className="hover:bg-slate-50">
                              <td className="p-4 whitespace-nowrap text-slate-600">
                                {new Date(record.fechaCarga).toLocaleString()}
                              </td>
                              <td className="p-4 font-medium text-slate-800">{record.cargo}</td>
                              <td className="p-4 text-center text-slate-600">{recordTotalRAC}</td>
                              <td className="p-4 text-center font-medium text-emerald-600">{recordTotalAsistentes}</td>
                              <td className="p-4 text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  recordPorcentaje >= 80 ? 'bg-emerald-100 text-emerald-700' :
                                  recordPorcentaje >= 50 ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {recordPorcentaje}%
                                </span>
                              </td>
                              <td className="p-4 text-slate-600">
                                <div className="font-medium">{record.responsableNombre}</div>
                                <div className="text-xs text-slate-400">{record.responsableCargo}</div>
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => deletePersonal(record.id)}
                                  className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                  title="Eliminar registro"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-lg font-medium text-slate-700">Seleccione un plantel</p>
            <p className="max-w-md mx-auto mt-2">Utilice los filtros superiores para encontrar el plantel educativo y gestionar su fuerza laboral.</p>
          </div>
        )}
      </div>
    </div>
  );
}
