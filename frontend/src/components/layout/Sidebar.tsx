import React from 'react';
import Link from 'next/link';
import {MapPin, Heart, LayoutDashboard, Users, Megaphone, Settings, LogOut } from 'lucide-react';

export function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-30 hidden md:flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                    <div className="bg-teleton-red p-1.5 rounded-full text-white animate-heartbeat">
                        <Heart size={18} fill="currentColor" />
                    </div>
                    Voluntarios<span className="text-teleton-red">360</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-700 bg-slate-50 rounded-xl font-medium hover:bg-red-50 hover:text-teleton-red transition-colors">
                    <LayoutDashboard size={20} />
                    Dashboard
                </Link>
                <Link href="/dashboard/voluntarios" className="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl font-medium hover:bg-red-50 hover:text-teleton-red transition-colors">
                    <Users size={20} />
                    Voluntarios
                </Link>
                <Link href="/dashboard/campanas" className="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl font-medium hover:bg-red-50 hover:text-teleton-red transition-colors">
                    <Megaphone size={20} />
                    Comunicaciones
                </Link>
                <Link href="/dashboard/mapa" className="flex items-center gap-3 px-4 py-3 text-slate-600 rounded-xl font-medium hover:bg-red-50 hover:text-teleton-red transition-colors">
                    <MapPin size={20} />
                    Mapa Geográfico
                </Link>
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 rounded-xl font-medium hover:bg-slate-100 transition-colors">
                    <Settings size={20} />
                    Configuración
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors mt-1">
                    <LogOut size={20} />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}