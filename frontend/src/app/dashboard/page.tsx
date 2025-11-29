import React from 'react';
import { supabase } from '@/src/lib/supabase'; // <--- Importamos nuestra conexión
import { Users, MapPin, Activity, HeartHandshake, TrendingUp } from 'lucide-react';
import { StatsGrid } from '@/src/components/dashboard/StatsGrid';
import { MetricCard } from '@/src/components/ui/MetricCard';
import  FiltersBar  from '@/src/components/volunteers/FiltersBar';
import { Button } from '@/src/components/ui/Button';

// 1. Función para traer datos reales (simulada por ahora si no hay DB)
async function getDashboardMetrics() {

    // Intento de conexión real a la tabla 'Voluntarios'
    // .count() es súper rápido y barato en Supabase
    const { count: totalVoluntarios, error } = await supabase
        .from('Voluntarios')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.warn("Todavía no hay conexión a DB o la tabla no existe:", error.message);
        // Retornamos datos "dummy" para que el diseño no se rompa mientras esperamos al equipo RPA
        return {
            total: 0,
            regiones: 0,
            campanaActual: 0,
            retencion: "0%"
        };
    }

    // Si hay datos, retornamos lo real
    return {
        total: totalVoluntarios || 0,
        regiones: 16, // Esto podría ser otra query
        campanaActual: 2025,
        retencion: "En cálculo"
    };
}

export default async function DashboardPage() {
    // 2. Llamamos a los datos antes de renderizar
    const metrics = await getDashboardMetrics();

    return (
        <div className="space-y-8">

            {/* Encabezado */}
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

            {/* 3. Usamos los datos dinámicos en las tarjetas */}
            <StatsGrid>
                <MetricCard
                    title="Voluntarios Históricos"
                    value={metrics.total.toLocaleString()} // <--- DATO REAL
                    icon={Users}
                    trend={metrics.total > 0 ? "Datos sincronizados" : "Esperando datos..."}
                    color="red"
                />
                <MetricCard
                    title="Cobertura Regional"
                    value={metrics.regiones}
                    icon={MapPin}
                    trend="Nacional"
                    color="blue"
                />
                <MetricCard
                    title="Campaña Actual"
                    value={metrics.campanaActual}
                    icon={Activity}
                    trend="En curso"
                    color="purple"
                />
                <MetricCard
                    title="Tasa de Retención"
                    value={metrics.retencion}
                    icon={HeartHandshake}
                    trend="vs año anterior"
                    color="orange"
                />
            </StatsGrid>

            {/* ... (El resto del código de Filtros y Gráficos se mantiene igual) ... */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Búsqueda y Segmentación</h3>
                </div>
                <FiltersBar />
            </section>

            {/* Placeholder visual... */}
            {/* ... copia aquí el resto del return anterior ... */}

        </div>
    );
}