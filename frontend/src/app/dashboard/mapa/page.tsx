'use client';

import React, { useState } from 'react';
// CORRECCIÓN: La ruta correcta suele ser @/components, no @/src/components
import ChileMap from '@/src/components/dashboard/ChileMap';
import { Users, MapPin, AlertCircle, Phone, Calendar } from 'lucide-react';

// DATOS DE PRUEBA (MOCK DATA)
// Nota: El mapa usa "Valparaiso" (sin tilde) y "Bio-Bio" (con guion)
const REGION_DATA = [
    { region: "Metropolitana", value: 4500, campañas: 12, lider: "Ana Silva", contacto: "+569 1111 2222" },
    { region: "Valparaiso", value: 3200, campañas: 8, lider: "Jorge Tapia", contacto: "+569 3333 4444" },
    { region: "Bio-Bio", value: 2100, campañas: 10, lider: "Maria Paz", contacto: "+569 5555 6666" },
    { region: "Antofagasta", value: 1500, campañas: 5, lider: "Pedro Lira", contacto: "+569 7777 8888" },
    { region: "Coquimbo", value: 1200, campañas: 4, lider: "Luis Soto", contacto: "+569 9999 0000" },
    { region: "Araucania", value: 1800, campañas: 7, lider: "Carla Diaz", contacto: "+569 1234 5678" },
    { region: "Los Lagos", value: 950, campañas: 3, lider: "Roberto King", contacto: "+569 8765 4321" },
];

export default function MapaPage() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    // Buscar datos de la región seleccionada de forma flexible
    const regionInfo = REGION_DATA.find(r =>
            selectedRegion && (
                r.region.toLowerCase().includes(selectedRegion.toLowerCase()) ||
                selectedRegion.toLowerCase().includes(r.region.toLowerCase())
            )
    );

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-6">

            {/* COLUMNA IZQUIERDA: EL MAPA INTERACTIVO */}
            <div className="flex-1 min-h-[500px] bg-white rounded-3xl border border-slate-200 shadow-sm p-4 relative">
                <div className="absolute top-6 left-6 z-10">
                    <h2 className="text-2xl font-bold text-slate-800">Distribución Geográfica</h2>
                    <p className="text-slate-500 text-sm">Haz clic en una región para ver detalles</p>
                </div>

                {/* Componente del Mapa */}
                <ChileMap
                    data={REGION_DATA}
                    selectedRegion={selectedRegion}
                    onRegionSelect={setSelectedRegion}
                />
            </div>

            {/* COLUMNA DERECHA: PANEL DE DETALLES */}
            <div className="w-full lg:w-96 flex flex-col gap-4">

                {selectedRegion ? (
                    // --- ESTADO 1: REGIÓN SELECCIONADA ---
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg h-full animate-in fade-in slide-in-from-right duration-300 flex flex-col">

                        {/* Header del Panel */}
                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100">
                            <div>
                <span className="text-xs font-bold text-teleton-red uppercase tracking-wider bg-red-50 px-2 py-1 rounded-full">
                  Zona Seleccionada
                </span>
                                <h2 className="text-3xl font-bold text-slate-800 leading-tight mt-3">
                                    {regionInfo?.region || selectedRegion}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedRegion(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Métricas Principales */}
                        <div className="space-y-4 mb-6">
                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100">
                                <div className="bg-white p-3 rounded-xl shadow-sm text-teleton-red">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Voluntarios Activos</p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {regionInfo ? regionInfo.value.toLocaleString() : "0"}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100">
                                <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Campañas Realizadas</p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {regionInfo ? regionInfo.campañas : "0"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Información del Líder */}
                        <div className="bg-slate-900 text-white p-5 rounded-2xl mb-6">
                            <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wide">Coordinación Zonal</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-teleton-red to-orange-500 rounded-full flex items-center justify-center font-bold text-lg border-2 border-slate-800">
                                    {regionInfo?.lider.charAt(0) || "?"}
                                </div>
                                <div>
                                    <p className="font-bold text-lg leading-none">{regionInfo?.lider || "Vacante"}</p>
                                    <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
                                        <Phone size={12} />
                                        <span>{regionInfo?.contacto || "S/N"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Acciones */}
                        <div className="mt-auto space-y-3">
                            <button className="w-full bg-teleton-red text-white py-3.5 rounded-xl font-bold hover:bg-teleton-dark transition-colors shadow-md shadow-red-100 flex items-center justify-center gap-2">
                                <Calendar size={18} />
                                Ver Eventos en la Zona
                            </button>
                            <button className="w-full bg-white border-2 border-slate-200 text-slate-600 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                                Descargar Reporte Regional
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- ESTADO 2: NINGUNA SELECCIONADA (Placeholder) ---
                    <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center text-center text-slate-400">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <AlertCircle size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-600 mb-2">Selecciona una zona</h3>
                        <p className="text-slate-500 max-w-[240px] leading-relaxed">
                            Explora el mapa interactivo haciendo clic en cualquier región para ver sus estadísticas vitales.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}