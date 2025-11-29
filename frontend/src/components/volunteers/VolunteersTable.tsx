import React from 'react';
import { Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';
// Corrección de la ruta del import que te daba error:
import { Voluntario } from '../../types/voluntario';

interface TableProps {
  data: Voluntario[];
  onEdit: (v: Voluntario) => void;
  onDelete: (id: number) => void;
}

export default function VolunteersTable({ data, onEdit, onDelete }: TableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Voluntario
              </th>
              {/* Aquí está la columna de Contacto */}
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Ubicación
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

                {/* 2. DATOS DE CONTACTO (Aquí es donde agregamos los iconos) */}
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

                {/* 4. Estado (Badge) */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${voluntario.EstadoVoluntario === 'Activo' ? 'bg-green-100 text-green-800' : ''}
                    ${voluntario.EstadoVoluntario === 'Inactivo' ? 'bg-red-100 text-red-800' : ''}
                    ${voluntario.EstadoVoluntario === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {voluntario.EstadoVoluntario}
                  </span>
                </td>

                {/* 5. Acciones */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
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

            {/* Mensaje si no hay datos */}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
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