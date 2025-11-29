import React from 'react';
import { X, Calendar, Clock, Award } from 'lucide-react';
import { Voluntario, Participacion } from '../../types/voluntario';
import { Badge } from '../ui/Bagde'; // Asumiendo que tienes este componente o usaremos un span simple

interface VoluntarioHistoryModalProps {
  voluntario: Voluntario;
  onClose: () => void;
}

// DATOS MOCK DE EJEMPLO (Esto después vendría de tu base de datos)
const MOCK_HISTORY: Participacion[] = [
  { id: 1, campana: "Campaña Teletón 2024", rol: "Logística", fecha: "2024-11-09", horas: 12, estado: "Asistió" },
  { id: 2, campana: "Pintatón 2024", rol: "Voluntario General", fecha: "2024-10-15", horas: 4, estado: "Asistió" },
  { id: 3, campana: "Evento Lanzamiento", rol: "Apoyo", fecha: "2024-09-01", horas: 0, estado: "Ausente" },
  { id: 4, campana: "Teletón 2023", rol: "Líder de Cuadrilla", fecha: "2023-11-10", horas: 20, estado: "Asistió" },
];

export default function VoluntarioHistoryModal({ voluntario, onClose }: VoluntarioHistoryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Historial de Participación</h2>
            <p className="text-slate-500 text-sm mt-1">
              Voluntario: <span className="font-semibold text-slate-700">{voluntario.NombreCompleto}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Resumen Rápido */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-100">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="flex justify-center text-blue-600 mb-2"><Award size={24}/></div>
                <div className="text-2xl font-bold text-slate-800">3</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wide">Campañas</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="flex justify-center text-green-600 mb-2"><Clock size={24}/></div>
                <div className="text-2xl font-bold text-slate-800">36</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wide">Horas Totales</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
                <div className="flex justify-center text-purple-600 mb-2"><Calendar size={24}/></div>
                <div className="text-2xl font-bold text-slate-800">2023</div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wide">Desde</div>
            </div>
        </div>

        {/* Tabla de Eventos */}
        <div className="flex-1 overflow-y-auto p-0">
          <table className="w-full">
            <thead className="bg-slate-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Campaña</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-800">{item.campana}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{item.rol}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.fecha}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${item.estado === 'Asistió' ? 'bg-green-100 text-green-700' : ''}
                      ${item.estado === 'Ausente' ? 'bg-red-100 text-red-700' : ''}
                      ${item.estado === 'Inscrito' ? 'bg-blue-100 text-blue-700' : ''}
                    `}>
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
            <button 
                onClick={onClose}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors"
            >
                Cerrar
            </button>
        </div>
      </div>
    </div>
  );
}