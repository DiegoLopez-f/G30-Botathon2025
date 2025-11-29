'use client';

import React, { useState } from 'react';
import { User, Bell, Shield, Database, Moon, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export default function ConfiguracionPage() {
    const [notificaciones, setNotificaciones] = useState(true);
    const [modoOscuro, setModoOscuro] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Encabezado */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Configuración</h2>
                <p className="text-slate-500">Gestiona tus preferencias y opciones del sistema.</p>
            </div>

            {/* Sección 1: Perfil */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Perfil de Administrador</h3>
                        <p className="text-sm text-slate-500">Información de tu cuenta activa</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            defaultValue="Admin Teletón"
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            defaultValue="admin@teleton.cl"
                            disabled
                            className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            {/* Sección 2: Preferencias y Sistema */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Notificaciones */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                            <Bell size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800">Notificaciones</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <span className="text-sm text-slate-600">Alertas por correo</span>
                            <button
                                onClick={() => setNotificaciones(!notificaciones)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${notificaciones ? 'bg-teleton-red' : 'bg-slate-200'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${notificaciones ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <span className="text-sm text-slate-600">Resumen semanal</span>
                            <span className="text-xs font-bold text-slate-400">ACTIVADO</span>
                        </div>
                    </div>
                </div>

                {/* Apariencia */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                            <Moon size={20} />
                        </div>
                        <h3 className="font-bold text-slate-800">Apariencia</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                            <span className="text-sm text-slate-600">Modo Oscuro</span>
                            <button
                                onClick={() => setModoOscuro(!modoOscuro)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${modoOscuro ? 'bg-teleton-red' : 'bg-slate-200'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${modoOscuro ? 'left-7' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección 3: Acciones Críticas */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Shield size={20} className="text-slate-400"/>
                    Zona de Sistema
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Database size={16} />
                        Exportar Base de Datos
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <RefreshCw size={16} />
                        Sincronizar Cache
                    </Button>
                    <div className="flex-1"></div>
                    <Button variant="primary" className="flex items-center gap-2">
                        <Save size={16} />
                        Guardar Cambios
                    </Button>
                </div>
            </div>

        </div>
    );
}