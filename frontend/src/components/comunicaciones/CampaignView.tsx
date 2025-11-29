import React, { useState } from 'react';
import { Mail, Sparkles, Users, Send, Zap, Clock } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { commsHistory } from '../../data/comunicaciones'; // Reutilizamos mock data para el historial lateral

export default function CampaignView() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [segment, setSegment] = useState('all');

  const handleAISuggestion = () => {
    setSubject("Convocatoria Urgente: Voluntarios Teletón 2025");
    setMessage("Hola [Nombre],\n\nTe necesitamos para la próxima campaña de la Teletón. Tu apoyo en [Región] es fundamental para alcanzar la meta. \n\n¿Podemos contar contigo?\n\nSaludos,\nEquipo Teletón");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Columna Izquierda: Formulario */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Mail className="text-teleton-red" /> Nueva Campaña
              </h2>
              <p className="text-slate-500">Configura el envío masivo que orquestará Blue Prism.</p>
            </div>
            <Button variant="outline" onClick={handleAISuggestion} className="gap-2 text-teleton-purple border-teleton-purple/20 hover:bg-teleton-purple/5">
              <Sparkles size={16} />
              Generar con IA
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Segmento */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Segmento Objetivo</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-slate-400" size={18} />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teleton-red/20 focus:border-teleton-red outline-none appearance-none"
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                  >
                    <option value="all">Todos los Voluntarios</option>
                    <option value="rm">Región Metropolitana</option>
                    <option value="valpo">Valparaíso</option>
                    <option value="skill_med">Salud / Primeros Auxilios</option>
                  </select>
                </div>
              </div>
              {/* Canal */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Canal de Envío</label>
                <div className="relative">
                  <Send className="absolute left-3 top-3 text-slate-400" size={18} />
                  <select className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teleton-red/20 focus:border-teleton-red outline-none appearance-none">
                    <option value="email">Correo Electrónico (SMTP)</option>
                    <option value="whatsapp">WhatsApp Business API</option>
                    <option value="sms">SMS Masivo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inputs de Texto */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Asunto</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teleton-red/20 focus:border-teleton-red outline-none"
                placeholder="Ej: Información Importante Campaña 2025"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
              <textarea 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teleton-red/20 focus:border-teleton-red outline-none h-40 resize-none font-sans"
                placeholder="Escribe tu mensaje aquí..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-2 text-right">Variables disponibles: [Nombre], [Region], [Habilidad]</p>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
              <Button variant="outline">Guardar Borrador</Button>
              <Button variant="primary" className="gap-2 bg-teleton-red text-white hover:bg-red-700">
                <Send size={18} />
                Programar Robot
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Info Lateral */}
      <div className="space-y-6">
        {/* Robot Status Card */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teleton-red rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
            <Zap className="text-yellow-400" size={20} />
            Estado del Orquestador
          </h3>
          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
              <span className="text-sm text-slate-300">Cola de Correos</span>
              <span className="font-mono font-bold text-green-400">0 Pendientes</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
              <span className="text-sm text-slate-300">Worker #1 (Email)</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-lg font-semibold border border-green-500/30">Idle</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/5">
              <span className="text-sm text-slate-300">Worker #2 (SMS)</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-lg font-semibold border border-green-500/30">Idle</span>
            </div>
          </div>
        </div>

        {/* Historial Reciente */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-slate-400"/>
            Envíos Recientes
          </h3>
          <div className="space-y-3">
            {commsHistory.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-slate-800 text-sm">{item.campaign}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    item.status === 'Enviado' ? 'bg-green-100 text-green-700' :
                    item.status === 'Procesando' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{item.segment}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">{item.date}</span>
                  <span className="text-xs font-semibold text-slate-700">{item.sent} envíos</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}