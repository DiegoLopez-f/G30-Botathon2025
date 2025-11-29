import React from 'react';
import { Users, MapPin, Activity, HeartHandshake, TrendingUp } from 'lucide-react';
import { StatsGrid } from '@/src/components/dashboard/StatsGrid';
import { MetricCard } from '@/src/components/ui/MetricCard';
import { FiltersBar } from '@/src/components/volunteers/FiltersBar';
import { Button } from '@/src/components/ui/Button';

export default function DashboardPage() {
    return (
        <div className="space-y-8">

            {/* Encabezado de la Sección */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Resumen General</h2>
                    <p className="text-slate-500">Bienvenido al CRM de Gestión de Voluntariado Teletón.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm">Descargar Reporte</Button>
                    <Button variant="primary" size="sm">Nueva Campaña</Button>
                </div>
            </div>

            {/* 1. KPIs Principales (Grid de Tarjetas) */}
            <StatsGrid>
                <MetricCard
                    title="Voluntarios Históricos"
                    value="42,593"
                    icon={Users}
                    trend="12% este mes"
                    color="red"
                />
                <MetricCard
                    title="Cobertura Regional"
                    value="16 Regiones"
                    icon={MapPin}
                    trend="100% operativa"
                    color="blue"
                />
                <MetricCard
                    title="Campaña Actual"
                    value="2,840"
                    icon={Activity}
                    trend="Inscritos activos"
                    color="purple"
                />
                <MetricCard
                    title="Tasa de Retención"
                    value="68.5%"
                    icon={HeartHandshake}
                    trend="5% vs 2023"
                    color="orange"
                />
            </StatsGrid>

            {/* 2. Barra de Filtros Avanzados */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Búsqueda y Segmentación</h3>
                </div>
                <FiltersBar />
            </section>

            {/* 3. Placeholder para Gráficos y Tablas (Visualización Temporal) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Gráfico Principal (Simulado) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800">Evolución de Inscripciones</h3>
                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-md">Últimos 12 meses</span>
                    </div>
                    {/* Aquí irá tu componente de Recharts */}
                    <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <div className="text-center text-slate-400">
                            <TrendingUp size={32} className="mx-auto mb-2 opacity-50" />
                            <p>Gráfico de Participación (Próximamente)</p>
                        </div>
                    </div>
                </div>

                {/* Lista Reciente (Simulada) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-4">Actividad Reciente</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                    VP
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">Voluntario #{5000 + item}</p>
                                    <p className="text-xs text-slate-500">Se inscribió en "Logística"</p>
                                </div>
                                <span className="ml-auto text-xs text-slate-400">2h</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}