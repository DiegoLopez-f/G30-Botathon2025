import React from 'react';
import { Filter, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/src/components/ui/Button';
import { MetricCard } from '@/src/components/ui/MetricCard';
import { StatsGrid } from '@/src/components/dashboard/StatsGrid';
import { kpiData, skillsData, regionData, commsHistory } from '../../data/comunicaciones';

const COLORS = ['#D6001C', '#1F2937', '#9CA3AF', '#E5E7EB'];

export default function OverviewView() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <StatsGrid>
        {kpiData.map((kpi, index) => (
          <MetricCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.change}
            color={kpi.color}
          />
        ))}
      </StatsGrid>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart - Habilidades */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Habilidades del Voluntariado</h3>
              <p className="text-sm text-slate-500">Distribución actual de talentos registrados</p>
            </div>
            <Button variant="ghost" size="sm">
              <Filter size={16} />
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#D6001C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Regiones */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Distribución Regional</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-2xl font-bold text-slate-900 block">12K</span>
              <span className="text-xs text-slate-500 font-medium">Voluntarios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Historial (Tabla simplificada) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Historial de Envíos</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <FileText size={16} /> Ver Logs Completos
          </Button>
        </div>
        <div className="space-y-4">
          {commsHistory.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <h4 className="font-semibold text-slate-800">{item.campaign}</h4>
                <p className="text-sm text-slate-500">{item.segment}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item.status === 'Enviado' ? 'bg-green-100 text-green-700' :
                  item.status === 'Procesando' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.status}
                </span>
                <p className="text-xs text-slate-500 mt-1">{item.sent} destinatarios</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}