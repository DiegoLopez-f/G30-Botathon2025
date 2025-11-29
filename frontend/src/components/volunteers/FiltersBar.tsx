'use client'; // Importante: Este componente usa interacción del usuario

import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export function FiltersBar() {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">

            {/* Search Input */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Buscar por nombre, RUT o email..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teleton-red/20 focus:border-teleton-red outline-none transition-all"
                />
            </div>

            {/* Filters Group */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:border-teleton-red outline-none cursor-pointer hover:bg-slate-50">
                    <option value="">Todas las Regiones</option>
                    <option value="RM">Metropolitana</option>
                    <option value="V">Valparaíso</option>
                </select>

                <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:border-teleton-red outline-none cursor-pointer hover:bg-slate-50">
                    <option value="">Habilidades</option>
                    <option value="salud">Salud</option>
                    <option value="musica">Música</option>
                </select>

                <Button variant="outline" className="gap-2">
                    <Filter size={16} />
                    Más
                </Button>

                <Button variant="primary" className="gap-2">
                    <Download size={16} />
                    Exportar
                </Button>
            </div>
        </div>
    );
}