import React from 'react';
import { Edit, Trash2, Mail, Phone, MapPin, History, Calendar } from 'lucide-react';
import { Voluntario } from '../../types/voluntario';

interface TableProps {
  data: Voluntario[];
  onEdit: (v: Voluntario) => void;
  onDelete: (id: number) => void;
  onViewDetails: (v: Voluntario) => void; // Clic en nombre
  onViewHistory: (v: Voluntario) => void; // Clic en reloj
}

export default function VolunteersTable({ data, onEdit, onDelete, onViewDetails, onViewHistory }: TableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Voluntario</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Contacto</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Ubicación</th>
              
              {/* COLUMNAS QUE FALTABAN */}
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Disponibilidad</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Habilidades</th>
              
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Estado</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {data.map((voluntario) => (
              <tr key={voluntario.VoluntarioID} className="hover:bg-slate-50 transition-colors">
                
                {/* 1. NOMBRE CLICABLE -> Abre Dashboard Personal */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <button 
                      onClick={() => onViewDetails(voluntario)} 
                      className="text-sm font-bold text-slate-900 hover:text-teleton-red text-left hover:underline transition-colors"
                    >
                      {voluntario.NombreCompleto}
                    </button>
                    <span className="text-xs text-slate-500">RUT: {voluntario.RUT}</span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1 text-sm text-slate-600">
                    <div className="flex items-center gap-2"><Mail size={14} className="text-slate-400"/> {voluntario.Email}</div>
                    <div className="flex items-center gap-2"><Phone size={14} className="text-slate-400"/> {voluntario.Telefono}</div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={14} className="text-slate-400" />
                    <div><span>{voluntario.Comuna}</span><br/><span className="text-xs text-slate-400">{voluntario.Region}</span></div>
                  </div>
                </td>

                {/* 2. DISPONIBILIDAD (Recuperado) */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {Array.isArray(voluntario.Disponibilidad) && voluntario.Disponibilidad.length > 0 ? 
                      voluntario.Disponibilidad.slice(0, 2).map((d, i) => <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] rounded border border-blue-100">{d}</span>)
                      : <span className="text-xs text-slate-400">--</span>
                    }
                  </div>
                </td>

                {/* 3. HABILIDADES (Recuperado) */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {Array.isArray(voluntario.Habilidades) && voluntario.Habilidades.length > 0 ? 
                      voluntario.Habilidades.slice(0, 2).map((h, i) => <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded border border-slate-200">{h}</span>)
                      : <span className="text-xs text-slate-400">--</span>
                    }
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${voluntario.EstadoVoluntario === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                    {voluntario.EstadoVoluntario}
                  </span>
                </td>

                {/* 4. ACCIONES (BOTÓN HISTORIAL AGREGADO) */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onViewHistory(voluntario)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-500" title="Ver Historial"><History size={18}/></button>
                    <button onClick={() => onEdit(voluntario)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500" title="Editar"><Edit size={18}/></button>
                    <button onClick={() => onDelete(voluntario.VoluntarioID)} className="p-2 hover:bg-red-50 rounded-lg text-red-500" title="Eliminar"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}