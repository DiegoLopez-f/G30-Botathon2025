'use client';

import React from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

interface FiltersBarProps {
  // Búsqueda
  searchTerm: string;
  onSearchChange: (value: string) => void;
  
  // Filtro Región
  regionFilter: string;
  onRegionChange: (value: string) => void;

  // Filtro Estado (ESTO FALTABA)
  estadoFilter: string;
  onEstadoChange: (value: string) => void;
  
  // Acciones
  onExport: () => void;
  onImport?: () => void;
  onAdd: () => void;
}

export default function FiltersBar({
  searchTerm,
  onSearchChange,
  regionFilter,
  onRegionChange,
  estadoFilter,    // <--- Agregado
  onEstadoChange,  // <--- Agregado
  onExport,
  onImport,
  onAdd
}: FiltersBarProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">

      {/* 1. Search Input */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre, RUT o email..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teleton-red/20 focus:border-teleton-red outline-none transition-all"
        />
      </div>

      {/* 2. Filters Group */}
      <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
        
        {/* Selector de Región */}
        <select 
          value={regionFilter}
          onChange={(e) => onRegionChange(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:border-teleton-red outline-none cursor-pointer hover:bg-slate-50"
        >
          <option value="">Todas las Regiones</option>
          <option value="Región Metropolitana">Metropolitana</option>
          <option value="Región de Valparaíso">Valparaíso</option>
        </select>

        {/* Selector de Estado (NUEVO - Reemplaza o complementa al de Habilidades) */}
        <select 
          value={estadoFilter}
          onChange={(e) => onEstadoChange(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:border-teleton-red outline-none cursor-pointer hover:bg-slate-50"
        >
          <option value="">Todos los Estados</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Pendiente">Pendiente</option>
        </select>

        {/* Botones de Acción */}
        <Button variant="outline" onClick={onExport} className="gap-2 hidden sm:flex">
          <Download size={16} />
          Exportar
        </Button>

        <Button variant="primary" onClick={onAdd} className="gap-2 bg-teleton-red text-white hover:bg-red-700">
          <Plus size={16} />
          Nuevo
        </Button>
      </div>
    </div>
  );
}