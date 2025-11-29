import React from 'react';
import { Edit, Trash2, Mail, Phone, MapPin, History, Calendar } from 'lucide-react';
import { Voluntario } from '../../types/voluntario';

interface TableProps {
  data: Voluntario[];
  onEdit: (v: Voluntario) => void;
  onDelete: (id: number) => void;
  onViewHistory: (v: Voluntario) => void;
}

export default function VolunteersTable({ data, onEdit, onDelete, onViewHistory }: TableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Voluntario
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Disponibilidad
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Habilidades
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {data.map((voluntario) => (
              <tr key={voluntario.VoluntarioID} className="hover:bg-slate-50 transition-colors">
                
                {/* 1. Nombre y RUT */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">
                      {voluntario.NombreCompleto}
                    </span>
                    <span className="text-xs text-slate-500">
                      RUT: {voluntario.RUT}
                    </span>
                  </div>
                </td>

                {/* 2. Contacto */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail size={14} className="text-slate-400" />
                      <span>{voluntario.Email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone size={14} className="text-slate-400" />
                      <span>{voluntario.Telefono}</span>
                    </div>
                  </div>
                </td>

                {/* 3. Ubicación */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={14} className="text-slate-400" />
                    <div className="flex flex-col">
                      <span>{voluntario.Comuna}</span>
                      <span className="text-xs text-slate-400">{voluntario.Region}</span>
                    </div>
                  </div>
                </td>

                {/* 4. DISPONIBILIDAD (CON PROTECCIÓN ANTI-CRASH) */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} className="text-slate-400 flex-shrink-0" />
                    
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {Array.isArray(voluntario.Disponibilidad) && voluntario.Disponibilidad.length > 0 ? (
                        // CASO 1: Es una lista (Datos nuevos)
                        voluntario.Disponibilidad.map((item, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            {item}
                          </span>
                        ))
                      ) : typeof voluntario.Disponibilidad === 'string' && voluntario.Disponibilidad ? (
                        // CASO 2: Es texto (Datos antiguos) - Lo protegemos
                        <span className="truncate max-w-[150px]">{voluntario.Disponibilidad}</span>
                      ) : (
                        // CASO 3: Está vacío
                        <span className="text-xs text-slate-400 italic">--</span>
                      )}
                    </div>
                  </div>
                </td>

                {/* 5. Habilidades */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {Array.isArray(voluntario.Habilidades) && voluntario.Habilidades.length > 0 ? (
                      voluntario.Habilidades.map((skill, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">--</span>
                    )}
                  </div>
                </td>

                {/* 6. Estado */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${voluntario.EstadoVoluntario === 'Activo' ? 'bg-green-100 text-green-800' : ''}
                    ${voluntario.EstadoVoluntario === 'Inactivo' ? 'bg-red-100 text-red-800' : ''}
                    ${voluntario.EstadoVoluntario === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {voluntario.EstadoVoluntario}
                  </span>
                </td>

                {/* 7. Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onViewHistory(voluntario)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver Historial"
                    >
                      <History size={18} />
                    </button>
                    <button 
                      onClick={() => onEdit(voluntario)}
                      className="p-2 text-slate-400 hover:text-teleton-red hover:bg-red-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(voluntario.VoluntarioID)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  No se encontraron voluntarios con los filtros actuales.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}