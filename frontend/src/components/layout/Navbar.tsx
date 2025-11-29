import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

export function Navbar() {
    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">

            {/* Mobile Toggle & Title */}
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold text-slate-800 hidden sm:block">
                    Panel de Control
                </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Búsqueda rápida..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-teleton-red/20 outline-none w-64 transition-all"
                    />
                </div>

                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-teleton-red border-2 border-white rounded-full"></span>
                </button>

                <div className="w-9 h-9 bg-gradient-to-tr from-teleton-red to-orange-400 rounded-full border-2 border-white shadow-sm cursor-pointer">
                    {/* Avatar Placeholder */}
                </div>
            </div>
        </header>
    );
}