import React from 'react';
import { X, MapPin, Building, Briefcase, GraduationCap, Flag, User, Mail, Phone } from 'lucide-react';
import { Voluntario } from '../../types/voluntario';

interface VoluntarioDetailModalProps {
  voluntario: Voluntario;
  onClose: () => void;
  onEdit: () => void;
}

export default function VoluntarioDetailModal({ voluntario, onClose, onEdit }: VoluntarioDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header con Nombre y Foto Placeholder */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors">
            <X size={20} />
          </button>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-20 h-20 bg-teleton-red text-white rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg border-4 border-white/10">
              {voluntario.NombreCompleto.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{voluntario.NombreCompleto}</h2>
              <div className="flex gap-4 text-slate-300 text-sm">
                <span className="flex items-center gap-1"><Mail size={14}/> {voluntario.Email}</span>
                <span className="flex items-center gap-1"><Phone size={14}/> {voluntario.Telefono}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cuerpo del Dashboard Personal */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Tarjeta 1: Datos Institucionales */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Building className="text-teleton-red" size={20}/> Datos del Instituto
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Instituto Asignado</label>
                  <p className="text-slate-900 font-medium text-lg">{voluntario.Instituto || "No definido"}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Tipo de Voluntario</label>
                  <p className="text-slate-900 font-medium flex items-center gap-2">
                    <User size={16} className="text-blue-500"/> {voluntario.TipoVoluntario || "--"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Campaña Actual</label>
                  <p className="text-slate-900 font-medium flex items-center gap-2">
                    <Flag size={16} className="text-orange-500"/> {voluntario.CampanaAsignada || "Sin asignar"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Perfil y Ubicación */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Briefcase className="text-blue-600" size={20}/> Ocupación y Región
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Ocupación / Profesión</label>
                  <p className="text-slate-900 font-medium text-lg">{voluntario.Ocupacion || "No definida"}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Ubicación</label>
                  <p className="text-slate-900 font-medium flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400"/> {voluntario.Region}
                  </p>
                  <p className="text-sm text-slate-500 ml-6">{voluntario.Comuna}</p>
                </div>
              </div>
            </div>

            {/* Tarjeta 3: Capacitación */}
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <GraduationCap className="text-purple-600" size={20}/> Capacitación Realizada
              </h3>
              <div>
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-green-50 text-green-800 rounded-xl border border-green-100 w-full">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-medium text-lg">{voluntario.Capacitacion || "Sin capacitación registrada"}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer con Botón de Edición */}
        <div className="p-6 bg-white border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
            Cerrar
          </button>
          <button 
            onClick={() => { onClose(); onEdit(); }} 
            className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-colors"
          >
            Editar Información
          </button>
        </div>
      </div>
    </div>
  );
}