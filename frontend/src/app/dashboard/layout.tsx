import React from 'react';
import { Sidebar } from '@/src/components/layout/Sidebar';
import { Navbar } from '@/src/components/layout/Navbar';

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* 1. Sidebar Fijo (Izquierda) */}
            <Sidebar />

            {/* 2. Área de Contenido Principal (Derecha) */}
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">

                {/* Navbar Fijo Arriba */}
                <Navbar />

                {/* Aquí se renderiza la página específica (page.tsx) */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}