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
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 text-white hover:bg-white/20 rounded-full"><X size={20} /></button>
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

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Building className="text-teleton-red" size={20}/> Institucional</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Instituto</label><p className="font-medium text-slate-900">{voluntario.Instituto}</p></div>
                  <div><label className="text-xs font-bold text-slate-400 uppercase">Tipo</label><p className="font-medium text-slate-900 flex items-center gap-2"><User size={16} className="text-blue-500"/> {voluntario.TipoVoluntario || "--"}</p></div>
                </div>
                <div><label className="text-xs font-bold text-slate-400 uppercase">Campaña Asignada</label><p className="font-medium text-slate-900 flex items-center gap-2"><Flag size={16} className="text-orange-500"/> {voluntario.CampanaAsignada || "Sin asignar"}</p></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Briefcase className="text-blue-600" size={20}/> Perfil</h3>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-slate-400 uppercase">Ocupación</label><p className="font-medium text-slate-900">{voluntario.Ocupacion || "No definida"}</p></div>
                <div><label className="text-xs font-bold text-slate-400 uppercase">Región</label><p className="font-medium text-slate-900 flex items-center gap-2"><MapPin size={16} className="text-slate-400"/> {voluntario.Region}, {voluntario.Comuna}</p></div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><GraduationCap className="text-purple-600" size={20}/> Capacitación</h3>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Realizada</label>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-800 rounded-lg border border-green-100">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-medium">{voluntario.Capacitacion || "Ninguna"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50">Cerrar</button>
          <button onClick={() => { onClose(); onEdit(); }} className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}