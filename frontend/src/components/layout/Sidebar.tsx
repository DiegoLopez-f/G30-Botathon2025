'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { MapPin, Heart, LayoutDashboard, Users, Megaphone, Settings, LogOut, Building2 } from 'lucide-react';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => pathname === path;

    const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full";
    const activeClasses = "bg-red-50 text-teleton-red";
    const inactiveClasses = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-30 hidden md:flex flex-col">

            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-slate-900 font-bold text-lg hover:opacity-80 transition-opacity cursor-pointer"
                >
                    <div className="bg-teleton-red p-1.5 rounded-full text-white animate-heartbeat">
                        <Heart size={18} fill="currentColor" />
                    </div>
                    Vocatio<span className="text-teleton-red"></span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link href="/dashboard" className={`${baseClasses} ${isActive('/dashboard') ? activeClasses : inactiveClasses}`}>
                    <LayoutDashboard size={20} />
                    Dashboard
                </Link>
                <Link href="/dashboard/voluntarios" className={`${baseClasses} ${isActive('/dashboard/voluntarios') ? activeClasses : inactiveClasses}`}>
                    <Users size={20} />
                    Voluntarios
                </Link>
                <Link href="/dashboard/institutos" className={`${baseClasses} ${isActive('/dashboard/institutos') ? activeClasses : inactiveClasses}`}>
                    <Building2 size={20} />
                    Institutos
                </Link>
                <Link href="/dashboard/mapa" className={`${baseClasses} ${isActive('/dashboard/mapa') ? activeClasses : inactiveClasses}`}>
                    <MapPin size={20} />
                    Mapa Regional
                </Link>
                <Link href="/dashboard/comunicaciones" className={`${baseClasses} ${isActive('/dashboard/comunicaciones') ? activeClasses : inactiveClasses}`}>
                    <Megaphone size={20} />
                    Comunicaciones
                </Link>
            </nav>

            {/* Footer / Configuración */}
            <div className="p-4 border-t border-slate-100 space-y-2">
                <Link
                    href="/dashboard/configuracion"
                    className={`${baseClasses} ${isActive('/dashboard/configuracion') ? activeClasses : inactiveClasses}`}
                >
                    <Settings size={20} />
                    Configuración
                </Link>

                {/* BOTÓN CERRAR SESIÓN FUNCIONAL */}
                <button
                    onClick={handleLogout}
                    className={`${baseClasses} text-red-600 hover:bg-red-50 mt-1`}
                >
                    <LogOut size={20} />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
