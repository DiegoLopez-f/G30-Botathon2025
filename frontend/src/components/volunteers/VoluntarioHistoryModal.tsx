import React from 'react';
import { X, Calendar, Clock, Award } from 'lucide-react';
import { Voluntario, Participacion } from '../../types/voluntario';

interface VoluntarioHistoryModalProps {
  voluntario: Voluntario;
  onClose: () => void;
}

const MOCK_HISTORY: Participacion[] = [
  { id: 1, campana: "Campaña Teletón 2024", rol: "Logística", fecha: "2024-11-09", horas: 12, estado: "Asistió" },
  { id: 2, campana: "Pintatón 2024", rol: "Voluntario General", fecha: "2024-10-15", horas: 4, estado: "Asistió" },
  { id: 3, campana: "Evento Lanzamiento", rol: "Apoyo", fecha: "2024-09-01", horas: 0, estado: "Ausente" },
];

export default function VoluntarioHistoryModal({ voluntario, onClose }: VoluntarioHistoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
          <div><h2 className="text-xl font-bold text-slate-800">Historial</h2><p className="text-slate-500 text-sm">{voluntario.NombreCompleto}</p></div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full"><X size={20} /></button>
        </div>
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-100">
            <div className="bg-blue-50 p-4 rounded-xl text-center"><Award className="mx-auto mb-2 text-blue-600"/><span className="text-xl font-bold">3</span><br/><span className="text-xs text-slate-500">Eventos</span></div>
            <div className="bg-green-50 p-4 rounded-xl text-center"><Clock className="mx-auto mb-2 text-green-600"/><span className="text-xl font-bold">16</span><br/><span className="text-xs text-slate-500">Horas</span></div>
            <div className="bg-purple-50 p-4 rounded-xl text-center"><Calendar className="mx-auto mb-2 text-purple-600"/><span className="text-xl font-bold">2024</span><br/><span className="text-xs text-slate-500">Último</span></div>
        </div>
        <div className="flex-1 overflow-y-auto p-0">
          <table className="w-full">
            <thead className="bg-slate-50 sticky top-0"><tr><th className="px-6 py-3 text-left text-xs text-slate-500">Campaña</th><th className="px-6 py-3 text-left text-xs text-slate-500">Rol</th><th className="px-6 py-3 text-right text-xs text-slate-500">Estado</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.campana}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.rol}</td>
                  <td className="px-6 py-4 text-right"><span className={`px-2 py-1 rounded text-xs ${item.estado === 'Asistió' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}