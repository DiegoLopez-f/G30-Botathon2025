'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase'; // Asegúrate de que esta ruta sea correcta
import { Heart, Lock, Mail, Loader2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button'; // Asegúrate de que este componente exista

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Intentamos iniciar sesión
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            // Si Supabase devuelve un error, lo lanzamos al catch
            if (error) throw error;

            // 2. Si es exitoso, redirigir al Dashboard
            console.log("Login Exitoso:", data);
            router.push('/dashboard');
            router.refresh();

        } catch (err: any) {
            // --- AQUÍ ESTÁ EL CAMBIO PARA DEPURAR ---
            console.error("🔴 ERROR REAL DE SUPABASE:", err);
            // ----------------------------------------

            // Mostrar mensaje amigable en la pantalla
            setError(err.message || 'Error desconocido al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex bg-teleton-red p-3 rounded-full text-white mb-4 animate-heartbeat">
                        <Heart size={32} fill="currentColor" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Bienvenido</h1>
                    <p className="text-slate-500">Inicia sesión para gestionar el voluntariado</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@teleton.cl"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-100 focus:border-teleton-red outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-100 focus:border-teleton-red outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Mensaje de Error */}
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center border border-red-100 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </div>
                    )}

                    {/* Botón Submit */}
                    <Button
                        type="submit"
                        className="w-full py-3 text-base justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Verificando...
              </span>
                        ) : (
                            "Ingresar al Sistema"
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center text-xs text-slate-400">
                    Sistema Seguro Protegido por Supabase Auth
                </div>
            </div>
        </div>
    );
}