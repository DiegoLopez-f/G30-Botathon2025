'use client'; // Necesario porque usamos estado (useState) y efectos (useEffect)

import React, { useEffect, useState } from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';
import { supabase } from '@/src/lib/supabase'; // Asegúrate de importar tu cliente

export function Navbar() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null); // Nuevo estado para el Nombre Real
    const [initials, setInitials] = useState<string>("U"); // "U" de Usuario por defecto

    // Efecto para obtener el usuario al cargar el componente
    useEffect(() => {
        const getUser = async () => {
            // 1. Obtener al usuario autenticado (Auth)
            const { data: { user } } = await supabase.auth.getUser();

            if (user && user.email) {
                setUserEmail(user.email);

                // 2. SEGUNDA CONSULTA: Buscar el nombre en la tabla 'Administradores'
                // Usamos el 'id' de auth para buscar el registro correspondiente
                const { data: adminData, error } = await supabase
                    .from('Administradores')
                    .select('nombre')
                    .eq('id', user.id)
                    .single();

                // 3. Determinar qué nombre mostrar
                let nameToDisplay = user.email.split('@')[0]; // Por defecto, parte del email

                if (adminData && adminData.nombre) {
                    // Si encontramos el nombre en la BD, usamos ese
                    nameToDisplay = adminData.nombre;
                }

                setUserName(nameToDisplay);

                // 4. Lógica simple para obtener iniciales del nombre a mostrar
                let letters = "U";
                if (nameToDisplay) {
                    const parts = nameToDisplay.trim().split(' ');
                    if (parts.length >= 2) {
                        // Tomar primera letra del primer y último nombre
                        letters = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                    } else {
                        // Tomar las dos primeras letras de la única palabra
                        letters = nameToDisplay.substring(0, 2).toUpperCase();
                    }
                }
                setInitials(letters);
            } else {
                setUserName("Invitado");
            }
        };

        getUser();
    }, []);

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-slate-900/80 dark:border-slate-800 sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between transition-colors">

            {/* Mobile Toggle & Title */}
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg">
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">
                    Panel de Control
                </h1>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">

                {/* Barra de búsqueda */}
                <div className="relative hidden md:block mr-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Búsqueda rápida..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-teleton-red/20 outline-none w-64 transition-all dark:bg-slate-800 dark:text-slate-200"
                    />
                </div>

                {/* Notificaciones */}
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-teleton-red border-2 border-white dark:border-slate-900 rounded-full"></span>
                </button>

                {/* --- AVATAR DE USUARIO (DINÁMICO) --- */}
                <div
                    className="ml-2 flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700"
                    title={userEmail || "Usuario"}
                >
                    <div className="flex flex-col items-end hidden md:flex">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-none">
              {userName || "Cargando..."}
            </span>
                        <span className="text-[10px] text-slate-400 font-medium">Administrador</span>
                    </div>

                    <div className="w-9 h-9 bg-gradient-to-tr from-teleton-red to-orange-400 rounded-full border-2 border-white dark:border-slate-800 shadow-sm cursor-pointer flex items-center justify-center text-white font-bold text-xs tracking-wide">
                        {initials}
                    </div>
                </div>

            </div>
        </header>
    );
}
