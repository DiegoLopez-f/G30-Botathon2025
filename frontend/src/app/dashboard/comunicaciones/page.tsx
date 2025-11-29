'use client';

import React, { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import OverviewView from '../../../components/comunicaciones/OverviewView';
import CampaignView from '../../../components/comunicaciones/CampaignView';

type ViewType = 'overview' | 'campaign';

export default function ComunicacionesPage() {
  const [activeView, setActiveView] = useState<ViewType>('overview');

  return (
    <div className="space-y-6">
      {/* Header y Control de Vistas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Centro de Comunicaciones</h1>
          <p className="text-slate-500">Gestiona campañas de comunicación masiva con los voluntarios</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <Button 
            variant={activeView === 'overview' ? 'primary' : 'ghost'} 
            onClick={() => setActiveView('overview')}
            size="sm"
            className={activeView === 'overview' ? "bg-slate-900 text-white" : "text-slate-600"}
          >
            Dashboard
          </Button>
          <Button 
            variant={activeView === 'campaign' ? 'primary' : 'ghost'} 
            onClick={() => setActiveView('campaign')}
            size="sm"
            className={activeView === 'campaign' ? "bg-teleton-red text-white" : "text-slate-600"}
          >
            Nueva Campaña
          </Button>
        </div>
      </div>

      {/* Renderizado Condicional de Vistas */}
      <div className="animate-in fade-in duration-300">
        {activeView === 'overview' ? <OverviewView /> : <CampaignView />}
      </div>
    </div>
  );
}