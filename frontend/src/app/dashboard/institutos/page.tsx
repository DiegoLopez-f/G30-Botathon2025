'use client';

import React, { useState } from 'react';
import { Building2, Users, Target, Calendar, Phone, MapPin, ArrowRight } from 'lucide-react';
import { MetricCard } from '@/src/components/ui/MetricCard'; // Reutilizamos tus componentes
import { Button } from '@/src/components/ui/Button';

// DATOS FALSOS (MOCK) - Esto simula tu base de datos
const INSTITUTOS_DATA = [
    {
        id: "1",
        nombre: "Teletón Santiago",
        region: "Metropolitana",
        direccion: "Av. Libertador Bernardo O'Higgins 4620",
        jefe: "Dra. Patricia Silva",
        voluntarios: 1250,
        campanas_activas: 3,
        meta_cumplimiento: "95%",
        programas: ["Rehabilitación", "Talleres de Arte", "Inclusión Laboral"]
    },
    {
        id: "2",
        nombre: "Teletón Valparaíso",
        region: "Valparaíso",
        direccion: "Av. Francia 259",
        jefe: "Dr. Jorge Moreno",
        voluntarios: 850,
        campanas_activas: 2,
        meta_cumplimiento: "88%",
        programas: ["Verano Teletón", "Acompañamiento"]
    },
    {
        id: "3",
        nombre: "Teletón Concepción",
        region: "Biobío",
        direccion: "Junge 30, San Pedro de la Paz",
        jefe: "Dra. Lorena Pérez",
        voluntarios: 920,
        campanas_activas: 4,
        meta_cumplimiento: "92%",
        programas: ["Deporte Adaptado", "Accesibilidad"]
    },
    // Puedes agregar más aquí...
];

export default function InstitutosPage() {
    // Estado para el instituto seleccionado (Por defecto el primero)
    const [selectedId, setSelectedId] = useState(INSTITUTOS_DATA[0].id);

    // Buscar los datos del seleccionado
    const currentInstituto = INSTITUTOS_DATA.find(i => i.id === selectedId) || INSTITUTOS_DATA[0];

    return (
        <div className="space-y-8">

            {/* HEADER Y SELECTOR */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Building2 className="text-teleton-red" />
                        Gestión por Instituto
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Visualiza métricas y recursos específicos por centro.
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <label className="text-sm font-medium text-slate-700 whitespace-nowrap">Seleccionar Sede:</label>
                    <select
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-red-100 focus:border-teleton-red outline-none transition-all cursor-pointer"
                    >
                        {INSTITUTOS_DATA.map((inst) => (
                            <option key={inst.id} value={inst.id}>{inst.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* DETALLES DEL INSTITUTO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* COLUMNA IZQUIERDA: INFORMACIÓN GENERAL */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="w-full h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group">
                            {/* Placeholder de imagen */}
                            <Building2 size={48} className="text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <span className="absolute bottom-3 left-3 text-white font-bold">{currentInstituto.region}</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-1">{currentInstituto.nombre}</h3>
                        <p className="text-sm text-slate-500 mb-4">Director: {currentInstituto.jefe}</p>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                                <MapPin size={18} className="text-teleton-red shrink-0 mt-0.5" />
                                <span>{currentInstituto.direccion}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Phone size={18} className="text-teleton-red shrink-0" />
                                <span>+56 2 2222 3333</span>
                            </div>
                        </div>

                        <Button className="w-full mt-6" variant="outline">
                            Ver Ficha Técnica
                        </Button>
                    </div>

                    {/* Programas Activos */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Target size={18} /> Programas Activos
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {currentInstituto.programas.map((prog, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                        {prog}
                    </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: DASHBOARD DE LA SEDE */}
                <div className="lg:col-span-2 space-y-6">

                    {/* KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <MetricCard
                            title="Voluntarios"
                            value={currentInstituto.voluntarios}
                            icon={Users}
                            color="red"
                            trend="+12 este mes"
                        />
                        <MetricCard
                            title="Campañas"
                            value={currentInstituto.campanas_activas}
                            icon={Calendar}
                            color="blue"
                            trend="Activas ahora"
                        />
                        <MetricCard
                            title="Cumplimiento"
                            value={currentInstituto.meta_cumplimiento}
                            icon={Target}
                            color="blue" // Ojo: Asegúrate de tener color 'green' en tu MetricCard, si no usa 'purple'
                            trend="Meta anual"
                        />
                    </div>

                    {/* TABLA RESUMEN (Simulada) */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Últimos Voluntarios Inscritos</h3>
                            <button className="text-sm text-teleton-red font-medium flex items-center gap-1 hover:underline">
                                Ver todos <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-3">Nombre</th>
                                    <th className="px-6 py-3">Rol</th>
                                    <th className="px-6 py-3">Fecha</th>
                                    <th className="px-6 py-3">Estado</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                {[1, 2, 3, 4].map((item) => (
                                    <tr key={item} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-slate-700">Voluntario Ejemplo {item}</td>
                                        <td className="px-6 py-3 text-slate-500">Apoyo Logístico</td>
                                        <td className="px-6 py-3 text-slate-500">Hace 2 días</td>
                                        <td className="px-6 py-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                            Activo
                                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}