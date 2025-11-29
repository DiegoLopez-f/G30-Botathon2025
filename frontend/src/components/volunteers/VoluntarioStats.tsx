import React from 'react';
import { User, MapPin, Activity, UserX } from 'lucide-react';
import { Voluntario } from '../../types/voluntario'; // Ajusta la ruta si tus types están en src/types

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  bgClass: string;
  iconClass: string;
}

function StatCard({ label, value, icon: Icon, bgClass, iconClass }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-transform hover:scale-[1.02]">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${bgClass}`}>
          <Icon size={24} className={iconClass} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function VoluntarioStats({ voluntarios }: { voluntarios: Voluntario[] }) {
  // Cálculos simples
  const total = voluntarios.length;
  const activos = voluntarios.filter(v => v.EstadoVoluntario === 'Activo').length;
  const inactivos = voluntarios.filter(v => v.EstadoVoluntario === 'Inactivo').length;
  // Usamos un Set para contar regiones únicas
  const regiones = new Set(voluntarios.map(v => v.Region)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        label="Total Voluntarios" 
        value={total} 
        icon={User} 
        bgClass="bg-blue-50" 
        iconClass="text-blue-600" 
      />
      <StatCard 
        label="Voluntarios Activos" 
        value={activos} 
        icon={Activity} 
        bgClass="bg-green-50" 
        iconClass="text-green-600" 
      />
      <StatCard 
        label="Inactivos / Pausa" 
        value={inactivos} 
        icon={UserX} 
        bgClass="bg-slate-100" 
        iconClass="text-slate-600" 
      />
      <StatCard 
        label="Cobertura Regional" 
        value={regiones} 
        icon={MapPin} 
        bgClass="bg-purple-50" 
        iconClass="text-purple-600" 
      />
    </div>
  );
}